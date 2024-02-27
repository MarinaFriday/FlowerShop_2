import React, { useState } from 'react';
//import axios from 'axios';
import { Button } from 'react-bootstrap';
import ImageUploading from 'react-images-uploading';
//import { urlUploadImages } from '../../urls/urlList';


const ImagesUpload = ({arrayImages}) => {

    const [images, setImages] = useState([]);
    //var imagesArray;
    const maxNumber = 3;

    const dataImagesFunction = () => {
        arrayImages(images);
    }

    async function handleImages (imageList, addUpdateIndex) {
        // data for submit
        await setImages(imageList);
    };
    dataImagesFunction();


   

    return (
        <div className="App" >
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
                            Нажмите или перетащите изображение
                        </Button>
                        &nbsp;
                        <h1> </h1>
                        <Button onClick={onImageRemoveAll}>Удалить все изображения</Button>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <Button onClick={() => onImageUpdate(index)}>Изменить</Button>
                                    <h1> </h1>
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