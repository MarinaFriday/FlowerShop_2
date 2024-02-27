import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, InputGroup, Button } from 'react-bootstrap';
import DropdownButtonCategory from '../Category/DropdownButtonCategory';
import DropdownButtonColor from '../Color/DropdownButtonColor';
import DropdownButtonCountry from '../Country/DropdownButtonCountry';
import { urlFlowers } from '../../urls/urlList';
import { urlUploadImages } from '../../urls/urlList';
import ImagesUpload from '../ImagesUpload/ImagesUpload';
import Cookies from 'universal-cookie';



const FlowerTools = ({ isDataUpdatedColor, isDataUpdatedCountry, isDataUpdatedCategory }) => {
    console.log("isDataUpdatedCountry", isDataUpdatedCountry)
    const [inputValueFlower, setInputValueFlower] = useState({
        title: '',
        price: '',
        count: ''
    });
    const [dataResponseImage, setDataResponseImage] = useState([]);
    const [isDataUpdated, setDataUpdated] = useState(false);
    const cookies = new Cookies();
    const config = {
        headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    };
    
    var imagesArray;
    const handleDataImages = (data) => {
        //console.log('что получила из imagesupload');
        console.log(data);
        setDataResponseImage(data);
        //console.log('положилось ли информация куда надо ');
        //console.log(dataResponseImage)
    }

    async function postImages() {
        console.log("config", config)
        const formData = new FormData();
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
        try {
            await axios.post(urlUploadImages, formData, config)
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
    
    function postFlower() {
        try {
            var dBcategory = document.getElementById("dropdownButtonCategory")
            var dBcolor = document.getElementById("dropdownButtonColor")
            var dBCountry = document.getElementById("dropdownButonCountry")
            //console.log(dBcategory.dataset.idcategory)
            //console.log(dBcolor.dataset.idcolor)
            //console.log(dBCountry.dataset.idcountry)

            var flower = {
                title: inputValueFlower.title,
                price: inputValueFlower.price,
                count: inputValueFlower.count,
                categoryId: dBcategory.dataset.idcategory,
                colorId: dBcolor.dataset.idcolor,
                countryId: dBCountry.dataset.idcountry,
                imagesId: imagesArray
            };
            console.log(flower);
            axios.post(urlFlowers, flower, config);
            setDataUpdated(!isDataUpdated)
        }
        catch (e) {
            alert('Ошибка добавления цветка')
        }
        alert('Цветок успешно добавлен')
    }
    async function addFlower() {   
        await postImages();
        //console.log("вышли из метода postImages, что лежит в imagesArray?");
        console.log(imagesArray);
        postFlower();
    }


    return (       
            <Container>
            <h2 className="text-center">Добавление цветка</h2>
            <h1>  </h1>
            <ImagesUpload arrayImages={handleDataImages} />            
            <h1>  </h1>
            <DropdownButtonCategory id="dropdownButtonCategory" isDataUpdatedCategory={isDataUpdatedCategory} /><h1> </h1>            
            <DropdownButtonColor isDataUpdatedColor={isDataUpdatedColor} /><h1> </h1>                        
            <DropdownButtonCountry isDataUpdatedCountry={isDataUpdatedCountry} /><h1> </h1> 
            {/*ВВОДИМ НАЗВАНИЕ ЦВЕТКА*/}
            <InputGroup size="sm" className="mb-3">                
                <InputGroup.Text id="inputGroup-sizing-sm">Hазвание цветка</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={inputValueFlower.title}
                    onChange={e => setInputValueFlower({ ...inputValueFlower, title: e.target.value })}
                />
            </InputGroup>
            {/*ВВОДИМ СТОИМОСТЬ*/}
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Стоимость</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={inputValueFlower.price}
                    onChange={e => setInputValueFlower({ ...inputValueFlower, price: e.target.value })}
                />
            </InputGroup>
            {/*ВВОДИМ КОЛИЧЕСТВО*/}
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Количество</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={inputValueFlower.count}
                    onChange={e => setInputValueFlower({ ...inputValueFlower, count: e.target.value })}
                />
            </InputGroup>           
            <Button 
                disabled={inputValueFlower.title.length === 0}                                           
                onClick={addFlower}
            >Добавить</Button><h1> </h1>            
            </Container>        
    );
}
export default FlowerTools;