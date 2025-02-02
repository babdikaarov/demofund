// in src/posts.jsx
import {
   List,
   Datagrid,
   TextField,
   ReferenceField,
   Create,
   SimpleForm,
   NumberInput,
   ReferenceInput,
   SelectInput,
   DateField,
   Edit,
   DateInput,
   ImageInput,
   minValue,
   required,
   ImageField,
   FileField,
   useNotify,
   Show,
   useTranslate,
   SimpleShowLayout,
   FunctionField,
   Button,
} from "react-admin";
import { useNavigate } from "react-router-dom";
import PDFField from "../ui/Fields/PdfField";
import { useState } from "react";
import { PdfImageField } from "../ui/Fields/PdfImageField";
import MyFileField from "../ui/Fields/MyFileField";
import { Stack } from "@mui/material";
export const FundsOutList = () => {
   const t = useTranslate();
   return (
      <List>
         <Datagrid bulkActionButtons={false}>
            <TextField source="amount" label={t("t.input.amount")} />
            <DateField source="createdAt" label={t("t.input.createdAt")} />
            <MyFileField recordKey="givenAt" source="reciept.src" label={t("t.input.reciept")} />
            <ReferenceField source={`beneficiariesId`} reference="beneficiaries" label={t("t.input.beneficiar")}>
               <TextField source="firstName" />
            </ReferenceField>
            <ReferenceField source={`pollsId`} reference="polls" label={t("t.input.pollReftitle")}>
               <TextField source="title" />
            </ReferenceField>
            <ReferenceField source={`votesId`} reference="votes" label={t("t.input.votes")}>
               <TextField source="title" />
            </ReferenceField>
            {/* <FileField source="reciept.src" title="reciept.title" label={t("t.input.reciept")} /> */}
         </Datagrid>
      </List>
   );
};
export const FundsOutShow = () => {
   const t = useTranslate();
   const navigate = useNavigate();
   return (
      <Show>
         <SimpleShowLayout>
            <TextField source="amount" label={t("t.input.amount")} />
            <DateField source="givenAt" label={t("t.input.givenAt")} />
            <ReferenceField source={`beneficiariesId`} reference="beneficiaries" label={t("t.input.beneficiar")}>
               <TextField source="firstName" />
            </ReferenceField>
            <ReferenceField source={`pollsId`} reference="polls" label={t("t.input.pollReftitle")}>
               <TextField source="title" />
            </ReferenceField>
            <ReferenceField source={`votesId`} reference="votes" label={t("t.input.votes")}>
               <TextField source="title" />
            </ReferenceField>

            <PdfImageField source="reciept.src" title="reciept.title" label={t("t.input.reciept")} />
            <FunctionField
               render={() => (
                  <Stack direction={"row"} justifyContent={"space-between"}>
                     <Button
                        type="button"
                        label={t("t.button.back")}
                        size="large"
                        onClick={() => navigate("/fundsIn")}
                     />
                  </Stack>
               )}
            />
         </SimpleShowLayout>
      </Show>
   );
};
export const FundsOutCreate = () => {
   const notify = useNotify();
   const t = useTranslate();
   const [isPdf, setPdf] = useState(false);
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
         return (
            file[0].errors.length > 0 &&
            notify(
               `File size should not exceed ${2000000 / 1000000}MB, your file size - ${(
                  file[0].file.size / 1000000
               ).toFixed(2)}MB`,
               { type: "error" },
            )
         );
      },
      onDrop: onDrop,
      multiple: false,
      maxSize: 2000000,
   };
   return (
      <Create redirect="list">
         <SimpleForm>
            <NumberInput
               inputMode="numeric"
               source="amount"
               defaultValue={500}
               min={500}
               step={500}
               label={t("t.input.amount")}
            />
            <ReferenceInput source="beneficiariesId" reference="beneficiaries">
               <SelectInput
                  validate={required()}
                  source="firstName"
                  emptyText={t("t.select.noBeneficiar")}
                  label={t("t.input.beneficiar")}
               />
            </ReferenceInput>
            <ReferenceInput source="pollsId" reference="polls">
               <SelectInput
                  validate={required()}
                  emptyText={t("t.select.noPollSelected")}
                  label={t("t.input.pollReftitle")}
               />
            </ReferenceInput>
            <ReferenceInput source="votesId" reference="votes" label={t("t.input.votes")}>
               <SelectInput
                  validate={required()}
                  emptyText={t("t.select.noVoteSelected")}
                  label={t("t.input.basedOnVotes")}
               />
            </ReferenceInput>
            <DateInput
               source="givenAt"
               label={t("t.input.givenAt")}
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
         </SimpleForm>
      </Create>
   );
};
export const FundsOutEdit = () => {
   const notify = useNotify();
   const t = useTranslate();
   const [isPdf, setPdf] = useState(false);
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
         return (
            file[0].errors.length > 0 &&
            notify(
               `File size should not exceed ${2000000 / 1000000}MB, your file size - ${(
                  file[0].file.size / 1000000
               ).toFixed(2)}MB`,
               { type: "error" },
            )
         );
      },
      onDrop: onDrop,
      multiple: false,
      maxSize: 2000000,
   };
   return (
      <Edit>
         <SimpleForm>
            <NumberInput
               inputMode="numeric"
               source="amount"
               defaultValue={500}
               min={500}
               step={500}
               label={t("t.input.amount")}
            />
            <ReferenceInput source="beneficiariesId" reference="beneficiaries">
               <SelectInput
                  validate={required()}
                  source="firstName"
                  emptyText={t("t.select.noBeneficiar")}
                  label={t("t.input.beneficiar")}
               />
            </ReferenceInput>
            <ReferenceInput source="pollsId" reference="polls">
               <SelectInput
                  validate={required()}
                  emptyText={t("t.select.noPollSelected")}
                  label={t("t.input.pollReftitle")}
               />
            </ReferenceInput>
            <ReferenceInput source="votesId" reference="votes" label={t("t.input.votes")}>
               <SelectInput
                  validate={required()}
                  emptyText={t("t.select.noVoteSelected")}
                  label={t("t.input.basedOnVotes")}
               />
            </ReferenceInput>
            <DateInput
               source="givenAt"
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
         </SimpleForm>
      </Edit>
   );
};
