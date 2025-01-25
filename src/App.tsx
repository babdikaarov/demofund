// in src/admin/index.tsx
import { Admin, Resource } from "react-admin";
// import jsonServerProvider from "ra-data-json-server";
import { authProvider, dataProvider } from "./providers/providers";
import LoginPage from "./LoginPage";
import { UserList } from "./Resources/Users";
import { PollsList } from "./Resources/Polls";
import { VotesList } from "./Resources/Votes";
import { FundsInList } from "./Resources/InList";
// import { Route } from "react-router-dom";
// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
   <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={LoginPage}>
      {/* <CustomRoutes>
         <Route path="/signup" Component={SignUp} />
      </CustomRoutes> */}
      <Resource name="users" list={UserList} />
      <Resource name="polls" list={PollsList} />
      <Resource name="votes" list={VotesList} />
      <Resource name="fundsIn" list={FundsInList} />
   </Admin>
);

export default App;
