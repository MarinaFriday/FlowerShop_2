import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { urlCompositions, urlCompositionById, urlUploadImagesId } from "../../urls/urlList";
import { Carousel, Image, Col, Button } from 'react-bootstrap';
import { BASE_URL } from "../../urls/urlList";
import noimage from "../../img/noimage.jpg";
import CompositionUpdateModal from './CompositionUpdateModal';
import Cookies from 'universal-cookie';



const CompositionsCatalogList = () => {

    const [compositions, setData] = useState([]);
    const [currentComposition, setCurrentComposition] = useState();
    const [modalActive, setModalActive] = useState(false);
    const cookies = new Cookies();
    const config = {
        headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    };

    useEffect(
        () => {
            (async () => await getAllCompositions())()
            console.log(modalActive);
        }
        , [modalActive]);

    async function getAllCompositions() {
        const fetchData = async () => {
            console.log(urlCompositions);
            const result = await axios.get(urlCompositions);
            setData(result.data);
            console.log(result.data);
        };
        fetchData();
    }

    async function deleteImage(c) {
        try {
            for (const image of c.images) {
                console.log(image);
                console.log(urlUploadImagesId + image.id);
                await axios.delete(urlUploadImagesId + image.id, config);
                console.log("изображение удалено");
            }
        } catch (error) {
            alert(error);
        }
        alert("изображения удалены");
    }

    async function deleteComposition(c) {

        try {
            if (c.images !== undefined) {
                await deleteImage(c);
            }
            await axios.delete(urlCompositionById + c.id, config);
            console.log("Композиция удалена");
            alert("Композиция удалена");
            getAllCompositions();
        }
        catch (error) { alert(error) }
    }

    return (
        <>
            <h1> </h1> <br />
            <h1> </h1> <br />           
            <h1>Каталог композиций</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Изображение</th>
                            <th>Название</th>
                            <th>Описание</th>
                            {/*<th>Наличие</th>*/}
                            <th>Стоимость</th>
                            <th>Редактирование</th>
                            <th>Удаление</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compositions.map((c, index) => (
                            <tr key={c.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Carousel>
                                        {(c.images !== null) ? c.images.map((i, x) =>
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
                                <td>{c.compositionName}</td>
                                <td>{c.compositionDescription}</td>
                                {/*<td>{c.compositionAvailability}</td>*/}
                                <td>{c.compositionPrice}</td>
                                <td>
                                    <Button onClick={() => {
                                        setCurrentComposition(c)
                                        setModalActive(true)
                                    }}>Редактировать
                                    </Button>
                                </td>
                                <td>
                                    <Button onClick={() => {
                                        deleteComposition(c)
                                    }}>Удалить</Button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
            <CompositionUpdateModal active={modalActive} setActive={setModalActive} currentCompositionData={currentComposition} />
        </>
    );
}
export default CompositionsCatalogList;