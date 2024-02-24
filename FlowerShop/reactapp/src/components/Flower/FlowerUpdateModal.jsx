import React, { useState } from 'react';
import { Modal, Button, Image, Carousel, Col, InputGroup, Form } from 'react-bootstrap';
import { BASE_URL } from "../../urls/urlList";
import noimage from "../../img/noimage.jpg";
import DropdownButtonCategory from '../Category/DropdownButtonCategory';
import DropdownButtonColor from '../Color/DropdownButtonColor';
import DropdownButtonCountry from '../Country/DropdownButtonCountry';
import axios from 'axios';
import { urlFlowersById } from "../../urls/urlList";


const FlowerUpdateModal = ({ active, setActive, currentFlowerData }) => {

    const [modifiedFlowerTitle, setModifiedFlowerTitle] = useState();
    const [modifiedFlowerPrice, setModifiedFlowerPrice] = useState();
    const [modifiedFlowerCount, setModifiedFlowerCount] = useState();


    async function editFlower() {
        var dBcategory = document.getElementById("dropdownButtonCategory")
        var dBcolor = document.getElementById("dropdownButtonColor")
        var dBCountry = document.getElementById("dropdownButonCountry")
        console.log("id category")
        console.log(dBcategory.dataset.idcategory)
        console.log("id color")
        console.log(dBcolor.dataset.idcolor)
        console.log("id country")
        console.log(dBCountry.dataset.idcountry)
        var flower = {
            id: currentFlowerData.id,
            title: modifiedFlowerTitle.title,
            price: modifiedFlowerPrice.price,
            count: modifiedFlowerCount.count,
            categoryId: dBcategory.dataset.idcategory,
            colorId: dBcolor.dataset.idcolor,
            countryId: dBCountry.dataset.idcountry,
        };
        console.log(flower);
        try {
            console.log(urlFlowersById + currentFlowerData.id);
            await axios.put(urlFlowersById + currentFlowerData.id, flower)
            alert("Редактирование успешно");

        }
        catch (error) {
            console.log(error);
            alert(error.response.data);
        }
        setActive(false)
    }



    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
            
        >
            <Modal show={active} onHide={() => setActive(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование цветка </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(currentFlowerData !== undefined) ?                         
                        <>
                        <Carousel>
                            {(currentFlowerData.images !== undefined) ? currentFlowerData.images.map((i, x) =>
                                <Carousel.Item>
                                    <Col xs={6} md={4}>
                                        <Image
                                            style={{ height: 50, width: 50, marginTop: '70px' }}
                                            src={BASE_URL + i.imagePath} />
                                    </Col>
                                </Carousel.Item>
                            ) : <Image src={noimage} style={{ height: 50, width: 50, marginTop: '50px' }} />}
                            </Carousel> 
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-sm">Название</InputGroup.Text>
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder={currentFlowerData.title}
                                    onChange={e => setModifiedFlowerTitle({ ...modifiedFlowerTitle, title: e.target.value })}                                />
                            </InputGroup>
                            <DropdownButtonCategory id="dropdownButtonCategory" currentFlowerDataCategory={currentFlowerData.category.title} />
                            <DropdownButtonColor id="dropdownButtonColor" currentFlowerDataColor={currentFlowerData.color.colorName} />
                            <DropdownButtonCountry id="dropdownButonCountry" currentFlowerDataCountry={currentFlowerData.country.title}  />
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-sm">Стоимость</InputGroup.Text>
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder={currentFlowerData.price}
                                    onChange={e => setModifiedFlowerPrice({ ...modifiedFlowerPrice, price: e.target.value })} />
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-sm">Количество</InputGroup.Text>
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder={currentFlowerData.count}
                                    onChange={e => setModifiedFlowerCount({ ...modifiedFlowerCount, count: e.target.value })} />
                            </InputGroup>
                            
                        </>
                        : <h1>Пусто</h1>}
                    
                    

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setActive(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => editFlower()}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default FlowerUpdateModal