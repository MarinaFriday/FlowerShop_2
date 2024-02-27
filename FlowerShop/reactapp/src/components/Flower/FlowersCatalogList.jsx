import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { urlFlowers, urlFlowersById, urlUploadImagesId } from "../../urls/urlList";
import { Carousel, Image, Col, Button, Container } from 'react-bootstrap';
import { BASE_URL } from "../../urls/urlList";
import noimage from "../../img/noimage.jpg";
import FlowerUpdateModal from './FlowerUpdateModal';
import Cookies from 'universal-cookie';



const FlowerCatalogList = () => {

    const [flowers, setData] = useState([]);      
    const [currentFlower, setCurrentFlower] = useState();
    const [modalActive, setModalActive] = useState(false);
    const cookies = new Cookies();
    const config = {
        headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    };

    useEffect(
        () => { (async () => await getAllFlowers())() }
        , [modalActive]);

    async function getAllFlowers() {
        const fetchData = async () => {
            const result = await axios.get(urlFlowers);
            setData(result.data);
            console.log(result.data);
        };
        fetchData();
    }    

    async function deleteImage(f) {
        try {
            for (const image of f.images) {
                console.log(image);
                console.log(urlUploadImagesId + image.id);
                await axios.delete(urlUploadImagesId + image.id, config);
                console.log("изображение удалено");
                
            }            
        } catch (error) {
            alert(error);
        }
        alert("изображения удалены");
    }

    async function deleteFlower(f) {
        
        try {
            if (f.images !== undefined) {
               await deleteImage(f);
            }
            await axios.delete(urlFlowersById + f.id, config);
            console.log("цветок удален");
            alert("Цветок удален");
            getAllFlowers();
        }
        catch (error) { alert(error) }
    }

        return (
            <Container>               
                <h1> </h1> <br />
                <h1> </h1> <br />
                <h1>Каталог цветов</h1>                
                <div>                    
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Изображение</th>
                                <th>Цветок</th>
                                <th>Категория</th>
                                <th>Цвет</th>
                                <th>Страна</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Редактирование</th>
                                <th>Удаление</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            {flowers.map((f, index) => (
                             <tr key={f.id}>
                                    <td key={"0-" + f.id}>{index + 1}</td>
                                    <td key={"1-" + f.id}>
                                        <Carousel>
                                        {(f.images !== null) ? f.images.map((i, x) =>
                                            <Carousel.Item>
                                                <Col xs={6} md={4}>
                                                    <Image
                                                        style={{ height: 50, width: 50, marginTop: '70px' }}
                                                        src={BASE_URL + i.imagePath} />
                                                </Col>
                                            </Carousel.Item>
                                        ) : <Image src={noimage} style={{ height: 50, width: 50, marginTop: '50px' }} />}
                                        </Carousel>
                                    </td>
                                    <td key={"2-" + f.id}>{f.title}</td>
                                    <td key={"3-" + f.id}>{(f.category !== null) ? f.category.title : "-"}</td>
                                    <td key={"4-" + f.id}>{(f.color !== null) ? f.color.colorName : "-"}</td>
                                    <td key={"5-" + f.id}>{(f.country !== null) ? f.country.title : "-"}</td>
                                    <td key={"6-" + f.id}>{f.price}</td>
                                    <td key={"7-" + f.id}>{f.count}</td>
                                <td key={"8-" + f.id}>
                                    <Button onClick={() => {
                                       setCurrentFlower(f)
                                       setModalActive(true)
                                            }}>Редактировать
                                    </Button>    
                                </td>
                                <td key={"9-" + f.id}>
                                    <Button onClick={() => {
                                       deleteFlower(f)
                                    }}>Удалить</Button>
                                </td>
                             </tr>                            
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <FlowerUpdateModal active={modalActive} setActive={setModalActive} currentFlowerData={currentFlower}  />
            </Container>
        );    
}

export default FlowerCatalogList;