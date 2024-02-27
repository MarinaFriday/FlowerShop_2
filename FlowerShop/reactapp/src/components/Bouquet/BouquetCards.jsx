import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Carousel, Image, Col } from 'react-bootstrap';
import { urlBouquets } from "../../urls/urlList";
import { BASE_URL } from "../../urls/urlList";
import noimage from "../../img/noimage.jpg";


const BouquetCards = () => {
    const [bouquets, setData] = useState([]);

    useEffect(
        () => { (async () => await GetAllBouquets())() }
    , []);

    async function GetAllBouquets() {
        const fetchData = async () => {
            const result = await axios.get(urlBouquets);
            setData(result.data);
        };
        fetchData();
    }

    return (
        <>
            <Row>
                {bouquets.map((b, index) => (
                    <Card style={{ width: '18rem' }}
                        className="col-12 col-md-6 col-lg-4" >
                        <Carousel slide={false}>
                            {(b.images !== null) ? b.images.map((i, x) =>
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
                            <Card.Title> {b.bouquetName} </Card.Title>
                            <Card.Title> Стоимость: {b.bouquetPrice}  </Card.Title>
                            <Card.Text>
                                {b.bouquetDescription}
                            </Card.Text>
                            <Card.Link href={'/bouquet/' + b.id}>Читать далее</Card.Link>
                        </Card.Body>
                    </Card>
                ))
                }
            </Row>
        </>
    );
}

export default BouquetCards