import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import CarouselBox from '../CarouselBox/CarouselBox';
/*import FlowerCards from '../Flower/FlowerCards';*/

const Home = () => {
    const [ourFlowers, setOurFlowers] = useState(false);
    const [ourBouquets, setOurBouquets] = useState(false);
    const [ourCompositions, setOurCompositions] = useState(false);

        return (
            <>
                <h1> </h1><br/>
                <h1> </h1><br />   
                <h1> </h1>    
                <CarouselBox />
                <Container>                    
                    <h2 className="text-center m-4"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                        setOurFlowers(!ourFlowers)
                        console.log(ourFlowers)
                        }}
                    >Цветы</h2>
                    <h2 className="text-center m-4"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setOurBouquets(!ourBouquets)
                            console.log(ourBouquets)
                        }}
                    >Букеты</h2>
                    <h2 className="text-center m-4"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setOurCompositions(!ourCompositions)
                            console.log(ourCompositions)
                        }}
                    >Композиции</h2>
                    <div ></div>
                   
                   
                </Container>
            </>
        );
    }

export default Home;

