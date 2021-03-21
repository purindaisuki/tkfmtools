import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTheme } from 'styled-components';

const saveAs = (uri, filename) => {
    const link = document.createElement('a')

    if (typeof (link.download) === 'string') {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}

const useExport = () => {
    const { colors } = useTheme()

    const exporterRef = useRef()

    const [isExporting, setExporting] = useState(false)

    // lazy is not available for ssr
    useEffect(() => {
        React.lazy(import('html2canvas')
            .then(module => exporterRef.current = module.default))
    }, [])

    const exportImage = ({ componentRef, fileName, html2canvasOption }) => {
        if (componentRef?.current && exporterRef?.current) {
            setExporting(true)

            const element = ReactDOM.findDOMNode(componentRef.current)

            exporterRef.current(element, {
                logging: false,
                scrollY: -window.scrollY,
                useCORS: true,
                backgroundColor: colors.background,
                ...html2canvasOption
            }).then(canvas => {
                saveAs(canvas.toDataURL('image/jpeg', 1.0), fileName ? fileName : 'component')
            }).then(() => setExporting(false))

        } else {
            throw new Error("'componentRef' must be a RefObject")
        }
    }

    return ({ isExporting: isExporting, exportImage: exportImage })
}

export default useExport