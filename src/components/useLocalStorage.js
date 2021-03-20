import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
    const [localValue, setLocalValue] = useState(() => {
        try {
            const item =
                typeof window !== 'undefined' ? localStorage.getItem(key) : undefined

            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.log(error)
            return initialValue
        }
    })

    const setValue = (value) => {
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
    }

    return [localValue, setValue]
}

export default useLocalStorage