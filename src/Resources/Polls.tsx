// in src/posts.jsx
import {
   List,
   Datagrid,
   TextField,
   DateField,
   BooleanField,
   ReferenceField,
   NumberInput,
   Create,
   required,
   Show,
   SimpleShowLayout,
   Button,
   FunctionField,
   Edit,
   DeleteButton,
   TextInput,
   SaveButton,
   SimpleForm,
   BooleanInput,
   ValidateForm,
   NumberField,
   RadioButtonGroupInput,
   useTranslate,
} from "react-admin";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PollsList = () => {
   const t = useTranslate();
   return (
      <List>
         <Datagrid bulkActionButtons={false}>
            {/* <ShowButton /> */}
            <TextField source="title" label={t("t.input.title")} />
            <TextField source="status" label={t("t.input.status")} />
            <DateField source="createdAt" label={t("t.input.createdAt")} />
            <ReferenceField source={`createdBy`} reference="users" label={t("t.input.author")}>
               <TextField source="firstName" /> <TextField source="lastName" />
            </ReferenceField>
         </Datagrid>
      </List>
   );
};

export const PollsShow = () => {
   const navigate = useNavigate();
   const t = useTranslate();
   return (
      <Show>
         <SimpleShowLayout>
            <TextField source="title" label={t("t.input.title")} />
            <TextField source="status" label={t("t.input.status")} />
            <DateField source="createdAt" label={t("t.input.createdAt")} />
            <TextField source="budget" label={t("t.input.budget")} />
            <TextField source="description" label={t("t.input.description")} />
            <ReferenceField source={`createdBy`} reference="users" label={t("t.input.author")}>
               <TextField source="firstName" /> <TextField source="lastName" />
            </ReferenceField>
            <BooleanField source="isRecurring" label={t("t.input.isRecurring")} />
            <NumberField source="totalPayments" label={t("t.input.totalPayments")} />
            <FunctionField
               render={() => (
                  <Stack direction={"row"} justifyContent={"space-between"}>
                     <Button type="button" label={t("t.button.back")} size="large" onClick={() => navigate("/polls")} />
                     <DeleteButton />
                  </Stack>
               )}
            />
         </SimpleShowLayout>
      </Show>
   );
};

export const PollsCreate = () => {
   const navigate = useNavigate();
   const t = useTranslate();
   const validateUserCreation: ValidateForm = (values) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors: any = {};
      if (!values.title) {
         errors.title = "The title is required";
      }
      if (!values.description) {
         errors.description = "Desc required";
      }
      if (!values.budget) {
         errors.budget = "budget required";
      }
      if (values.isRecurring && values.totalPayments == 1) {
         errors.totalPayments = "Total payments can be a one time for recurring donation";
      }

      return errors;
   };

   return (
      <Create>
         <SimpleForm
            validate={validateUserCreation}
            toolbar={
               <Stack direction={"row"} justifyContent={"space-between"}>
                  <Button type="button" label={t("t.input.back")} size="large" onClick={() => navigate(-1)} />
                  <SaveButton />
               </Stack>
            }
         >
            <TextInput source="title" label={t("t.input.title")} validate={required()} />
            <RadioButtonGroupInput
               defaultValue={"discussion"}
               source="status"
               label={t("t.input.status")}
               validate={required()}
               choices={[
                  { id: "discussion", name: t("t.status.discussion") },
                  { id: "voting", name: t("t.status.voting") },
                  { id: "closed", name: t("t.status.closed") },
               ]}
            />
            <TextInput source="description" label={t("t.input.description")} multiline validate={required()} />
            <NumberInput
               inputMode="numeric"
               label={t("t.input.budget")}
               source="budget"
               step={500}
               validate={required()}
            />
            <BooleanInput source="isRecurring" label={t("t.input.isRecurring")} validate={required()} />
            <NumberInput
               inputMode="numeric"
               label={t("t.input.totalPayments")}
               source="totalPayments"
               validate={required()}
               defaultValue={1}
            />
         </SimpleForm>
      </Create>
   );
};
export const PollsEdit = () => {
   const navigate = useNavigate();
   const t = useTranslate();
   const validateUserCreation: ValidateForm = (values) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors: any = {};
      if (!values.title) {
         errors.title = "The title is required";
      }
      if (!values.description) {
         errors.description = "Desc required";
      }
      if (!values.budget) {
         errors.budget = "budget required";
      }
      if (values.isRecurring && values.totalPayments == 1) {
         errors.totalPayments = "Total payments can be a one time for recurring donation";
      }

      return errors;
   };

   return (
      <Edit>
         <SimpleForm
            validate={validateUserCreation}
            toolbar={
               <Stack direction={"row"} justifyContent={"space-between"}>
                  <Button type="button" label={t("t.button.back")} size="large" onClick={() => navigate(-1)} />
                  <SaveButton />
               </Stack>
            }
         >
            <TextInput source="title" label={t("t.input.title")} validate={required()} />
            <RadioButtonGroupInput
               defaultValue={"discussion"}
               source="status"
               label={t("t.input.status")}
               validate={required()}
               choices={[
                  { id: "discussion", name: t("t.status.discussion") },
                  { id: "voting", name: t("t.status.voting") },
                  { id: "closed", name: t("t.status.closed") },
               ]}
            />
            <TextInput source="description" label={t("t.input.description")} multiline validate={required()} />
            <NumberInput
               inputMode="numeric"
               source="budget"
               label={t("t.input.budget")}
               step={500}
               validate={required()}
            />
            <BooleanInput source="isRecurring" label={t("t.input.isRecurring")} validate={required()} />
            <NumberInput
               inputMode="numeric"
               source="totalPayments"
               label={t("t.input.totalPayments")}
               validate={required()}
               defaultValue={1}
            />
         </SimpleForm>
      </Edit>
   );
};
