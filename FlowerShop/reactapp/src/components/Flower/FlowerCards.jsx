import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Carousel, Image, Col } from 'react-bootstrap';
import { urlFlowers } from "../../urls/urlList";
import { BASE_URL } from "../../urls/urlList";
import noimage from "../../img/noimage.jpg";



const FlowerCards = () => {
    const [flowers, setData] = useState([]);

    useEffect(
        () => { (async () => await GetAllFlowers())() }
        , []);

    async function GetAllFlowers() {
        const fetchData = async () => {
            const result = await axios.get(urlFlowers);
            setData(result.data);
        };
        fetchData();
    }

    return (
        <>  
        <Row>
            {flowers.map((f, index) => (
                <Card   style={{ width: '18rem' }}
                    className="col-12 col-md-6 col-lg-4" >
                    <Carousel slide ={ false }>
                    {(f.images.length !== 0) ? f.images.map((i, x) => 
                        <Carousel.Item>
                            <Col xs={6} md={4}>
                                <Image
                                    style={{ height: 250, width: 250 }}                                    
                                    src={BASE_URL + i.imagePath} />
                            </Col>
                            </Carousel.Item>                        
                        ) :  <Image src={noimage} style={{ height: 250, width: 250 }} />}                                                  
                    </Carousel>
                    <Card.Body>
                        <Card.Title> {f.title} </Card.Title>
                        <Card.Title> Стоимость: {f.price}  </Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Card.Link href={'/flowers/' + f.id}>Читать далее</Card.Link>
                    </Card.Body>
                </Card>
            ))
                }                
        </Row>
        </>
    );
}

export default FlowerCards