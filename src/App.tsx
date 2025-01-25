// in src/admin/index.tsx
import { Admin, Resource } from "react-admin";
// import jsonServerProvider from "ra-data-json-server";
import { authProvider, dataProvider } from "./providers/providers";
import LoginPage from "./LoginPage";
import { UserList } from "./Resources/Users";
import { PollsList, PollsShow } from "./Resources/Polls";
import { VotesList } from "./Resources/Votes";
import { FundsInList } from "./Resources/InList";
import { FundsOutList } from "./Resources/OutList";
// import { Route } from "react-router-dom";
// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
   <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={LoginPage}>
      {/* <CustomRoutes>
         <Route path="/signup" Component={SignUp} />
      </CustomRoutes> */}
      <Resource name="users" list={UserList} />
      <Resource name="polls" list={PollsList} show={PollsShow} />
      <Resource name="votes" list={VotesList} />
      <Resource name="fundsIn" list={FundsInList} />
      <Resource name="fundsOut" list={FundsOutList} />
   </Admin>
);

export default App;
