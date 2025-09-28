import Embed from "@editorjs/embed"
import Header from "@editorjs/header"
import Image from "@editorjs/image"
import InlineCode from "@editorjs/inline-code"
import Link from "@editorjs/link"
import List from "@editorjs/list"
import Marker from "@editorjs/marker"
import Quote from "@editorjs/quote"

const UploadImageByUrl = (e) => {
    let link = new Promise((resolve, reject) => {
        try{
            resolve(e)
        }catch(err){
            reject(err)
        }
    })

   return link.then((url) => {
        return{
            success: 1,
            file : {
                url
            }
        }
    })
}

//later we will store it in cloud
const UploadImageByFile = async (file) => {
    // Convert file to base64 for demo purposes
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const base64 = await toBase64(file);
    return {
        success: 1,
        file: {
            url: base64
        }
    };
};

export const tool = {
    embed: Embed,
    header: {
        class: Header,
        config: {
            placeholder: "Type header here...",
            levels: [2, 3],
            defaultLevel: 2
        }
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByUrl: UploadImageByUrl,
                uploadByFile: UploadImageByFile
            }
        }
    },
    inlineCode : InlineCode,
    link : Link,
    list : {
        class: List,
        inlineToolbar: true 
    },
    marker: Marker,
    quote: {
        class: Quote,
        inlineToolbar: true 
    }
} 