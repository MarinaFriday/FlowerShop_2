import React from 'react';
import { Container, Form, DropdownButton, InputGroup, Button } from 'react-bootstrap';

const FlowerTools = () => {
    return (       
            <Container>
            <h2 className="text-center">Добавление цветка</h2>            
            <DropdownButton title="Категории">                               
            </DropdownButton>
            <DropdownButton title="Цвет">
            </DropdownButton>
            <DropdownButton title="Страны">
            </DropdownButton>
            <InputGroup size="sm" className="mb-3">                
                <InputGroup.Text id="inputGroup-sizing-sm">Введите название</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                />
            </InputGroup>
            <Button>Добавить</Button>
            </Container>        
    );
}
export default FlowerTools;