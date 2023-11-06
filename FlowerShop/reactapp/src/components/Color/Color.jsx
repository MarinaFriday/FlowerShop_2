import React, { useState, useEffect} from 'react'
import axios from "axios";
import { urlColors } from "../../urls/urlList"

const Color = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await axios.get(urlColors);
            setData(result.data);
            setLoading(false);
        };
        fetchData();
    }, []);
    return (
        <div>
            {loading ? <div>loading...</div> : <div>{data.length}</div>}
        </div>
    );
}
export default Color;
