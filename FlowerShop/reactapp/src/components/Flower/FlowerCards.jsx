import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row } from 'react-bootstrap';
import { urlFlowers } from "../../urls/urlList";
import { BASE_URL } from "../../urls/urlList";



const FlowerCards = () => {
    const [flowers, setData] = useState([]);

    useEffect(
        () => { (async () => await GetAllFlowers())() }
        , []);

    async function GetAllFlowers() {
        const fetchData = async () => {
            const result = await axios.get(urlFlowers);
            setData(result.data);
            //console.log(result.data);
        };
        fetchData();
    }
    //console.log("Картинка")
    //console.log(flowers.images);
    flowers.map((f, index) => (
        console.log(f.title),
        //console.log(f.images),
        //console.log(f.images.length),

        (f.images.length !== 0) ? f.images.map((i, x) => (
            console.log(i.imagePath))) : console.log("пусто")
    ))

    return (
        <>  
        <Row>
            {flowers.map((f, index) => (
                <Card   style={{ width: '18rem' }}
                        className="col-12 col-md-6 col-lg-4" >
                   {/* <Card.Img variant="top" src={BASE_URL + f.images.imagesPath[0]} />*/}
                    <Card.Body>
                        <Card.Title> {f.title} </Card.Title>
                        <Card.Title> Стоимость: {f.price}  </Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))
            }
        </Row>
        </>
    );
}

export default FlowerCards