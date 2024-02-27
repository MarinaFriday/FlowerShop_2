import React, { useState } from 'react';
import { Modal, Button, Image, Carousel, Col, InputGroup, Form } from 'react-bootstrap';
import { BASE_URL } from "../../urls/urlList";
import noimage from "../../img/noimage.jpg";
import axios from 'axios';
import { urlBouquetById } from "../../urls/urlList";
import Cookies from 'universal-cookie';

const BouquetUpdateModal = ({ active, setActive, currentBouquetData }) => {

    const [modifiedBouquetName, setModifiedBouquetName] = useState();
    const [modifiedBouquetDescription, setModifiedBouquetDescription] = useState();
    const [modifiedBouquetPrice, setModifiedBouquetPrice] = useState();
    const cookies = new Cookies();
    const config = {
        headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    };

    async function editBouquet() {

        var bouquet = {
            id: currentBouquetData.id,
            bouquetName: modifiedBouquetName.bouquetName,
            bouquetDescription: modifiedBouquetDescription.bouquetDescription,
            bouquetPrice: modifiedBouquetPrice.bouquetPrice,
        };
        console.log(bouquet);
        try {
            console.log(urlBouquetById + currentBouquetData.id);
            await axios.put(urlBouquetById + currentBouquetData.id, bouquet, config)
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
                    <Modal.Title>Редактирование букета</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(currentBouquetData !== undefined) ?
                        <>
                            <Carousel>
                                {(currentBouquetData.images !== null) ? currentBouquetData.images.map((i, x) =>
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
                                    placeholder={currentBouquetData.bouquetName}
                                    onChange={e => setModifiedBouquetName({ ...modifiedBouquetName, bouquetName: e.target.value })} />
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-sm">Описание</InputGroup.Text>
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder={currentBouquetData.bouquetDescription}
                                    onChange={e => setModifiedBouquetDescription({ ...modifiedBouquetDescription, bouquetDescription: e.target.value })} />
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-sm">Стоимость</InputGroup.Text>
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder={currentBouquetData.bouquetPrice}
                                    onChange={e => setModifiedBouquetPrice({ ...modifiedBouquetPrice, bouquetPrice: e.target.value })} />
                            </InputGroup>
                        </>
                        : <h1>Пусто</h1>}



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setActive(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => editBouquet()}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BouquetUpdateModal