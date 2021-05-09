import { useState, useEffect } from 'react';
import API from '../services/api'

const useFetchData = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        API.get(url)
        .then(res => {
            setData(res.data);
            setLoading(false);
        })
        .catch(err => {
            setError(err);
            setLoading(false);
        })
    }, []);

    return {loading, data, error};
}

export default useFetchData;