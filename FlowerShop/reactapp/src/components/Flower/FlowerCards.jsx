import React from 'react';
import { CardGroup, Card, Button, Row } from 'react-bootstrap';
import fl from "../../img/miss.jpg"


const FlowerCards = () => {
    return (
        <CardGroup> 
         <Row xs={1} md={2} className="g-4"> 
        <Card   style={{ width: '18rem' }} 
            className="mb-2"> 
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
    );
}

export default FlowerCards