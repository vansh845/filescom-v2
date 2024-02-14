'use client'
import axios from 'axios'
import { UploadTaskSnapshot, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

type fileDataType = {
    name: string,
    url: string
}

export default function FileUpload() {

    const path = usePathname();


    const router = useRouter()
    const storage = getStorage(app);
    const [fileData, setFileData] = useState<fileDataType>();
    const [loading, setLoading] = useState(false);
    const [folderName, setFolderName] = useState('')
    const formElement = useRef<HTMLFormElement>(null)

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0]!
        const storageRef = ref(storage, file.name);
        setLoading(true);
        const uploadTask = await uploadBytesResumable(storageRef, file)

        const url = await getDownloadURL(uploadTask.ref);
        setLoading(false)
        setFileData({ ...fileData, url: url, name: file.name })

    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await axios.post(`http://localhost:3001/createFile?userid=${1}&prefix=${path}`, fileData)

        router.refresh();
        formElement.current?.reset();
    }

    const handleCreateFolder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await axios.post(`http://localhost:3001/createFolder?foldername=${folderName}&userid=1&prefix=${path}`);

        router.refresh();
        setFolderName('')
    }



    return (
        // <div className='flex'>
        //     <form className="border-2 border-gray m-2 p-2" onSubmit={handleSubmit} ref={formElement}>
        //         <Input type="file" onChange={handleChange} name="" id="" />
        //         <Button className="border border-black">{loading ? 'wait...' : 'upload file'}</Button>
        //     </form>
        //     <form onSubmit={handleCreateFolder}>
        //         <Input className='border-gray w-min h-min border-2' value={folderName} onChange={e => { setFolderName(e.target.value) }} type="text" name="folder" id="folder" />
        //         <Button className='border-gray w-min h-min border-2'>create folder</Button>
        //     </form>
        // </div>
        <Card className="w-full">
            {/* <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader> */}
            <CardContent className='flex w-full p-5 justify-evenly'>
                <form className="" onSubmit={handleSubmit} ref={formElement}>
                    <Input type="file" onChange={handleChange} name="" id="" />
                    <Button className="border border-black">{loading ? 'wait...' : 'upload file'}</Button>
                </form>
                <form onSubmit={handleCreateFolder} >
                    <Input placeholder='enter folder name' value={folderName} onChange={e => { setFolderName(e.target.value) }} type="text" name="folder" id="folder" />
                    <Button className='border-gray w-min h-min border-2'>create folder</Button>
                </form>
            </CardContent>
            {/* <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
            </CardFooter> */}
        </Card>
    );
}
