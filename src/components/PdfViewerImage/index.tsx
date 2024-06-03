import { Canvas } from "@react-pdf/renderer";
import { useCallback, useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import debounce from "lodash.debounce";

import "./index.css";

interface PdfDocumentProps {
  doubleImage?: string;
  pdfFile?: any;
}

const PdfDocument: React.FC<PdfDocumentProps> = ({
  pdfFile,
  doubleImage = false,
}) => {
  const [pdfFileWidth, setPdfFileWidth] = useState(300);
  const [pdfFileScale, setPdfFileScale] = useState(2.5);
  /*
  debounce de lodash é serve para reduzir a 
  frequência das chamadas de redimensionamento, 
  e o useCallback memoriza a função para evitar redefinição desnecessária.
  */
  const handleResize = useCallback(
    debounce(() => {
      const windowWidth = window.innerWidth;

      if (windowWidth > 1250) {
        setPdfFileScale(2.5);
        setPdfFileWidth(doubleImage ? 350 / 1.5 : 350);
      } else if (windowWidth > 1200) {
        setPdfFileScale(2.5);
        
        setPdfFileWidth(doubleImage ? 350 / 2 : 350);
      } else if (windowWidth > 950) {
        setPdfFileScale(2);
        setPdfFileWidth(doubleImage ? 350 / 2 : 350);
      } else if (windowWidth > 750) {
        setPdfFileScale(1.5);
        setPdfFileWidth(350);
      } else if (windowWidth > 550) {
        setPdfFileScale(1);
        setPdfFileWidth(350);
      } else {
        setPdfFileScale(0.8);
        setPdfFileWidth(350);
      }
    }, 300),
    [doubleImage]
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize the correct size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
  return (
    <div className="">
      <Document file={pdfFile}>
        <Page
          pageNumber={1}
          width={pdfFileWidth}
          scale={pdfFileScale}
          canvasBackground="black"
        ></Page>
      </Document>
    </div>
  );
};
export default PdfDocument;
