import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ImageUploading from 'react-images-uploading';
import { urlUploadImages } from '../../urls/urlList';


const ImagesUpload = () => {

    const [images, setImages] = useState([]);
    const maxNumber = 3;

    async function handleImages (imageList, addUpdateIndex) {
        // data for submit
        console.log(imageList, addUpdateIndex);
        console.log("начало цикла")

        for (const file of imageList) {
            console.log(file.file)
        }
        console.log("конец цикла")
        await setImages(imageList);        
};
    async function postImages()  {
        const formData = new FormData();
        //for (const data of images) {
        //    console.log(data);
        //}
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i].file);
        }                    
        
        for (const data of formData) {
            console.log(data);
        } 
        try {
            await axios.post(urlUploadImages, formData)
                .then((res) => { console.log(res) })
            alert('Изображения успешно добавлены') 
        }
        catch (e) {
            alert('Ошибка добавления изображений')
        }
    }

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                type="file"
                onChange={handleImages}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <Button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Нажмите или перетащите
                        </Button>
                        &nbsp;
                        <Button onClick={onImageRemoveAll}>Удалить все изображения</Button>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <Button onClick={() => onImageUpdate(index)}>Изменить</Button>
                                    <Button onClick={() => onImageRemove(index)}>Удалить</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading><h1> </h1>
            <Button onClick={postImages}>Отправить на сервер</Button>

        </div>);  
}


export default ImagesUpload;