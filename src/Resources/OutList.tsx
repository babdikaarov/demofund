// in src/posts.jsx
import { List, Datagrid, TextField, DateField, ReferenceField } from "react-admin";

export const FundsOutList = () => (
   <List>
      <Datagrid>
         <TextField source="amount" />
         {/* <DateField source="createdAt" /> */}
         <DateField source="depositedAt" />

         <ReferenceField source={`userRef`} reference="users" label="From">
            <TextField source="firstName" />
         </ReferenceField>
      </Datagrid>
   </List>
);
