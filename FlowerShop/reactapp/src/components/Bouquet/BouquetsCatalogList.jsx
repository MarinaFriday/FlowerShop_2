import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { urlBouquets, urlBouquetById, urlUploadImagesId } from "../../urls/urlList";
import { Carousel, Image, Col, Button } from 'react-bootstrap';
import { BASE_URL } from "../../urls/urlList";
import noimage from "../../img/noimage.jpg";
import BouquetUpdateModal from './BouquetUpdateModal'


const BouquetsCatalogList = () => {

    const [bouquets, setData] = useState([]);
    const [currentBouquet, setCurrentBouquet] = useState();
    const [modalActive, setModalActive] = useState(false);

    useEffect(
        () => { (async () => await getAllBouquets())() }
        , [modalActive]);

    async function getAllBouquets() {
        const fetchData = async () => {
            const result = await axios.get(urlBouquets);
            setData(result.data);
            console.log(result.data);
        };
        fetchData();
    }

    async function deleteImage(b) {
        try {
            for (const image of b.images) {
                console.log(image);
                console.log(urlUploadImagesId + image.id);
                await axios.delete(urlUploadImagesId + image.id);
                console.log("изображение удалено");

            }
        } catch (error) {
            alert(error);
        }
        alert("изображения удалены");
    }

    async function deleteBouquet(b) {

        try {
            if (b.images !== undefined) {
                await deleteImage(b);
            }
            await axios.delete(urlBouquetById + b.id);
            console.log("Букет удален");
            alert("Букет удален");
            getAllBouquets();
        }
        catch (error) {
            console.log(error);
            alert(error.response.data);
        }
    }

    return (
        <>
            <h1> </h1> <br />
            <h1> </h1> <br />
            <h1>Каталог букетов</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Изображение</th>
                            <th>Название</th>
                            <th>Описание</th>
                            <th>Наличие</th>
                            <th>Стоимость</th>
                            <th>Редактирование</th>
                            <th>Удаление</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bouquets.map((b, index) => (
                            <tr key={b.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Carousel>
                                        {(b.images !== null) ? b.images.map((i, x) =>
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
                                <td>{b.bouquetName}</td>
                                <td>{b.bouquetDescription}</td>
                                <td>{b.bouquetAvailability}</td>
                                <td>{b.bouquetPrice}</td>
                                <td>
                                    <Button onClick={() => {
                                        setCurrentBouquet(b)
                                        setModalActive(true)
                                    }}>Редактировать
                                    </Button>
                                </td>
                                <td>
                                    <Button onClick={() => {
                                        deleteBouquet(b)
                                    }}>Удалить</Button>
                                </td>
                            </tr> 
                        ))
                        }
                    </tbody>
                </table>
            </div>
            <BouquetUpdateModal active={modalActive} setActive={setModalActive} currentBouquetData={currentBouquet} />
        </>
    );
}
export default BouquetsCatalogList;