import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { urlUploadImages } from '../../urls/urlList';


const ImageUpload = () => {
    const [image, setImage] = useState();  

    async function handleImage(event) {
        event.preventDefault();
        console.log(event.target.files[0]);
        await setImage(event.target.files[0]);
        console.log(image);
    }

    
    async function postImage() {
        console.log("postImage");
        console.log(image);
        const formData = new FormData();
        formData.append('images', image);
        for (const data of formData) {
            console.log(data);
        } 
        //try {
        //    await axios.post(urlUploadImages, formData).then((res) => { console.log(res) });
        //    alert('Успешно')
        //}
        //catch (e) { alert('Ошибка добавления изображения') }
    }

    return (
        <>
            <input accept="image/*, .png, .jpg" type="file" onChange={handleImage} multiple />                      
            <Button onClick={postImage}>Отправить</Button>
        </>
    );
}
export default ImageUpload;