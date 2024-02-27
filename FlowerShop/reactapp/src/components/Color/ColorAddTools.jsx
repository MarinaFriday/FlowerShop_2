import React, { useState } from 'react';
import { Container, InputGroup, Form, Button } from 'react-bootstrap';
import axios from "axios";
import { urlColors } from "../../urls/urlList";
import ColorList from './ColorList';
import Cookies from 'universal-cookie';

const ColorAddTools = ({ updateColor }) => {
    const [inputValue, setInputValue] = useState({
        colorName: ''
    });

    const [isDataUpdated, setDataUpdated] = useState(false);
    const cookies = new Cookies();
    const config = {
        headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    };

    const postColor = async () => {
        try {
            await axios.post(urlColors, inputValue, config);
            setDataUpdated(!isDataUpdated)
            updateColor(!isDataUpdated)
            alert('Успешно!')
        }
        catch (error) {
            console.log(error.response.data);
            alert(error.response.data);
        }
    }

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
                onClick={postColor}
            >Добавить</Button>
            <ColorList update={isDataUpdated} />
            </Container>           
    );
}
export default ColorAddTools