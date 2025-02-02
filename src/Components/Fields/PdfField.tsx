import { FieldProps, ImageFieldClasses, useFieldValue } from "react-admin";
import { Box } from "@mui/material";
const PDFField: React.FC<FieldProps> = ({ source, record, ...rest }) => {
   const url = useFieldValue({ source, record });

   return (
      <Box>
         <object
            data={url}
            className={ImageFieldClasses.list}
            type="application/pdf"
            width="100%"
            height="100%"
            style={{ height: "50vh" }}
            {...rest}
         >
            <p>
               Your browser does not support inline PDF viewing.{" "}
               <a href={url} target="_blank" rel="noopener noreferrer">
                  Download the PDF
               </a>
            </p>
         </object>
      </Box>
   );
};

export default PDFField;
