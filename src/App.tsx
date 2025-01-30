import { Admin, Resource, CustomRoutes} from "react-admin";
import { authProvider, dataProvider } from "./providers/providers";
import LoginPage from "./LoginPage";
import { UserList } from "./Resources/Users";
import { PollsList, PollsShow } from "./Resources/Polls";
import { VotesList } from "./Resources/Votes";
import { FundsInCreate, FundsInList } from "./Resources/InList";
import { FundsOutList } from "./Resources/OutList";
import Dashboard from "./components/Dashboard";

const App = () => (
   <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={LoginPage} dashboard={Dashboard} >
{/*       <CustomRoutes>
         <Route path="/signup" Component={SignUp} />
      </CustomRoutes> */} 
      <Resource name="users" list={UserList} />
      <Resource name="polls" list={PollsList} show={PollsShow} />
      <Resource name="votes" list={VotesList} />
      <Resource name="fundsIn" list={FundsInList} create={FundsInCreate} />
      <Resource name="fundsOut" list={FundsOutList} />
   </Admin>
);

export default App;
