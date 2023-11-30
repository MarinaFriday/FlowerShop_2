import React from 'react';
import { Container, Tab, Row, Col, Nav } from 'react-bootstrap';
import FlowerAddTools from "../Flower/FlowerAddTools"
import FlowerEditTools from "../Flower/FlowerEditTools"
import ColorAddTools from "../Color/ColorAddTools"
import CategoryAddTools from "../Category/CategoryAddTools"
import CountryAddTools from "../Country/CountryAddTools"



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
                                    <Nav.Link eventKey="third">Настройки категорий</Nav.Link>
                                </Nav.Item>                                                     
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth">Настройки цвета</Nav.Link>
                                </Nav.Item>                             
                                <Nav.Item>
                                    <Nav.Link eventKey="fifth">Настройки стран</Nav.Link>
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
                                    <ColorAddTools />
                                </Tab.Pane>
                            </Tab.Content>                         
                            <Tab.Content>
                                <Tab.Pane eventKey="fifth">
                                    <CountryAddTools />
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