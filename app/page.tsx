import { Deletefile } from "@/components/deletebutton";
import { Card } from "@/components/ui/card";
import { filesArray, folderArray } from "@/types";
import axios from "axios";
import Link from "next/link";




export default async function Home() {

  const res = await axios.get('http://localhost:3001/getFiles?userid=1&prefix=/');
  const resFolder = await axios.get('http://localhost:3001/listFolders?userid=1&prefix=/');
  const files = res.data as filesArray[]
  const folders = resFolder.data as folderArray[]
  return (
    <main className="flex flex-col">


      {folders.map((folder, index) => <Link className="border-b my-2 py-2 ml-2" href={`/folder/${folder.foldername}`} key={index}>{folder.foldername}</Link>)}
      {files.map((file, index) => <div key={index} className="border-b my-2 py-2 ml-2 flex"><div className="flex justify-between w-full"><a href={file.fileurl}>{file.filename}</a> <Deletefile filename={file.filename} /></div></div>)}

    </main>
  )
}