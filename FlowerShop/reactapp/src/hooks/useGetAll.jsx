import { useState, useEffect } from 'react'

const useGetAll = url => {

    const [state, setState] = useState([[], false])

    useEffect(() => {
        setState([[], true]);

        (async () => {
            const data = await fetch(url)
                .then(res => res.json())
            setState([data, false])
        })()
    }, [url])
    return state
};

export default useGetAll