import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import flower1 from "../../asserts/flower1.jpg";
import flower2 from "../../asserts/flower2.jpg";
import flower3 from "../../asserts/flower3.jpg";

const CarouselBox = () => {
    return (
        <Carousel >
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={flower1}
                    alt="Flower1"
                />
                
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={flower2}
                    alt="Flower2"
                />
              
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={flower3}
                    alt="Flower3"
                />
             
            </Carousel.Item>
        </Carousel>
    );
}
export default CarouselBox