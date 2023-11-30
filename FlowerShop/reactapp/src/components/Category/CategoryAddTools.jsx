import { Container, InputGroup, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import { urlCategories } from "../../urls/urlList";
import CategoryList from './CategoryList';


const CategoryAddTools = () => {
    const [inputValue, setInputValue] = useState({
        title: ''
    });
    return (
        <Container>
            <h2 className="text-center">Настройки категорий</h2>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Введите название</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={inputValue.title}
                    onChange={e => setInputValue({ ...inputValue, title: e.target.value })}
                />
            </InputGroup>
            <Button disabled={inputValue.title.length === 0}
                onClick={async () => {
                    try {
                        await axios.post(urlCategories, inputValue)
                        alert('Успешно!')
                    }
                    catch (e) { alert('Ошибка добавления категории', e) }
                }}
            >Добавить</Button>
            <CategoryList/>
        </Container>
    );
}
export default CategoryAddTools