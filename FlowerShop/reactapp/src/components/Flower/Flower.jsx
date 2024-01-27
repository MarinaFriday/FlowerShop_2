import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { urlFlowersById, urlCountryById, urlColorById, urlCategoryById } from "../../urls/urlList";
import axios from 'axios';
import noimage from "../../img/noimage.jpg";
import { Image } from 'react-bootstrap';

const Flower = () => {
    const params = useParams();

    const [flower, setFlower] = useState([]);
    const [country, setCountry] = useState([]);
    const [color, setColor] = useState([]);
    const [category, setCategory] = useState([]);
    //var flower;
    //var country;


    useEffect(() => { (async () => await GetFlowerById())(); }, []);
    console.log(flower);
    useEffect(() => { (async () => await GetCountryById())(); }, [flower]);
    console.log(country);
    useEffect(() => { (async () => await GetColorById())(); }, [flower]);
    console.log(color);
    useEffect(() => { (async () => await GetCategoryById())(); }, [flower]);
    console.log(category);

    async function GetFlowerById() {
        const fetchData = async () => {
            const result = await axios.get(urlFlowersById + params.id);
            setFlower(result.data);
        };
        fetchData();
    }    
    async function GetCountryById() {
        if (flower !== undefined) {
            try {
                const fetchData = async () => {
                    if (flower.countryId !== undefined) {
                        //console.log(urlCountryById + flower.countryId);
                        const result = await axios.get(urlCountryById + flower.countryId);
                        setCountry(result.data);
                        //console.log(result.data);
                    }
                };
                fetchData();
            } catch { console.log("не удалось выполнить запрос GetCountryById") }
        }
    }
    async function GetColorById() {
        if (flower !== undefined) {
            try {
                const fetchData = async () => {
                    if (flower.colorId !== undefined) {                       
                        const result = await axios.get(urlColorById + flower.colorId);
                        setColor(result.data);             
                    }
                };
                fetchData();
            } catch { console.log("не удалось выполнить запрос GetCountryById") }
        }
    }
    async function GetCategoryById() {
        if (flower !== undefined) {
            try {
                const fetchData = async () => {
                    if (flower.categoryId !== undefined) {                       
                        const result = await axios.get(urlCategoryById + flower.categoryId);
                        setCategory(result.data);                        
                    }
                };
                fetchData();
            } catch { console.log("не удалось выполнить запрос GetCountryById") }
        }
    }
    console.log(noimage);

    return (
        <div>             
            <Image src={noimage} style={{ height: 250, width: 250, marginTop: '70px' }} />            
            <div style={{ marginTop: '50px'}} className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

                <div className="col p-4 d-flex flex-column position-static">                    
                    <h3 className="mb-0">Название цветка: {flower.title}</h3>
                    <p className="card-text mb-auto">Цена:  {flower.price} руб.</p>
                    <p className="card-text mb-auto">Страна:  {country.title} </p>
                    <p className="card-text mb-auto">Цвет:  {color.colorName} </p>
                    <p className="card-text mb-auto">Категория:  {category.title} </p>
                </div>
                
            </div>
        </div>
    );
}
export default Flower