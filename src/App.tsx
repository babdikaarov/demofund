// in src/admin/index.tsx
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { authProvider } from "./providers/providers";
import LoginPage from "./LoginPage";
// import SignUp from "./SignUp";
// import { Route } from "react-router-dom";
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
   <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={LoginPage}>
      {/* <CustomRoutes>
         <Route path="/signup" Component={SignUp} />
      </CustomRoutes> */}
      <Resource name="posts" list={ListGuesser} />
      <Resource name="comments" list={ListGuesser} />
   </Admin>
);

export default App;
