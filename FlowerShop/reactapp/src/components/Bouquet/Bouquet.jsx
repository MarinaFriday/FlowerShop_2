import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { BASE_URL, urlBouquetById } from "../../urls/urlList";
import axios from 'axios';
import noimage from "../../img/noimage.jpg";
import { Image, Carousel, Col } from 'react-bootstrap';

const Bouquet = () => {
    const params = useParams();
    console.log(params);
    const [bouquet, setBouquet] = useState([]);

    useEffect(() => { (async () => await getBouquetById())(); }, []);


    async function getBouquetById() {
        try {
            const fetchData = async () => {
                const result = await axios.get(urlBouquetById + params.id);
                setBouquet(result.data);
            };
            fetchData();
        } catch (error) {
            console.log(error);
            alert(error.response.data);
        }
    }

    return (
        <div>            
            <h1></h1> <br></br>
            <h1></h1> <br></br>
            <div style={{ marginTop: '50px' }} className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <Carousel slide={false}>
                        {(bouquet.images !== undefined) ? bouquet.images.map((i, x) =>
                            <Carousel.Item>
                                <Col xs={6} md={4}>
                                    <Image
                                        style={{ height: 250, width: 250, marginTop: '70px' }}
                                        src={BASE_URL + i.imagePath} />
                                </Col>
                            </Carousel.Item>
                        ) : <Image src={noimage} style={{ height: 250, width: 250, marginTop: '50px' }} />}
                    </Carousel>
                    <h3 className="mb-0"> {bouquet.bouquetName}</h3>
                    <p className="card-text mb-auto">Стоимость:  {bouquet.bouquetPrice} руб.</p>
                    <p className="card-text mb-auto">Описание:  {bouquet.bouquetDescription} </p>
                </div>

            </div>
        </div>
    );
}
export default Bouquet