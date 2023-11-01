import React from 'react';
import { useParams } from "react-router-dom";
import useGetAll from "../../hooks/useGetAll";
import { urlFlowersById } from "../../urls/urlList";

const Flower = () => {
    //встроенная функция-хук useParams
    const params = useParams()

    const [flower, loading] = useGetAll(urlFlowersById + params.id)



}