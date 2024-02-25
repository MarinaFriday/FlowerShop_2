import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from "axios";
import { urlCategories } from "../../urls/urlList";

const DropdownButtonCategory = ({ currentFlowerDataCategory, isDataUpdatedCategory }) => {
    //(currentFlowerDataCategory !== undefined ? console.log(currentFlowerDataCategory) : console.log("Категория") ) ;
    
    const [categories, setData] = useState([]);
    const [titleDropdownBtn, setTitle] = useState((currentFlowerDataCategory !== undefined ? currentFlowerDataCategory : "Категория"));
    const [idCategory, setIdCategoryData] = useState("Категория");

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(urlCategories);
            setData(result.data);
        };
        fetchData();
    }, [isDataUpdatedCategory]);

    return (
        <div id="dropdownButtonCategory" data-idCategory={idCategory}>
        <DropdownButton title={titleDropdownBtn}>
            {categories.map((category, index) =>
                <Dropdown.Item onClick={() => {
                    setTitle(category.title);
                    console.log(category);
                    setIdCategoryData(category.id)
                }
                }>{category.title}</Dropdown.Item>)
            }
            </DropdownButton>
        </div>
    );
}

export default DropdownButtonCategory