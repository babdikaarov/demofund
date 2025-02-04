import { useNavigate } from "react-router-dom";
import {
   List,
   Datagrid,
   TextField,
   DateField,
   ReferenceField,
   Show,
   useGetIdentity,
   SimpleShowLayout,
   Button,
   FunctionField,
   TopToolbar,
   SortButton,
   CreateButton,
   ExportButton,
   FilterButton,
   TextInput,
   SimpleList,
   useTranslate,
   BooleanField,
   DeleteButton,
   useLocaleState,
} from "react-admin";
import { Stack, useMediaQuery } from "@mui/material";
import { PdfImageField } from "../../ui/Fields/PdfImageField";
import MyFileField from "../../ui/Fields/MyFileField";

export const FundsInList = () => {
   const { data: identity } = useGetIdentity();
   const t = useTranslate();
   const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"), { noSsr: true });
   const ListActions = () => (
      <TopToolbar>
         <FilterButton
            disableSaveQuery
            filters={[
               <TextInput label={t("t.filter.my")} source="createdBy" defaultValue={identity?.id} />,
               <TextInput
                  label={t("t.filter.month")}
                  source="forMonth"
                  defaultValue={new Date().toISOString().slice(0, 7)}
               />,
            ]}
         />
         {/* fixme i18n */}
         <SortButton fields={["forMonth"]} resource="fundsIn" label={t("t.filter.sort")} />
         <CreateButton />
         <ExportButton />
      </TopToolbar>
   );

   return (
      <List actions={<ListActions />}>
         {isSmall ? (
            <SimpleList
               primaryText={<TextField source="amount" label={t("t.input.amount")} />}
               secondaryText={
                  <ReferenceField source={`createdBy`} label={t("t.input.createdBy")} reference="users">
                     <TextField source="firstName" />
                  </ReferenceField>
               }
               rightIcon={() => <MyFileField recordKey="forMonth" label={t("t.input.reciept")} source="reciept.src" />}
               rowClick={() => "show"}
               // rowSx={(record) => ({ backgroundColor: record.nb_views >= 500 ? "#efe" : "white" })}
            />
         ) : (
            <Datagrid bulkActionButtons={false} rowClick="show">
               <MyFileField recordKey="forMonth" source="reciept.src" label={t("t.input.reciept")} />
               {/* <DateFiel label="Reciept"d source="depositedAt" /> */}
               <ReferenceField source={`createdBy`} reference="users" label={t("t.input.createdBy")}>
                  <TextField source="firstName" />
               </ReferenceField>
               <TextField source="amount" label={t("t.input.amount")} />
               <BooleanField source={"isVerified"} label={t("t.input.status")} />
               {/* <EditButton /> */}
            </Datagrid>
         )}
      </List>
   );
};
export const FundsInShow = () => {
   const navigate = useNavigate();
   const t = useTranslate();
   const [locale] = useLocaleState();
   console.log(locale);

   return (
      <Show>
         <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="amount" label={t("t.input.amount")} />
            <DateField
               source="depositedAt"
               options={{
                  year: "numeric",
                  month: "long",
                  day: "numeric",
               }}
               locales={locale}
               label={t("t.input.depositedAt")}
            />
            <DateField
               source="forMonth"
               options={{
                  year: "numeric",
                  month: "long",
               }}
               locales={locale}
               label={t("t.input.forMonth")}
            />
            <ReferenceField source={`createdBy`} label={t("t.input.createdBy")} reference="users">
               <TextField source="firstName" />
            </ReferenceField>
            <BooleanField source={"isVerified"} label={t("t.input.isVerified")} />
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
                     <DeleteButton />
                  </Stack>
               )}
            ></FunctionField>
         </SimpleShowLayout>
      </Show>
   );
};
