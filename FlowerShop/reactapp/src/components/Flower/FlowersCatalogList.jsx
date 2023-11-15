import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { urlFlowers } from "../../urls/urlList";

const FlowerCatalogList = () => {

    const [flowers, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(urlFlowers);
            setData(result.data);
            console.log(result.data);
        };
        fetchData();
    }, []);

        return (
            <>               
                <h1> </h1> <br />
                <h1> </h1> <br />
                <h1>Каталог цветов</h1>
                <div>                    
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Изображение</th>
                                <th>Цветок</th>
                                <th>Категория</th>
                                <th>Цвет</th>
                                <th>Страна</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Поставка</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            {flowers.map((f, index) => (
                             <tr key={f.id}>
                                <td>{index + 1}</td>
                                <td>{f.images}</td>
                                <td>{f.title}</td>
                                <td>{f.category.title}</td>
                                <td>{f.color.colorName}</td>
                                <td>{f.country.title}</td>
                                <td>{f.price}</td>
                                <td>{f.count}</td>
                                <td>{f.flowersShipments}</td>
                            </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );    
}

export default FlowerCatalogList;