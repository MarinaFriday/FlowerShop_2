import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, InputGroup, Button } from 'react-bootstrap';
import { urlBouquets } from '../../urls/urlList';
import { urlUploadImages } from '../../urls/urlList';
import ImagesUpload from '../ImagesUpload/ImagesUpload';
import Cookies from 'universal-cookie';


const BouquetsTools = () => {
    const cookies = new Cookies();
    const config = {
        headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    };
    const [inputValueBouquet, setInputValueBouquet] = useState({
        bouquetName: '',
        bouquetDescription: '',
        bouquetPrice: ''
    });
    const [dataResponseImage, setDataResponseImage] = useState([]);

    var imagesArray;
    const handleDataImages = (data) => {        
        console.log(data);
        setDataResponseImage(data);        
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
            await axios.post(urlUploadImages, formData, config)
                .then((res) => {                                    
                    imagesArray = res.data;                
                })            
        }
        catch (e) {
            console.log('Ошибка добавления изображений')
        }
    }

    function postBouquet() {
        try {
            var bouquet = {
                bouquetName: inputValueBouquet.bouquetName,
                bouquetPrice: inputValueBouquet.bouquetPrice,
                bouquetDescription: inputValueBouquet.bouquetDescription,
                imagesId: imagesArray
            };
            console.log(bouquet);
            axios.post(urlBouquets, bouquet, config);
        }
        catch (error) {
            console.log(error);
            alert(error.response.data);
        }

    }
    async function addBouquet() {
        await postImages();
        //console.log("вышли из метода postImages, что лежит в imagesArray?");
        console.log(imagesArray);
        postBouquet();
    }


    return (
        <Container>
            <h2 className="text-center">Добавление букета</h2>
            <h1>  </h1>
            <ImagesUpload arrayImages={handleDataImages} />
            <h1>  </h1>
            {/*ВВОДИМ НАЗВАНИЕ БУКЕТА*/}
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Hазвание композиции</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={inputValueBouquet.bouquetName}
                    onChange={e => setInputValueBouquet({ ...inputValueBouquet, bouquetName: e.target.value })}
                />
            </InputGroup>
            {/*ВВОДИМ СТОИМОСТЬ*/}
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Стоимость</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={inputValueBouquet.bouquetPrice}
                    onChange={e => setInputValueBouquet({ ...inputValueBouquet, bouquetPrice: e.target.value })}
                />
            </InputGroup>
            {/*ВВОДИМ ОПИСАНИЕ*/}
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Описание</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={inputValueBouquet.bouquetDescription}
                    onChange={e => setInputValueBouquet({ ...inputValueBouquet, bouquetDescription: e.target.value })}
                />
            </InputGroup>
            <Button
                disabled={inputValueBouquet.bouquetName.length === 0}
                onClick={addBouquet}
            >Добавить</Button><h1> </h1>
        </Container>
    );
}
export default BouquetsTools;