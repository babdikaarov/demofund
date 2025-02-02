// in src/posts.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
   SimpleForm,
   DateInput,
   NumberInput,
   Create,
   ImageField,
   useNotify,
   minValue,
   required,
   Button,
   SaveButton,
   BooleanInput,
   ImageInput,
   FileField,
   useTranslate,
} from "react-admin";
import { Stack } from "@mui/material";
import PDFField from "../../ui/Fields/PdfField";
export const FundsInCreate = () => {
   const notify = useNotify();
   const t = useTranslate();
   const navigate = useNavigate();
   const [isPdf, setPdf] = useState(false);

   const onDrop = (file: File[]) => {
      if (file.length && file[0].type === "application/pdf") {
         setPdf(true);
      } else {
         setPdf(false);
      }
   };

   const rules = {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
   };

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const DropZoneOptions: any = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onDropRejected: (file: { file: File; errors: any[] }[]) => {
         const options = {
            userFile: (file[0].file.size / 1000000).toFixed(2),
            requiredSize: (2000000 / 1000000).toFixed(2),
         };

         return (
            file[0].errors.length > 0 && notify("t.notification.file.size", { type: "error", messageArgs: options })
         );
      },
      onDrop: onDrop,
      multiple: false,
      maxSize: 2000000,
   };
   return (
      <Create redirect="show">
         <SimpleForm
            toolbar={
               <Stack direction={"row"} justifyContent={"space-between"}>
                  <Button type="button" label={t("t.button.back")} size="large" onClick={() => navigate(-1)} />
                  <SaveButton />
               </Stack>
            }
         >
            <NumberInput
               source="amount"
               label={t("t.input.reciept")}
               validate={required()}
               defaultValue={500}
               min={500}
               step={500}
            />
            <DateInput
               source="depositedAt"
               label={t("t.input.depositedAt")}
               validate={minValue("2025-01-01")}
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               onClick={(e: any) => e.target.showPicker()}
            />
            <ImageInput
               validate={required()}
               source="reciept"
               label={t("t.input.reciept")}
               options={DropZoneOptions}
               accept={rules}
            >
               {!isPdf ? (
                  <ImageField source="src" title="title" />
               ) : window.navigator.pdfViewerEnabled ? (
                  <PDFField source="src" />
               ) : (
                  <FileField source="src" />
               )}
            </ImageInput>
            <BooleanInput source={"isVerified"} label={t("t.input.isVerified")} readOnly defaultValue={false} />
         </SimpleForm>
      </Create>
   );
};
