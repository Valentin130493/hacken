import {useEffect, useState, useMemo} from "react";

import {TablePaginationConfig} from "../types";
import {message} from "antd";
import {API_URL} from "../static/api.ts";

export function useGetData<T>(
    currency: string,
    order: string,
    pagination?: TablePaginationConfig,
) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const apiUrl = useMemo(() => {
        const pageSize = pagination?.pageSize || 10;
        const currentPage = pagination?.current || 1;

        return `${API_URL}markets?vs_currency=${currency}&order=${order}&per_page=${pageSize}&page=${currentPage}&sparkline=false`;
    }, [currency, order, pagination]);

    const getInitialData = async () => {
        try {
            const res = await fetch(apiUrl);

            const jsonData = await res.json();
            if (Array.isArray(jsonData)) {
                setData(jsonData);
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                message.error(err.message);
            }
        }
    };

    useEffect(() => {
        setLoading(true);
        getInitialData().finally(() => setLoading(false));
    }, [apiUrl]);

    return {
        loading,
        error,
        data,
    };
}
