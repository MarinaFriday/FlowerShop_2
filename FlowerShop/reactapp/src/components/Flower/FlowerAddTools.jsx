﻿import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, InputGroup, Button } from 'react-bootstrap';
import DropdownButtonCategory from '../Category/DropdownButtonCategory';
import DropdownButtonColor from '../Color/DropdownButtonColor';
import DropdownButtonCountry from '../Country/DropdownButtonCountry';
import Image from '../Image/Image';
import { urlFlowers } from '../../urls/urlList';


const FlowerTools = () => {
    const [inputValueFlower, setInputValueFlower] = useState({
        title: '',
        price: '',
        count: ''
    });
    

    return (       
            <Container>
            <h2 className="text-center">Добавление цветка</h2>             
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

            <Image /> 
            
            
            <Button 
                disabled={inputValueFlower.title.length === 0}                               
            
                onClick={async () => {
                    
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
                            countryId: dBCountry.dataset.idcountry
                        };
                        /*var img = {};*/
                        await axios.post(urlFlowers, flower)
                        console.log('Цветок успешно добавлен')
                    }
                    catch(e){ console.log('Ошибка добавления цветка')}
                }}
            >Добавить</Button><h1> </h1> 
            </Container>        
    );
}
export default FlowerTools;