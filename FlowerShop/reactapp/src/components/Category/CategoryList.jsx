import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { urlCategories, urlCategoryById } from "../../urls/urlList";
import Cookies from 'universal-cookie';


const CategoriesList = ({ update }) => {

    const [categories, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState();
    const [modifiedCategory, setModifiedCategory] = useState({ title: '' });
    const cookies = new Cookies();
    const config = {
        headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    };

    useEffect(
        () => {
            (async () => await getAllCategories())()            
        }
        , [update]);

    async function getAllCategories() {
        const fetchData = async () => {
            const result = await axios.get(urlCategories);
            setData(result.data);
            console.log(result.data);
        };
        fetchData();
    }

    async function editCategory(e) {
        e.preventDefault()  
        var category = {
            id: currentCategory.id,
            title: modifiedCategory.title
        }
        try {
            await axios.put(urlCategoryById + currentCategory.id, category, config);
            alert("Категория изменена");
            setModifiedCategory({ title: '' });
            getAllCategories();
        } catch (error) {
            alert(error);
        }

        setIsEditing(false)
    }

    const cancelUpdate = (e) => {
        e.preventDefault()
        setIsEditing(false)
    }
   
    async function deleteCategory(id) {
        try {
            await axios.delete(urlCategoryById + id, config);
            alert("Категория удалена");
            setModifiedCategory({ title: '' });
            getAllCategories();
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <h1> </h1> <br />
            <h3>Список категорий</h3>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Название категории</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            currentCategory !== category || isEditing !== true
                                ?
                                <tr key={category.id}>
                                    <td>{index + 1}</td>
                                    <td>{category.title}</td>
                                    <td>
                                        <Button onClick={() => {
                                            setCurrentCategory(category)
                                            setIsEditing(true)
                                        }}>Редактировать</Button>
                                    </td>
                                    <td>
                                        <Button onClick={() => deleteCategory(category.id)}>Удалить</Button>
                                    </td>
                                </tr>

                                :

                                <tr key={currentCategory.id}>
                                    <td></td>
                                    <td>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder={currentCategory.title}
                                            value={modifiedCategory.title}
                                            onChange={e => setModifiedCategory({ ...modifiedCategory, title: e.target.value })}
                                        />    
                                    </td>
                                    <td className='btnSetting'>
                                        <button className='btn btn-outline-success' onClick={editCategory}>Сохранить</button>
                                        <button className='btn btn-outline-danger' onClick={cancelUpdate}>Отмена</button>
                                    </td>
                                </tr>
                        ))
                        }
                    </tbody>
               </table>
            </div>
        </>
    );
}

export default CategoriesList;