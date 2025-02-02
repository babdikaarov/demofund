// in src/MyMenu.js
import { Menu } from "react-admin";
export const MyMenu = () => {
   return (
      <Menu>
         <Menu.DashboardItem />
         <Menu.ResourceItems />
      </Menu>
   );
};
