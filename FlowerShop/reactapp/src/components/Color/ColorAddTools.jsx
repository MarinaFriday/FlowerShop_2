import React, { useState } from 'react';
import { Container, InputGroup, Form, Button } from 'react-bootstrap';
import axios from "axios";
import { urlColors } from "../../urls/urlList";
import ColorList from './ColorList';

const ColorAddTools = () => {
    const [inputValue, setInputValue] = useState({
        colorName: ''
    });
    return (        
            <Container>
            <h2 className="text-center">Настройки цвета</h2>                           
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Введите название</InputGroup.Text>
                    <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={inputValue.colorName}
                    onChange={e => setInputValue({ ...inputValue, colorName: e.target.value })}
                    />
            </InputGroup>
            <Button disabled={inputValue.colorName.length === 0}
                onClick={async () => {
                    try {                       
                        await axios.post(urlColors, inputValue);
                        alert('Успешно!')
                    }
                    catch (e) { alert('Ошибка добавления цвета', e) }
                }}
            >Добавить</Button>
            <ColorList/>
            </Container>           
    );
}
export default ColorAddTools