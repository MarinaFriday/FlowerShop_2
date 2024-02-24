import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { BASE_URL, urlCompositionById } from "../../urls/urlList";
import axios from 'axios';
import noimage from "../../img/noimage.jpg";
import { Image, Carousel, Col } from 'react-bootstrap';

const Composition = () => {
    const params = useParams();
    console.log(params);
    const [composition, setComposition] = useState([]);    

    useEffect(() => { (async () => await getCompositionById())(); }, []);


    async function getCompositionById() {
        try {
            const fetchData = async () => {
                const result = await axios.get(urlCompositionById + params.id);
                setComposition(result.data);
            };
            fetchData();
        } catch (error) {
            console.log(error);
            alert(error.response.data);
        }
    }    

    return (
        <div>
            <h1></h1><br></br>
            <h1></h1><br></br> 
            <h1></h1> <br></br>
            <h1></h1> <br></br>
            <h1></h1> <br></br>
            <div style={{ marginTop: '50px' }} className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <Carousel slide={false}>
                        {(composition.images !== undefined) ? composition.images.map((i, x) =>
                            <Carousel.Item>
                                <Col xs={6} md={4}>
                                    <Image
                                        style={{ height: 250, width: 250, marginTop: '70px' }}
                                        src={BASE_URL + i.imagePath} />
                                </Col>
                            </Carousel.Item>
                        ) : <Image src={noimage} style={{ height: 250, width: 250, marginTop: '50px' }} />}
                    </Carousel>
                    <h3 className="mb-0"> {composition.compositionName}</h3>
                    <p className="card-text mb-auto">Стоимость:  {composition.compositionPrice} руб.</p>
                    <p className="card-text mb-auto">Описание:  {composition.compositionDescription} </p>
                </div>

            </div>
        </div>
    );
}
export default Composition