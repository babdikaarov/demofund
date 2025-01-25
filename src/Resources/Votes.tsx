// in src/posts.jsx
import { List, Datagrid, TextField, ReferenceField, ArrayField, ChipField, BooleanField } from "react-admin";

export const VotesList = () => (
   <List>
      <Datagrid>
         <ReferenceField source={`pollRef`} reference="polls" label="Poll refference">
            <ChipField source="title" size="medium" />
         </ReferenceField>
         <ArrayField source="list">
            <Datagrid bulkActionButtons={false}>
               <ReferenceField source={`userRef`} reference="users" label="Name">
                  <TextField source="firstName" /> <TextField source="lastName" />
               </ReferenceField>
               <BooleanField source="vote" />
            </Datagrid>
         </ArrayField>
      </Datagrid>
   </List>
);
