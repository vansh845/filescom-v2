import { filesArray, folderArray } from "@/types";
import axios from "axios";
import Link from "next/link";



export default async function Home() {

  const res = await axios.get('http://localhost:3001/getFiles?userid=1&prefix=/');
  const resFolder = await axios.get('http://localhost:3001/listFolders?userid=1&prefix=/');
  const files = res.data as filesArray[]
  const folders = resFolder.data as folderArray[]
  return (
    <main>

      <div className="flex flex-col">
        {folders.map((folder, index) => <Link href={`/folder/${folder.foldername}`} key={index}>{folder.foldername}</Link>)}
        {files.map((file, index) => <a key={index} href={file.fileurl}>{file.filename}</a>)}
      </div>
    </main>
  )
}