import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';

// modified from https://github.com/salman-monetate/react-component-export-image/blob/master/index.js

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

export const exportAsJPG = (node, fileName, backgroundColor) => {
    if (!node.current) {
        throw new Error("'node' must be a RefObject")
    }

    const element = ReactDOM.findDOMNode(node.current)
    return html2canvas(element, {
        logging: false,
        scrollY: -window.scrollY,
        useCORS: true,
        backgroundColor: backgroundColor,
    }).then(canvas => {
        saveAs(canvas.toDataURL('image/jpeg', 1.0), fileName ? fileName : 'component')
    })
}
