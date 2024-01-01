import React, { useState } from 'react';
//import axios from 'axios';
import { Button } from 'react-bootstrap';
import ImageUploading from 'react-images-uploading';
//import { urlUploadImages } from '../../urls/urlList';


const ImagesUpload = () => {

    const [images, setImages] = useState([]);
    const maxNumber = 3;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        console.log(images);
    };
    //const imagesUpload = (images) => {
    //    const formData = new FormData();
    //    formData.append('images', images[0]);
    //    console.log(formData);
    //    try { axios.post(urlUploadImages, formData).then((res) => { console.log(res) }) }
    //    catch (e) {
    //        alert('Ошибка добавления изображений')
    //    }
    //    alert('Изображения успешно добавлены') 
    //}

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
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
            
        </div>);  
}


export default ImagesUpload;