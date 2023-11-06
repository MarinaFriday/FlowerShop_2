import React from 'react';
import { Container, CardGroup, Card, Button, Row } from 'react-bootstrap';
import CarouselBox from '../CarouselBox/CarouselBox';
import fl from "../../img/miss.jpg"

class Home extends React.Component {
    render() {
        return (
            <>
            <h1>HOME</h1>
                <CarouselBox />
                <Container>
                    <h2 className="text-center m-4">Our Flower</h2>
                    <CardGroup>
                    <Row xs={1} md={2} className="g-4">
                        <Card   style={{ width: '18rem' }}
                            className="mb-2">7
                            <Card.Img variant="top" src={ fl } />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>    
                     </Row>
                    </CardGroup>
                </Container>
            </>
        );
    }
}

export default Home;

