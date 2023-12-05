import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { urlCountries, urlCountryById } from "../../urls/urlList";

const CountriesList = () => {

    const [countries, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCountry, setCurrentCountry] = useState();
    const [modifiedCountry, setModifiedCountry] = useState({ title: '' });

    useEffect(
        () => { (async () => await GetAllCountries())() }        
        , []);

    async function GetAllCountries() {
        const fetchData = async () => {
            const result = await axios.get(urlCountries);
            setData(result.data);
            console.log(result.data);
        };
        fetchData();
    }
    
    async function editCountry (e)  {
        e.preventDefault()   
        console.log(currentCountry.id)

        try {
            await axios.put(urlCountryById + '/' + currentCountry.id, {
                title: modifiedCountry.title                                
            });
            alert("Страна изменена");
            setModifiedCountry({ title: '' });            
            GetAllCountries();
        } catch (error) {
            alert(error);
        }
        
        setIsEditing(false)
    }
    const cancelUpdate = (e) => {
        e.preventDefault()
        setIsEditing(false)
    }
    async function deleteCountry(id) {
        try {
            await axios.delete(urlCountryById + '/' + id);
            alert("Страна удалена");
            setModifiedCountry({ title: '' });  
            GetAllCountries();
        } catch (error) {
            alert(error);
        }
    }
    return (
        <>
            <h1> </h1> <br />
            <h3>Список стран</h3>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Название страны</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map((country, index) => (
                            currentCountry !== country || isEditing !== true
                                ?
                            <tr key={country.id}>
                                <td>{index + 1}</td>                               
                                <td>{country.title}</td>
                                <td>
                                        <Button onClick={() => {
                                            setCurrentCountry(country)
                                            setIsEditing(true)
                                            
                                        }}>Редактировать</Button>
                                </td>
                                <td>
                                    <Button onClick={() => deleteCountry(country.id)}>Удалить</Button>
                                </td>
                                </tr>

                                :

                                <tr key={currentCountry.id}>
                                    <td></td>
                                    <td>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder={currentCountry.title}
                                            value={modifiedCountry.title}
                                            onChange={e => setModifiedCountry({ ...modifiedCountry, title: e.target.value })}                                            
                                        />
                                        <h2>{ console.log()}</h2>
                                    </td>                                    
                                    <td className='btnSetting'>
                                        <button className='btn btn-outline-success' onClick={editCountry}>Сохранить</button>
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

export default CountriesList;