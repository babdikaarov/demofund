import {
   Create,
   Datagrid,
   Edit,
   List,
   NumberInput,
   SimpleForm,
   TextField,
   NumberField,
   ReferenceArrayField,
   TextInput,
   useTranslate,
   ChipField,
   Show,
   SimpleShowLayout,
   FunctionField,
   Button,
   DeleteButton,
} from "react-admin";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
export const BeneficiariesList: React.FC = () => {
   const t = useTranslate();
   return (
      <List>
         <Datagrid>
            <TextField source="firstName" label={t("t.input.fName")} />
            <TextField source="lastName" label={t("t.input.lName")} />
            <NumberField source="totalBenefit" label={t("t.input.totalBenefit")} />
            <NumberField source="totalGrants" label={t("t.input.totalGrants")} />
            {/* <ReferenceArrayField source="beneficiariesId" reference="fundsOut" label={t("t.input.refToDonation")}>
               <ChipField label={t("t.input.refToDonation")} source="id" />
            </ReferenceArrayField> */}
         </Datagrid>
      </List>
   );
};
export const BeneficiariesShow: React.FC = () => {
   const t = useTranslate();
   const navigate = useNavigate();
   return (
      <Show>
         <SimpleShowLayout>
            <TextField source="firstName" label={t("t.input.fName")} />
            <TextField source="lastName" label={t("t.input.lName")} />
            <NumberField source="totalBenefit" label={t("t.input.totalBenefit")} />
            <NumberField source="totalGrants" label={t("t.input.totalGrants")} />
            <ReferenceArrayField source="givenAt" reference="fundsOut" label={t("t.input.refToDonation")}>
               <ChipField label={t("t.input.refToDonation")} source="givenAt" />
            </ReferenceArrayField>
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
            <TextInput source="lastName" label={t("t.input.tName")} />
            <TextInput inputMode="tel" source="phone" label={t("t.input.phone")} />
            <NumberInput inputMode="numeric" source="totalBenefit" label={t("t.input.totalBenefit")} />
            <NumberInput inputMode="numeric" source="totalGrants" label={t("t.input.totalGrants")} />
         </SimpleForm>
      </Create>
   );
};
