import {useEffect, useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback();
        }
        catch (e) {
            setError(Boolean(e.message));
        }
        finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
}