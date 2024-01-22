import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import CarouselBox from '../CarouselBox/CarouselBox';
import OurFlowers from './OurFlowers';
import OurBouquets from './OurBouquets';
import OurCompositions from './OurCompositions';
import ImagesGetAll from '../ImagesUpload/ImagesGetAll';

/*import FlowerCards from '../Flower/FlowerCards';*/

const Home = () => {
    const [ourFlowers, setOurFlowers] = useState(true);
    const [ourBouquets, setOurBouquets] = useState(false);
    const [ourCompositions, setOurCompositions] = useState(false);
    
        return (
            <>
                <h1> </h1><br/>
                <h1> </h1><br />   
                <h1> </h1>    
                <CarouselBox />
                <Container >
                <Row>
                    <h2 className="text-center m-4"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setOurFlowers(true)
                            setOurBouquets(false)
                            setOurCompositions(false)
                        //    console.log(ourFlowers)                            
                        }}
                    >Цветы</h2>
                    <h2 className="text-center m-4"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setOurFlowers(false)
                            setOurBouquets(true)
                            setOurCompositions(false)
                        //    console.log(ourBouquets)
                        }}
                    >Букеты</h2>
                    <h2 className="text-center m-4"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setOurFlowers(false)
                            setOurBouquets(false)
                            setOurCompositions(true)
                        //    console.log(ourCompositions)                            
                        }}
                    >Композиции</h2>
                    {(ourFlowers === true) ? <OurFlowers /> : null}
                    {(ourBouquets === true) ? <OurBouquets />  : null}
                    {(ourCompositions === true) ? <OurCompositions /> : null}   
                    </Row>
                    {/*<ImagesGetAll/>*/}
                </Container>
            </>
        );
    }

export default Home;

