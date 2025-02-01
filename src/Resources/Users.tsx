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
} from "react-admin";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
export const UsersList = () => {
   const t = useTranslate();
   const { data: userData, isPending } = useGetIdentity();
   if (isPending) return null;
   return (
      <List
         // title={t("t.menu.fundsIn")}
         actions={
            <TopToolbar>
               <Stack
                  width={"100%"}
                  spacing={2}
                  direction={"row"}
                  alignItems={"flex-end"}
                  justifyContent={"space-between"}
               >
                  <FilterLiveSearch source="firstName" label={t("t.filter.search")} />
                  <ExportButton disabled={userData!.role === "guest"} />
               </Stack>
            </TopToolbar>
         }
         // filters={<FilterLiveSearch  label={t("t.filter.search")} />}
      >
         <Datagrid bulkActionButtons={false} rowClick="show">
            <TextField source="firstName" label={t("t.input.fName")} />
            {/* <TextField source="lastName" label={t("t.input.lName")} /> */}
            {/* <TextField source="email" label={t("t.input.email")} /> */}
            {/* <NumberField source="phone" label={t("t.input.phone")} /> */}
            <SelectField
               source="role"
               label={t("t.input.role")}
               choices={[
                  { id: "admin", name: t("t.role.admin") },
                  { id: "donor", name: t("t.role.donor") },
                  { id: "guest", name: t("t.role.guest") },
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
            <ImageField source="photoURL.src" title="photoURL.title" label={t("t.input.photoURL")} />
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
   return (
      <Edit>
         <SimpleForm>
            <TextInput readOnly={userData!.role == "admin"} source="firstName" label={t("t.input.fName")} />
            <TextInput readOnly={userData!.role == "admin"} source="lastName" label={t("t.input.lName")} />
            <TextInput readOnly={userData!.role == "admin"} source="email" label={t("t.input.email")} />
            <NumberInput
               source="phone"
               inputMode="tel"
               readOnly={userData!.role == "admin"}
               label={t("t.input.phone")}
            />
            {/* <Labeled label="Current avatar">
               <ImageField source="photoURL.src" title="photoURL.title" />
            </Labeled> */}
            <ImageInput
               readOnly={userData!.role == "admin"}
               source="photoURL"
               label={t("t.input.photoURL")}
               options={DropZoneOptions}
               accept={rules}
            >
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
                     ]}
                  />
               </>
            )}
         </SimpleForm>
      </Edit>
   );
};
