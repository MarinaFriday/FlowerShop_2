import React from 'react';
import { Container, Tab, Row, Col, Nav } from 'react-bootstrap';
import FlowerAddTools from "../Flower/FlowerAddTools"
import FlowerEditTools from "../Flower/FlowerEditTools"
import ColorAddTools from "../Color/ColorAddTools"
import ColorEditTools from "../Color/ColorEditTools"
import CategoryAddTools from "../Category/CategoryAddTools"
import CategoryEditTools from "../Category/CategoryEditTools"
import CountryAddTools from "../Country/CountryAddTools"
import CountryEditTools from "../Country/CountryEditTools"


const Tools =() => {    
    return (
        <>
            <h1> </h1><br/>
            <h1> </h1><br/>
            <h1> </h1><br/>
            <Container>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column mt-2">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Добавление цветка</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Редактирование/удаление цветка</Nav.Link>
                                </Nav.Item>                               
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Добавление категории</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth">Редактирование/удаление категории</Nav.Link>
                                </Nav.Item>                            
                                <Nav.Item>
                                    <Nav.Link eventKey="fifth">Добавление цвета</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="sixth">Редактирование/удаление цвета</Nav.Link>
                                </Nav.Item>                          
                                <Nav.Item>
                                    <Nav.Link eventKey="seventh">Добавление страны</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="eighth">Редактирование/удаление страны</Nav.Link>
                                </Nav.Item>
                             
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <FlowerAddTools />
                                </Tab.Pane>
                            </Tab.Content>
                            <Tab.Content>
                                <Tab.Pane eventKey="second">
                                    <FlowerEditTools />
                                </Tab.Pane>
                            </Tab.Content>                                              
                            <Tab.Content>
                                <Tab.Pane eventKey="third">
                                    <CategoryAddTools />
                                </Tab.Pane>
                            </Tab.Content>
                            <Tab.Content>
                                <Tab.Pane eventKey="fourth">
                                    <CategoryEditTools />
                                </Tab.Pane>
                            </Tab.Content>                      
                            <Tab.Content>
                                <Tab.Pane eventKey="fifth">
                                    <ColorAddTools />
                                </Tab.Pane>
                            </Tab.Content>
                            <Tab.Content>
                                <Tab.Pane eventKey="sixth">
                                    <ColorEditTools />
                                </Tab.Pane>
                            </Tab.Content>                  
                            <Tab.Content>
                                <Tab.Pane eventKey="seventh">
                                    <CountryAddTools />
                                </Tab.Pane>
                            </Tab.Content>
                            <Tab.Content>
                                <Tab.Pane eventKey="eighth">
                                    <CountryEditTools />
                                </Tab.Pane>
                            </Tab.Content>                     
                        </Col>
                    </Row>                
                </Tab.Container>
            </Container>
        </>
        );    
}
export default Tools