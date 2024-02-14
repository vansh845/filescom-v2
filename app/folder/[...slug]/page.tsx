import axios from "axios"
import { filesArray, folderArray } from "@/types";
import Link from "next/link";
import { Deletefile } from "@/components/deletebutton";

export default async function Folder({ params }: { params: { slug: string[] } }) {

    const res = await axios.get(`http://localhost:3001/listFolders?userid=1&prefix=${params.slug.join('/')}`,);
    const result = await axios.get(`http://localhost:3001/getFiles?userid=1&prefix=${params.slug.join('/')}`)
    const folders = res.data as folderArray[];
    const files = result.data as filesArray[];

    return (
        <div className="flex flex-col">
            {folders.map((folder, index) => <Link className="border-b my-2 py-2 ml-2" href={`/folder/${params.slug.join('/')}/${folder.foldername}`} key={index}>{folder.foldername}</Link>)}
            {files.map((file, index) => <div key={index} className="border-b my-2 py-2 ml-2 flex"><div className="flex justify-between w-full"><a href={file.fileurl}>{file.filename}</a> <Deletefile filename={file.filename} /></div></div>)}

        </div>
    )
}