// in src/posts.jsx
import { List, Datagrid, TextField, DateField, BooleanField, ReferenceField } from "react-admin";

export const PollsList = () => (
   <List>
      <Datagrid>
         <TextField source="title" />
         <BooleanField source="active" />
         <DateField source="createdAt" />
         <TextField source="description" />
         <ReferenceField source={`createdByRef`} reference="users" label="Author">
            <TextField source="firstName" /> <TextField source="lastName" />
         </ReferenceField>
      </Datagrid>
   </List>
);
