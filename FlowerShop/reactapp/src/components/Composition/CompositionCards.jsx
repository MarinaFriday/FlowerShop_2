import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Carousel, Image, Col } from 'react-bootstrap';
import { urlCompositions } from "../../urls/urlList";
import { BASE_URL } from "../../urls/urlList";
import noimage from "../../img/noimage.jpg";



const CompositionCards = () => {
    const [compositions, setData] = useState([]);

    useEffect(
        () => { (async () => await GetAllCompositions())() }
        , []);

    async function GetAllCompositions() {
        const fetchData = async () => {
            const result = await axios.get(urlCompositions);
            setData(result.data);
        };
        fetchData();
    }

    return (
        <>
            <Row>
                {compositions.map((c, index) => (
                    <Card style={{ width: '18rem' }}
                        className="col-12 col-md-6 col-lg-4" >
                        <Carousel slide={false}>
                            {(c.images !== null) ? c.images.map((i, x) =>
                                <Carousel.Item>
                                    <Col xs={6} md={4}>
                                        <Image
                                            style={{ height: 250, width: 250 }}
                                            src={BASE_URL + i.imagePath} />
                                    </Col>
                                </Carousel.Item>
                            ) : <Image src={noimage} style={{ height: 250, width: 250 }} />}
                        </Carousel>
                        <Card.Body>
                            <Card.Title> {c.compositionName} </Card.Title>
                            <Card.Title> Стоимость: {c.compositionPrice}  </Card.Title>
                            <Card.Text>
                                { c.compositionDescription }
                            </Card.Text>
                            <Card.Link href={'/compositions/' + c.id}>Читать далее</Card.Link>
                        </Card.Body>
                    </Card>
                ))
                }

            </Row>
        </>
    );
}

export default CompositionCards