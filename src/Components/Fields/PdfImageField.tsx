import { ImageField, useFieldValue, type FieldProps, type ImageFieldProps } from "react-admin";
import { checkIsPdf } from "../../Utils/utils";
import { useEffect, useState } from "react";
import PDFField from "./PdfField";

export const PdfImageField = (props: FieldProps | ImageFieldProps) => {
   const url = useFieldValue(props);
   const [isPDF, setIsPDF] = useState(false);

   useEffect(() => {
      const checkFile = async () => {
         const res = await checkIsPdf(url);

         if (res) setIsPDF(res);
      };
      // Asynchronously check if the file is a PDF

      if (url) {
         checkFile(); // Call the async function
      }
   }, [url]); // Re-run the effect when `url` changes

   // Render PDFField if it's a PDF, else render ImageField
   return isPDF ? (
      <PDFField {...props} />
   ) : (
      <ImageField {...props} sx={{ "& img": { width: "50% !important", height: "50% !important" } }} />
   );
};
