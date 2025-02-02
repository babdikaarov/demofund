// in src/posts.jsx
import { useEffect, useState } from "react";
import {
   SimpleForm,
   DateInput,
   NumberInput,
   useGetIdentity,
   ImageField,
   useNotify,
   minValue,
   required,
   Edit,
   BooleanInput,
   useEditController,
   FileInput,
   SaveButton,
   DeleteButton,
   FileField,
   useTranslate,
   TextInput,
} from "react-admin";
import PDFField from "../../Components/Fields/PdfField";
import { Box, Stack } from "@mui/material";
export const FundsInEdit = () => {
   const notify = useNotify();
   const t = useTranslate();
   const [isPdf, setPdf] = useState(false);
   const { data: identity, isPending } = useGetIdentity();
   const { record, isPending: editControlerPending } = useEditController();
   useEffect(() => {
      if (record && record.isVerified) {
         notify(t("t.notifications.recordVerified"), {
            type: "info",
            autoHideDuration: null,
         });
      }
   }, []);
   if (isPending && editControlerPending) return null;

   const onDrop = (file: File[]) => {
      if (file[0].type === "application/pdf") {
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
         console.log(file);

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
      <Edit mutationMode="pessimistic">
         <SimpleForm
            toolbar={
               <Stack direction={"row"} justifyContent={"space-between"}>
                  <Box padding={1}>
                     <SaveButton />
                  </Box>
                  <Box padding={1}>{record.isVerified ? undefined : <DeleteButton size="large" />}</Box>
               </Stack>
            }
         >
            <TextInput source="id" readOnly />
            <NumberInput
               source="amount"
               label={t("t.input.reciept")}
               inputMode="numeric"
               validate={required()}
               defaultValue={500}
               min={500}
               step={500}
               readOnly={record.isVerified || record.createdBy !== identity?.id}
            />
            <DateInput
               source="depositedAt"
               label={t("t.input.depositedAt")}
               validate={minValue("2025-01-01")}
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               onClick={(e: any) => e.target.showPicker()}
               readOnly={record.isVerified || record.createdBy !== identity?.id}
            />
            <FileInput
               validate={required()}
               source="reciept"
               label={t("t.input.reciept")}
               options={DropZoneOptions}
               accept={rules}
               readOnly={record.isVerified || record.createdBy !== identity?.id}
            >
               {record.isVerified || record.createdBy !== identity?.id ? null : isPdf ? (
                  <ImageField source="src" title="title" />
               ) : window.navigator.pdfViewerEnabled ? (
                  <PDFField source="src" />
               ) : (
                  <FileField source="src" />
               )}
            </FileInput>
            <BooleanInput
               source={"isVerified"}
               label={t("t.input.isVerified")}
               defaultValue={false}
               readOnly={identity!.role !== "admin"}
            />
         </SimpleForm>
      </Edit>
   );
};
