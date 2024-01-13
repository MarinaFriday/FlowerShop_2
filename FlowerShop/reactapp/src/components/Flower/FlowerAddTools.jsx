import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, InputGroup, Button } from 'react-bootstrap';
import DropdownButtonCategory from '../Category/DropdownButtonCategory';
import DropdownButtonColor from '../Color/DropdownButtonColor';
import DropdownButtonCountry from '../Country/DropdownButtonCountry';
import { urlFlowers } from '../../urls/urlList';
import FlowerCatalogList from './FlowersCatalogList';
//import ImageUpload from '../ImagesUpload/ImageUpload';
import ImagesUpload from '../ImagesUpload/ImagesUpload';


const FlowerTools = () => {
    const [inputValueFlower, setInputValueFlower] = useState({
        title: '',
        price: '',
        count: ''
    });
    const [dataResponseImage, setDataResponseImage] = useState([]);

    const handleDataImages = (data) => {
        console.log('data');
        console.log(data);
        setDataResponseImage(data);
        console.log('Родитель');
        console.log(dataResponseImage)
    }
    const click = () => {
        console.log('Родитель');
        console.log(dataResponseImage)
    }
    async function postFlower() {       
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

                };
                await axios.post(urlFlowers, flower);
            }
            catch (e) {
                alert('Ошибка добавления цветка')
            }    
            alert('Цветок успешно добавлен')
    }


    return (       
            <Container>
            <h2 className="text-center">Добавление цветка</h2>
            <h1>  </h1>
            <ImagesUpload arrayImages={handleDataImages} />            
            <h1>  </h1>
            <DropdownButtonCategory id="dropdownButtonCategory" /><h1> </h1>            
            <DropdownButtonColor /><h1> </h1>                        
            <DropdownButtonCountry /><h1> </h1> 
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
            { /*В разработке */}
            {/*<InputGroup size="sm" className="mb-3">*/}
            {/*    <InputGroup.Text id="inputGroup-sizing-sm">Поставка (в разработке)</InputGroup.Text>*/}
            {/*    <Form.Control*/}
            {/*        aria-label="Small"*/}
            {/*        aria-describedby="inputGroup-sizing-sm"*/}
            {/*    />*/}
            {/*</InputGroup>*/}
            <Button 
                disabled={inputValueFlower.title.length === 0}                                           
                onClick={postFlower}
            >Добавить</Button><h1> </h1> 
            <FlowerCatalogList />
            <Button onClick={click}>Консоль</Button>
            </Container>        
    );
}
export default FlowerTools;