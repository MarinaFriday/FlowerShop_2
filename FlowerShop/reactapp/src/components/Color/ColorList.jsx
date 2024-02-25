import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { urlColors, urlColorById } from "../../urls/urlList";

const ColorList = ({ update }) => {

    const [colors, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentColor, setCurrentColor] = useState();
    const [modifiedColor, setModifiedColor] = useState({colorName: ""});

    useEffect(
        () => { (async () => await getAllColors())() }
        , [update]);

    async function getAllColors() {
        const fetchData = async () => {
            const result = await axios.get(urlColors);
            setData(result.data);
            console.log(result.data);
        };
        fetchData();
    }

    async function editColor(e) {
        e.preventDefault()
        try {
            var color = {
                id: currentColor.id,
                colorName: modifiedColor.colorName
            }
            await axios.put(urlColorById + currentColor.id, color)
            alert("Цвет изменен");
            setModifiedColor({ colorName: '' });
            getAllColors();
        } catch (error) {
            alert(error);
        }

        setIsEditing(false)
    }

    const cancelUpdate = (e) => {
        e.preventDefault()
        setIsEditing(false)
    }

    async function deleteColor(id) {
        try {
            await axios.delete(urlColorById + id);
            alert("Цвет удален");
            setModifiedColor({ colorName: '' });
            getAllColors();
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
                        {colors.map((color, index) => (
                            currentColor !== color || isEditing !== true
                                ?
                                <tr key={color.id}>
                                    <td>{index + 1}</td>
                                    <td>{color.colorName}</td>
                                    <td>
                                        <Button onClick={() => {
                                            setCurrentColor(color)
                                            setIsEditing(true)
                                        }}>Редактировать</Button>
                                    </td>
                                    <td>
                                        <Button onClick={() => deleteColor(color.id)}>Удалить</Button>
                                    </td>
                                </tr>

                                :

                                <tr key={currentColor.id}>
                                    <td></td>
                                    <td>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder={currentColor.colorName}
                                            value={modifiedColor.colorName}
                                            onChange={e => setModifiedColor({ ...modifiedColor, colorName: e.target.value })}
                                        />
                                    </td>
                                    <td className='btnSetting'>
                                        <Button className='btn btn-outline-success' onClick={editColor}>Сохранить</Button>
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

export default ColorList;