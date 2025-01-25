// in src/posts.jsx
import { List, Datagrid, TextField, ReferenceField, ArrayField, BooleanField } from "react-admin";

export const FundsOutList = () => (
   <List>
      <Datagrid>
         <TextField source="amount" />
         {/* <DateField source="createdAt" /> */}

         <ReferenceField source={`beneficiariesRef`} reference="beneficiaries">
            <TextField source="firstName" />
         </ReferenceField>
         <ReferenceField source={`pollsRef`} reference="polls">
            <TextField source="title" />
         </ReferenceField>
         <ReferenceField source={`votesRef`} reference="votes">
            <ArrayField source="list">
               <Datagrid bulkActionButtons={false}>
                  <ReferenceField source={`userRef`} reference="users">
                     <TextField source="firstName" /> <TextField source="lastName" />
                  </ReferenceField>
                  <BooleanField source="vote" />
               </Datagrid>
            </ArrayField>
         </ReferenceField>
      </Datagrid>
   </List>
);
