import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url: string) => {

    interface Todo {
        _id: number;
        name: string;
        done: boolean;
    }

    const [data, setData] = useState<Todo[]>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setData(res.data);
            } catch (err: any) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const refetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err: any) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, refetch };
};