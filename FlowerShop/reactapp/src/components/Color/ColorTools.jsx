import React from 'react';
import { Container, DropdownButton, InputGroup, Form, Button } from 'react-bootstrap';

const ColorTools = () => {
    return (        
            <Container>
            <h2 className="text-center">Добавление цвета</h2>                
            <DropdownButton title="Цвет" >
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
export default ColorTools