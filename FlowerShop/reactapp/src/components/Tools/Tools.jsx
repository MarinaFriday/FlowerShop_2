import React from 'react';
import { Container, Tab, Row, Col, Nav } from 'react-bootstrap';
import FlowerTools from "../Flower/FlowerTools"
import ColorTools from "../Color/ColorTools"
import CategoryTools from "../Category/CategoryTools"

const Tools =() => {    
        return (
            <Container>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column mt-2">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Добавление цветка</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Добавление категории</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Добавление цвета</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                <FlowerTools />
                                </Tab.Pane>
                            </Tab.Content>
                            <Tab.Content>
                                <Tab.Pane eventKey="second">
                                    <CategoryTools />
                                </Tab.Pane>
                            </Tab.Content>
                            <Tab.Content>
                                <Tab.Pane eventKey="third">
                                    <ColorTools />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>                
                </Tab.Container>
            </Container>
        );    
}
export default Tools