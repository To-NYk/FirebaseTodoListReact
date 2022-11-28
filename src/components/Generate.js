import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";

export default function Generate(props) {
    const [imageList, setImageList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const starsRef = ref(storage, `${props.name}/`);
    const images = [];
    const doc = [];
    const imgext = ["gif", "png", "jpg", "jpeg", "bmp"]
    let fileNumber = 0;
    useEffect(() => {
        listAll(starsRef).then((response) => {
            console.log(response.items)
            response.items.forEach((item) => {
                let ext = item.name.split(".")[1]
                getDownloadURL(item).then((url) => {
                    console.log(ext)
                    if (imgext.includes(ext)) {
                       if (!images.includes(url)) {
                        images.push(url) 
                        return
                       }
                    }
                    else {
                        if(!doc.includes(url))
                        doc.push(url)
                    }
                });
            });
        });
        setImageList(images)
        setFileList(doc);
    }, [])
    return (
        <>
            <div className="TETST">
                {imageList.map((url, i) => {
                    return <a key={i} href={url} target="_blank" ><img key={i} src={url} /></a>
                })}
            </div>
            <div className="downloadURLdoc">
                { 
                fileList.map((url, i) => {
                    return <a key={i} href={url} ><span><img src="https://img.icons8.com/fluency/512/rtf-document.png" height="75"/></span><span>Скачать документ {++fileNumber}</span></a>
                })}
            </div>
        </>
    )
}