import axios from "axios"
import { filesArray, folderArray } from "@/types";
import Link from "next/link";

export default async function Folder({ params }: { params: { slug: string[] } }) {

    const res = await axios.get(`http://localhost:3001/listFolders?userid=1&prefix=${params.slug.join('/')}`,);
    const result = await axios.get(`http://localhost:3001/getFiles?userid=1&prefix=${params.slug.join('/')}`)
    const folders = res.data as folderArray[];
    const files = result.data as filesArray[];

    return (
        <div className="flex flex-col">
            {folders.map((folder, index) => <Link href={`/folder/${params.slug.join('/')}/${folder.foldername}`} key={index}>{folder.foldername}</Link>)}
            {files.map((file, index) => <a key={index} href={file.fileurl}>{file.filename}</a>)}
        </div>
    )
}