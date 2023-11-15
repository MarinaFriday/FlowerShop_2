import React, { useState, useEffect } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from "axios";
import { urlColors } from "../../urls/urlList";
import Dropdown from 'react-bootstrap/Dropdown';

const DropdownButtonColor = () => {
    const [colors, setData] = useState([]);
    const [titleDropdownBtn, setTitle] = useState("Цвет");
    const [idColor, setIdColorData] = useState("Цвет");

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(urlColors);
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div id="dropdownButtonColor" data-idColor={ idColor }>
        <DropdownButton  title={titleDropdownBtn} >
            {colors.map((color, index) =>
                <Dropdown.Item onClick={() => {
                    setTitle(color.colorName);
                    setIdColorData(color.id)
                }
                }>{color.colorName}</Dropdown.Item>)
            } 
            </DropdownButton>        
        </div>
    );
}

export default DropdownButtonColor