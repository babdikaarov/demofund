import {
   Create,
   Datagrid,
   Edit,
   List,
   SimpleForm,
   TextField,
   NumberField,
   TextInput,
   useTranslate,
   ChipField,
   Show,
   SimpleShowLayout,
   FunctionField,
   Button,
   DeleteButton,
   useGetIdentity,
   TopToolbar,
   FilterLiveSearch,
   ExportButton,
   NumberInput,
   useGetList,
   CreateButton,
   ReferenceManyField,
   SingleFieldList,
   Count,
} from "react-admin";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
export const BeneficiariesList: React.FC = () => {
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
                  <CreateButton disabled={userData!.role === "guest"} />
                  <ExportButton disabled={userData!.role === "guest"} />
               </Stack>
            </TopToolbar>
         }
      >
         <Datagrid bulkActionButtons={false}>
            <TextField source="firstName" label={t("t.input.fName")} />
            <TextField source="lastName" label={t("t.input.lName")} />
            <NumberField source="totalBenefit" label={t("t.input.totalBenefit")} />
            <NumberField source="totalGrants" label={t("t.input.totalGrants")} />
         </Datagrid>
      </List>
   );
};
export const BeneficiariesShow: React.FC = () => {
   const t = useTranslate();
   const navigate = useNavigate();
   const { data, isPending } = useGetList("fundsOut");
   if (isPending) return null;
   const totalBenefit = data?.reduce((sum, item) => sum + item.amount, 0);
   return (
      <Show>
         <SimpleShowLayout>
            <TextField source="firstName" label={t("t.input.fName")} />
            <TextField source="lastName" label={t("t.input.lName")} />
            <NumberField source="totalBenefit" record={{ totalBenefit }} label={t("t.input.totalBenefit")} />
            <ReferenceManyField target="beneficiariesId" reference="fundsOut" label={t("t.input.totalGrants")}>
               <Count />
            </ReferenceManyField>
            <ReferenceManyField target="beneficiariesId" reference="fundsOut" label={t("t.input.refToDonation")}>
               <SingleFieldList linkType={"show"}>
                  <ChipField source="givenAt" />
               </SingleFieldList>
            </ReferenceManyField>

            <FunctionField
               render={() => (
                  <Stack direction={"row"} justifyContent={"space-between"}>
                     <Button
                        type="button"
                        label={t("t.button.back")}
                        size="large"
                        onClick={() => navigate("/beneficiaries")}
                     />
                     <DeleteButton />
                  </Stack>
               )}
            />
         </SimpleShowLayout>
      </Show>
   );
};
export const BeneficiariesEdit: React.FC = () => {
   const t = useTranslate();
   return (
      <Edit>
         <SimpleForm>
            <TextInput source="firstName" label={t("t.input.fName")} />
            <TextInput source="lastName" label={t("t.input.tName")} />
            <TextInput inputMode="tel" source="phone" label={t("t.input.phone")} />
            <NumberInput inputMode="numeric" source="totalBenefit" label={t("t.input.totalBenefit")} />
            <NumberInput inputMode="numeric" source="totalGrants" label={t("t.input.totalGrants")} />
         </SimpleForm>
      </Edit>
   );
};

export const BeneficiariesCreate: React.FC = () => {
   const t = useTranslate();
   return (
      <Create redirect="list">
         <SimpleForm>
            <TextInput source="firstName" label={t("t.input.fName")} />
            <TextInput source="lastName" label={t("t.input.lName")} />
            <TextInput inputMode="tel" source="phone" label={t("t.input.phone")} />
            {/* <NumberInput inputMode="numeric" source="totalBenefit" label={t("t.input.totalBenefit")} />
            <NumberInput inputMode="numeric" source="totalGrants" label={t("t.input.totalGrants")} /> */}
         </SimpleForm>
      </Create>
   );
};
