import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, InputGroup, Button } from 'react-bootstrap';
import { urlCompositions } from '../../urls/urlList';
import { urlUploadImages } from '../../urls/urlList';
import ImagesUpload from '../ImagesUpload/ImagesUpload';


const CompositionTools = () => {
    const [inputValueComposition, setInputValueComposition] = useState({
        compositionName: '',
        compositionDescription: '',
        compositionPrice: ''
    });
    const [dataResponseImage, setDataResponseImage] = useState([]);
    const [isDataUpdated, setDataUpdated] = useState(false);


    var imagesArray;
    const handleDataImages = (data) => {
        //console.log('что получила из imagesupload');
        console.log(data);
        setDataResponseImage(data);
        //console.log('положилось ли информация куда надо ');
        //console.log(dataResponseImage)
    }

    async function postImages() {
        const formData = new FormData();
        if (dataResponseImage !== undefined) {
            for (const data of dataResponseImage) {
                console.log(data);
            }
            for (let i = 0; i < dataResponseImage.length; i++) {
                formData.append('images', dataResponseImage[i].file);
            }
            console.log("смотрим что лежит в формДате");
            for (const data of formData) {
                console.log(data);
            }
        }
        try {
            await axios.post(urlUploadImages, formData)
                .then((res) => {
                    //выводим ответ от сервера (массив id изображений)
                    //console.log("выводим ответ от сервера (массив id изображений)");
                    //console.log(res.data);                   
                    imagesArray = res.data;
                    //console.log("выводи что лежит в ответе (массиве imagesArray1)");
                    //console.log(imagesArray);
                })
            console.log('Изображения успешно добавлены');
        }
        catch (e) {
            console.log('Ошибка добавления изображений')
        }
    }

    function postComposition() {
        try {
            
            var composition = {
                compositionName: inputValueComposition.compositionName,
                compositionPrice: inputValueComposition.compositionPrice,
                compositionDescription: inputValueComposition.compositionDescription,                                                
                imagesId: imagesArray
            };
            console.log(composition);
            axios.post(urlCompositions, composition);
            setDataUpdated(!isDataUpdated)
        }
        catch (e) {
            alert('Ошибка добавления цветка')
        }
        alert('Композиция успешно добавлена')
    }
    async function addComposition() {
        await postImages();
        //console.log("вышли из метода postImages, что лежит в imagesArray?");
        console.log(imagesArray);
        postComposition();
    }


    return (
        <Container>
            <h2 className="text-center">Добавление цветка</h2>
            <h1>  </h1>
            <ImagesUpload arrayImages={handleDataImages} />
            <h1>  </h1>
            {/*ВВОДИМ НАЗВАНИЕ КОМПОЗИЦИИ*/}
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Hазвание композиции</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={inputValueComposition.compositionName}
                    onChange={e => setInputValueComposition({ ...inputValueComposition, compositionName: e.target.value })}
                />
            </InputGroup>
            {/*ВВОДИМ СТОИМОСТЬ*/}
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Стоимость</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={inputValueComposition.compositionPrice}
                    onChange={e => setInputValueComposition({ ...inputValueComposition, compositionPrice: e.target.value })}
                />
            </InputGroup>
            {/*ВВОДИМ ОПИСАНИЕ*/}
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Описание</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={inputValueComposition.count}
                    onChange={e => setInputValueComposition({ ...inputValueComposition, count: e.target.value })}
                />
            </InputGroup>
            <Button
                disabled={inputValueComposition.compositionName.length === 0}
                onClick={addComposition}
            >Добавить</Button><h1> </h1>
        </Container>
    );
}
export default CompositionTools;