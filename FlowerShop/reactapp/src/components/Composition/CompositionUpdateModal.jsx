import React, { useState } from 'react';
import { Modal, Button, Image, Carousel, Col, InputGroup, Form } from 'react-bootstrap';
import { BASE_URL } from "../../urls/urlList";
import noimage from "../../img/noimage.jpg";
import axios from 'axios';
import { urlCompositionById } from "../../urls/urlList";


const CompositionUpdateModal = ({ active, setActive, currentCompositionData }) => {

    const [modifiedCompositionName, setModifiedCompositionName] = useState();
    const [modifiedCompositionDescription, setModifiedCompositionDescription] = useState();
    //const [modifiedCompositionAvailability, setModifiedCompositionAvailability] = useState();
    const [modifiedCompositionPrice, setModifiedCompositionPrice] = useState();


    async function editComposition() {        

        var composition = {
            id: currentCompositionData.id,
            compositionName: modifiedCompositionName.compositionName,
            compositionDescription: modifiedCompositionDescription.compositionDescription,
            compositionPrice: modifiedCompositionPrice.compositionPrice,
            compositionAvailability: true,
            imagesId: currentCompositionData.imagesId
        };
        console.log(composition);
        try {
            console.log(urlCompositionById + currentCompositionData.id);
            await axios.put(urlCompositionById + currentCompositionData.id, composition)
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
                    <Modal.Title>Редактирование композиции</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(currentCompositionData !== undefined) ?
                        <>
                            <Carousel>
                                {(currentCompositionData.images !== null) ? currentCompositionData.images.map((i, x) =>
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
                                    placeholder={currentCompositionData.compositionName}
                                    onChange={e => setModifiedCompositionName({ ...modifiedCompositionName, compositionName: e.target.value })} />
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-sm">Описание</InputGroup.Text>
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder={currentCompositionData.compositionDescription}
                                    onChange={e => setModifiedCompositionDescription({ ...modifiedCompositionDescription, compositionDescription: e.target.value })} />
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-sm">Стоимость</InputGroup.Text>
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder={currentCompositionData.compositionPrice}
                                    onChange={e => setModifiedCompositionPrice({ ...modifiedCompositionPrice, compositionPrice: e.target.value })} />
                            </InputGroup>
                        </>
                        : <h1>Пусто</h1>}



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setActive(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => editComposition()}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CompositionUpdateModal