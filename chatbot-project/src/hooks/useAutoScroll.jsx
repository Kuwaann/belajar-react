import { useRef, useEffect } from 'react'

function useAutoScroll(dependencies){
    const containerRef = useRef(null);

    useEffect(() => {
        const containerElement = containerRef.current;

        if(containerElement){
            containerElement.scrollTop = containerElement.scrollHeight
        }
    }, [dependencies])

    return containerRef;
}

export default useAutoScroll