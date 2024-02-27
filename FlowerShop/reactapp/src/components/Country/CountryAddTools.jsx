import { Container, InputGroup, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import { urlCountries } from "../../urls/urlList";
import CountriesList from './CountriesList';
import Cookies from 'universal-cookie';



const CountryAddTools = ({ updateCountry }) => {
    const [inputValue, setInputValue] = useState({
        title: ''
    });
    const [isDataUpdated, setDataUpdated] = useState(false);
    const cookies = new Cookies();
    const config = {
        headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    };


    const postCountry = async () => {
        try {
            await axios.post(urlCountries, inputValue, config);
            setDataUpdated(!isDataUpdated)
            updateCountry(!isDataUpdated)
            alert('Успешно!')
        }
        catch (error) {
            console.log(error.response.data);
            alert(error.response.data);
        }
    }

    return (
        <Container>
            <h2 className="text-center">Настройки стран</h2>
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
                onClick={postCountry}
            >Добавить</Button>
            <CountriesList update={isDataUpdated} />

        </Container>
    );
}
export default CountryAddTools