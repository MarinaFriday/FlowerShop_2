import { Container, InputGroup, Form, Button } from 'react-bootstrap';
/*import DropdownButtonCountry from './DropdownButtonCountry';*/
import React, { useState } from 'react';
import axios from 'axios';
import { urlCountries } from "../../urls/urlList";
import CountriesList from './CountriesList';


const CountryAddTools = () => {
    const [inputValue, setInputValue] = useState({
        title: ''
    });
    return (
        <Container>
            <h2 className="text-center">Настройки стран</h2>
            {/*<DropdownButtonCountry />*/}
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
                        await axios.post(urlCountries, inputValue)
                    }
                    catch (e) { console.log('Ошибка добавления страны', e) }
                }}
            >Добавить</Button>
            <CountriesList />

        </Container>
    );
}
export default CountryAddTools