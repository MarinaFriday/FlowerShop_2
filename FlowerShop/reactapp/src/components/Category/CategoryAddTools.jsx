import { Container, InputGroup, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import { urlCategories } from "../../urls/urlList";
import CategoryList from './CategoryList';
import Cookies from 'universal-cookie';

const CategoryAddTools = ({ updateCategory }) => {
    const [inputValue, setInputValue] = useState({
        title: ''
    });
    const [isDataUpdated, setDataUpdated] = useState(false);
    const cookies = new Cookies();
    const config = {
        headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    };

    const postCategory = async () => {
        try {
            await axios.post(urlCategories, inputValue, config);
            setDataUpdated(!isDataUpdated)
            updateCategory(!isDataUpdated)
            alert('Успешно!')
        }
        catch (error) {
            console.log(error.response.data);
            alert(error.response.data);
        }
    }

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
                onClick={postCategory}
            >Добавить</Button>
            <CategoryList update={isDataUpdated} />
        </Container>
    );
}
export default CategoryAddTools