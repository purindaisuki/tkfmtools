import { useCallback, useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue) => {
    const [localValue, setLocalValue] = useState(initialValue)

    useEffect(() => {
        try {
            const item = localStorage.getItem(key)

            if (item === null) {
                return setLocalValue(null)
            }

            try {
                setLocalValue(JSON.parse(item))
            } catch {
                setLocalValue(item)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const setValue = useCallback((value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(localValue) : value
            setLocalValue(valueToStore)

            if (typeof window !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(valueToStore))
            }

            return 1
        } catch (error) {
            console.log(error)

            return 0
        }
    }, [localValue])

    return [localValue, setValue]
}

export default useLocalStorage