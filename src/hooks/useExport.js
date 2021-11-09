import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useTheme } from "styled-components";

const saveAs = (uri, filename) => {
  const link = document.createElement("a");

  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
};

const useExport = () => {
  const { colors } = useTheme();
  const exporterRef = useRef();
  const [isExporting, setExporting] = useState(false);

  const exportImage = async ({ componentRef, fileName, html2canvasOption }) => {
    if (componentRef?.current) {
      setExporting(true);

      if (!exporterRef?.current) {
        exporterRef.current = (await import("html2canvas")).default;
      }

      const element = ReactDOM.findDOMNode(componentRef.current);
      const canvas = await exporterRef.current(element, {
        logging: false,
        scrollY: -window.scrollY,
        useCORS: true,
        backgroundColor: colors.background,
        ...html2canvasOption,
      });

      await saveAs(
        canvas.toDataURL("image/jpeg", 1.0),
        fileName ? fileName : "component"
      );

      setExporting(false);
    } else {
      throw new Error("'componentRef' must be a RefObject");
    }
  };

  return { isExporting, exportImage };
};

export default useExport;
