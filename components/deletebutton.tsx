'use client'

import { app } from "@/firebase"
import axios from "axios";
import { deleteObject, getStorage, ref } from "firebase/storage"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Deletefile({ filename }: { filename: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    useEffect(() => {
        console.log(filename)
    }, [])
    const storage = getStorage(app);
    const desertRef = ref(storage, filename);

    const handleDelete = () => {
        setLoading(true);

        deleteObject(desertRef).then(async () => {
            // File deleted successfully
            const res = await axios.delete(`http://localhost:3001/deleteFile?filename=${filename}`);
            router.refresh();
            setLoading(false)
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });

    }

    return (
        <button disabled={loading} className={`mr-2 ${loading ? 'text-red-400 cursor-not-allowed' : 'text-red-500'}`} onClick={handleDelete}>delete</button>
    )
}