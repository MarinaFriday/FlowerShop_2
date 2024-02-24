import React from 'react';
import { Container, Tab, Row, Col, Nav } from 'react-bootstrap';
import FlowerAddTools from "../Flower/FlowerAddTools"
import ColorAddTools from "../Color/ColorAddTools"
import CategoryAddTools from "../Category/CategoryAddTools"
import CountryAddTools from "../Country/CountryAddTools"
import CompositionAddTools from "../Composition/CompositionAddTools"
import BouquetAddTools from "../Bouquet/BouquetAddTools"

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
                                    <Nav.Link eventKey="second">Настройки категорий</Nav.Link>
                                </Nav.Item>                                                     
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Настройки цвета</Nav.Link>
                                </Nav.Item>                             
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth">Настройки стран</Nav.Link>
                                </Nav.Item>                              
                                <Nav.Item>
                                    <Nav.Link eventKey="fifth">Добавление композиции</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="sixth">Добавление букета</Nav.Link>
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
                                    <CategoryAddTools />
                                </Tab.Pane>
                            </Tab.Content>                           
                            <Tab.Content>
                                <Tab.Pane eventKey="third">
                                    <ColorAddTools />
                                </Tab.Pane>
                            </Tab.Content>                         
                            <Tab.Content>
                                <Tab.Pane eventKey="fourth">
                                    <CountryAddTools />
                                </Tab.Pane>
                            </Tab.Content> 
                            <Tab.Content>
                                <Tab.Pane eventKey="fifth">
                                    <CompositionAddTools />
                                </Tab.Pane>
                            </Tab.Content> 
                            {/*<Tab.Content>*/}
                            {/*    <Tab.Pane eventKey="sixth">*/}
                            {/*        <BouquetAddTools />*/}
                            {/*    </Tab.Pane>*/}
                            {/*</Tab.Content> */}
                        </Col>
                    </Row>                
                </Tab.Container>
            </Container>
        </>
        );    
}
export default Tools