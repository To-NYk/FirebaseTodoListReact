import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

export default function Generate(props) {
    const [fileList, setFileList] = useState([]);
    const starsRef = ref(storage, `${props.name}/`);
    const URI = [];
    useEffect(() => {
        listAll(starsRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => { 
                    if (!URI.includes(url)) {
                        URI.push(url)
                    }
                });
            });
        });
        setFileList(URI);
    }, [])
    return (
        <div className="TETST">
            {fileList.map((url) => {
                return <img src={url} />
            })}
        </div>

    )
}