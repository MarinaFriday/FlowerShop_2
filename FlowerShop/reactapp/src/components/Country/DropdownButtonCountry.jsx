import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from "axios";
import { urlCountries } from "../../urls/urlList";

const DropdownButtonCountry = ({ currentFlowerDataCountry }) => {
    const [countries, setData] = useState([]);
    const [titleDropdownBtn, setTitle] = useState((currentFlowerDataCountry !== undefined ? currentFlowerDataCountry : "Страна"));
    const [idCountry, setIdCountryData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(urlCountries);
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div id="dropdownButonCountry" data-IdCountry={ idCountry }>
        <DropdownButton title={titleDropdownBtn}>
            {
                countries.map((country, index) =>
                <Dropdown.Item onClick={() => {
                    setTitle(country.title);
                    setIdCountryData(country.id)
                }
                }>{country.title}</Dropdown.Item>)
            }
        </DropdownButton>
        </div>
    );
}

export default DropdownButtonCountry