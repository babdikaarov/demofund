// in src/posts.jsx
import {
   List,
   Datagrid,
   TextField,
   Show,
   SimpleShowLayout,
   SimpleForm,
   TextInput,
   required,
   Edit,
   DeleteButton,
   FunctionField,
   Button,
   FilterLiveSearch,
   ExportButton,
   TopToolbar,
   RadioButtonGroupInput,
   useTranslate,
   NumberInput,
   NumberField,
   ImageInput,
   ImageField,
   useNotify,
   useGetIdentity,
   SelectField,
   Labeled,
} from "react-admin";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Stack } from "@mui/material";
export const UsersList = () => {
   const t = useTranslate();
   const { data: userData, isPending } = useGetIdentity();
   if (isPending) return null;
   return (
      <List
         actions={
            <TopToolbar>
               <Stack
                  width={"100%"}
                  spacing={2}
                  direction={"row"}
                  alignItems={"flex-end"}
                  justifyContent={"space-between"}
               >
                  <FilterLiveSearch source="firstName" label={t("t.filter.searchByName")} />
                  <ExportButton disabled={userData!.role === "guest"} />
               </Stack>
            </TopToolbar>
         }
      >
         <Datagrid bulkActionButtons={false} rowClick="show">
            <FunctionField
               render={(record) => {
                  return (
                     <Box>
                        <Avatar
                           src={record.photoURL.src}
                           title={record.photoURL.src}
                           alt={record.photoURL.src}
                           sx={{ width: 24, height: 24 }}
                        />
                     </Box>
                  );
               }}
            />
            <TextField source="firstName" label={t("t.input.fName")} />
            <SelectField
               source="role"
               label={t("t.input.role")}
               choices={[
                  { id: "admin", name: t("t.role.admin") },
                  { id: "donor", name: t("t.role.donor") },
                  { id: "guest", name: t("t.role.guest") },
                  { id: "dev", name: t("t.role.dev") },
               ]}
            />
         </Datagrid>
      </List>
   );
};
export const UsersShow = () => {
   const t = useTranslate();
   const navigate = useNavigate();
   return (
      <Show>
         <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="firstName" label={t("t.input.fName")} />
            <TextField source="lastName" label={t("t.input.lName")} />
            <TextField source="email" label={t("t.input.email")} />
            <NumberField source="phone" label={t("t.input.phone")} />
            <TextField source="role" label={t("t.input.role")} />
            <FunctionField
               render={(record) => {
                  return (
                     <Labeled label={t("t.input.photoURL")}>
                        <Avatar
                           src={record.photoURL.src}
                           title={record.photoURL.src}
                           alt={record.photoURL.src}
                           sx={{ width: 56, height: 56 }}
                        />
                     </Labeled>
                  );
               }}
            />
            <FunctionField
               render={() => (
                  <Stack direction={"row"} justifyContent={"space-between"}>
                     <Button type="button" label={t("t.button.back")} size="large" onClick={() => navigate("/users")} />
                     <DeleteButton />
                  </Stack>
               )}
            />
         </SimpleShowLayout>
      </Show>
   );
};
export const UsersEdit = () => {
   const t = useTranslate();
   const notify = useNotify();
   const { data: userData, isPending } = useGetIdentity();
   if (isPending) return null;
   const rules = {
      "image/*": [".png", ".jpg", ".jpeg"],
   };

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const DropZoneOptions: any = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onDropRejected: (file: { file: File; errors: any[] }[]) => {
         const options = {
            userFile: (file[0].file.size / 1000000).toFixed(2),
            requiredSize: (500000 / 1000000).toFixed(2),
         };

         return (
            file[0].errors.length > 0 && notify("t.notification.file.size", { type: "error", messageArgs: options })
         );
      },
      multiple: false,
      maxSize: 500000,
   };

   // if admin => false or
   return (
      <Edit>
         <SimpleForm>
            <TextInput source="firstName" label={t("t.input.fName")} />
            <TextInput source="lastName" label={t("t.input.lName")} />
            <TextInput source="email" label={t("t.input.email")} />
            <NumberInput source="phone" inputMode="tel" label={t("t.input.phone")} />
            <ImageInput source="photoURL" label={t("t.input.photoURL")} options={DropZoneOptions} accept={rules}>
               <ImageField source="src" title="title" />
            </ImageInput>
            {userData!.role !== "admin" ? null : (
               <>
                  <RadioButtonGroupInput
                     source="role"
                     label={t("t.input.role")}
                     validate={required()}
                     choices={[
                        { id: "admin", name: t("t.role.admin") },
                        { id: "donor", name: t("t.role.donor") },
                        { id: "guest", name: t("t.role.guest") },
                        { id: "dev", name: t("t.role.dev") },
                     ]}
                  />
               </>
            )}
            {userData!.role !== "admin" ? null : <DeleteButton />}
         </SimpleForm>
      </Edit>
   );
};
