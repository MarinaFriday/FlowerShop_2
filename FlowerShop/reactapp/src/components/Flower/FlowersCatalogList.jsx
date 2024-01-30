import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { urlFlowers, urlFlowersById } from "../../urls/urlList";
import { Carousel, Image, Col, Button } from 'react-bootstrap';
import { BASE_URL } from "../../urls/urlList";
import noimage from "../../img/noimage.jpg";
import DropdownButtonCategory from "../Category/DropdownButtonCategory";
import DropdownButtonColor from "../Color/DropdownButtonColor";
import DropdownButtonCountry from "../Country/DropdownButtonCountry";

const FlowerCatalogList = () => {

    const [flowers, setData] = useState([]);  

    const [isEditing, setIsEditing] = useState(false);
    const [currentFlower, setCurrentFlower] = useState();
    const [modifiedFlowerTitle, setModifiedFlowerTitle] = useState({ flowerTitle: "" });
    const [modifiedFlowerPrice, setModifiedFlowerPrice] = useState({ flowerPrice: "" });
    const [modifiedFlowerCount, setModifiedFlowerCount] = useState({ flowerCount: "" });

    useEffect(
        () => { (async () => await getAllFlowers())() }
        , []);
    async function getAllFlowers() {
        const fetchData = async () => {
            const result = await axios.get(urlFlowers);
            setData(result.data);
            console.log(result.data);
        };
        fetchData();
    }
    //async function editFlower(e) {
    //    e.preventDefault();
    //    try {
    //        //await axios.put(urlFlowersById + currentFlower.id, {
               
    //        }
    //    }
    //    catch (error) {
    //        alert(error);
    //    }
    //    setIsEditing(false);
    //}


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
                                <th>Редактирование</th>
                                <th>Удаление</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            {flowers.map((f, index) => (
                                currentFlower !== f || isEditing !== true
                                ?
                             <tr key={f.id}>
                                <td>{index + 1}</td>
                                    <td>
                                        <Carousel>
                                        {(f.images !== undefined) ? f.images.map((i, x) =>
                                            <Carousel.Item>
                                                <Col xs={6} md={4}>
                                                    <Image
                                                        style={{ height: 50, width: 50, marginTop: '70px' }}
                                                        src={BASE_URL + i.imagePath} />
                                                </Col>
                                            </Carousel.Item>
                                        ) : <Image src={noimage} style={{ height: 50, width: 50, marginTop: '50px' }} />}
                                        </Carousel>
                                    </td>
                                <td>{f.title}</td>
                                <td>{f.category.title}</td>
                                <td>{f.color.colorName}</td>
                                <td>{f.country.title}</td>
                                <td>{f.price}</td>
                                <td>{f.count}</td>
                                <td>
                                    <Button onClick={() => {
                                       setCurrentFlower(f)
                                       setIsEditing(true)
                                            }}>Редактировать
                                    </Button>    
                                </td>
                                <td>
                                    <Button>Удалить</Button>
                                </td>
                             </tr>
                             :
                             <tr key={currentFlower.id}>
                                <td></td>
                                <td>
                                            <Carousel>
                                                {(f.images !== undefined) ? f.images.map((i, x) =>
                                                    <Carousel.Item>
                                                        <Col xs={6} md={4}>
                                                            <Image
                                                                style={{ height: 50, width: 50, marginTop: '70px' }}
                                                                src={BASE_URL + i.imagePath} />
                                                        </Col>
                                                    </Carousel.Item>
                                                ) : <Image src={noimage} style={{ height: 50, width: 50, marginTop: '50px' }} />}
                                            </Carousel>
                                </td>
                                <td>
                                    <input
                                       type='text'
                                       className='form-control'
                                       placeholder={currentFlower.title}
                                       value={modifiedFlowerTitle.title}
                                       onChange={e => setModifiedFlowerTitle({ ...modifiedFlowerTitle, flowerTitle: e.target.value })}
                                     />
                                </td>
                                <td>
                                  <DropdownButtonCategory/>
                                </td>
                                <td>
                                  <DropdownButtonColor />
                                </td>
                                <td>
                                  <DropdownButtonCountry />
                                </td>
                                <td>
                                   <input
                                      type='text'
                                      className='form-control'
                                      placeholder={currentFlower.price}
                                      value={modifiedFlowerTitle.price}
                                      onChange={e => setModifiedFlowerPrice({ ...modifiedFlowerPrice, flowerPrice: e.target.value })}
                                   />
                                </td>
                                <td>
                                    <input
                                       type='text'
                                       className='form-control'
                                       placeholder={currentFlower.count}
                                       value={modifiedFlowerTitle.count}
                                       onChange={e => setModifiedFlowerCount({ ...modifiedFlowerCount, flowerCount: e.target.value })}
                                     />
                                </td>
                                {/*<td className='btnSetting'>*/}
                                {/*     <Button className='btn btn-outline-success' onClick={editColor}>Сохранить</Button>*/}
                                {/*     <Button className='btn btn-outline-danger' onClick={cancelUpdate}>Отмена</Button>*/}
                                {/*</td>*/}
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