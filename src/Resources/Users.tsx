// in src/posts.jsx
import { List, Datagrid, TextField, DateField } from "react-admin";

export const UserList = () => (
   <List>
      <Datagrid>
         <TextField source="firstName" />
         {/* <TextField source="id" /> */}
         <TextField source="lastName" />
         <DateField source="status" />
         <TextField source="role" />
      </Datagrid>
   </List>
);
