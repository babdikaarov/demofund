// in src/MyLayout.js
import {
   Layout,
   LayoutProps,
   LocalesMenuButton,
   Logout,
   useGetIdentity,
   useLogout,
   UserMenu,
   useTranslate,
   useUserMenu,
} from "react-admin";
import { MyMenu } from "./Menu";
import { AppBar, LoadingIndicator, TitlePortal, ToggleThemeButton } from "react-admin";
import React from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { Fab } from "@mui/material";
import PinchIcon from "@mui/icons-material/Pinch";

export const MyLayout = ({ children }: LayoutProps) => {
   const { data: userData, isPending } = useGetIdentity();
   const logout = useLogout();
   if (isPending) return null;

   if (userData == undefined) {
      logout();
      return null;
   }
   return (
      <Layout appBar={MyAppBar} menu={MyMenu}>
         {children}
         {userData!.role === "guest" ? null : (
            <Link
               to={"/navigation"}
               style={{
                  margin: 0,
                  top: "auto",
                  padding: 0,
                  left: 20,
                  bottom: 60,
                  right: "auto",
                  position: "fixed",
                  zIndex: 1000,
               }}
            >
               <Fab variant="circular" type="button" size="large" color="info">
                  <PinchIcon />
               </Fab>
            </Link>
         )}
      </Layout>
   );
};

// import MyUserMenu from "./MyUserMenu"; 996704999477
const MyAppBar = () => (
   <AppBar
      userMenu={
         <UserMenu>
            <SettingsMenuItem />
            <Logout />
         </UserMenu>
      }
      toolbar={
         <>
            <LocalesMenuButton />
            <ToggleThemeButton />
            <LoadingIndicator />
         </>
      }
   >
      <TitlePortal />
   </AppBar>
);

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
const SettingsMenuItem = React.forwardRef<HTMLAnchorElement>((props, ref) => {
   const userMenuContext = useUserMenu();
   const { data: user } = useGetIdentity();
   const t = useTranslate();
   if (!userMenuContext) {
      throw new Error("<SettingsMenuItem> should be used inside a <UserMenu>");
   }
   const { onClose } = userMenuContext;

   return (
      <MenuItem
         onClick={onClose}
         ref={ref}
         component={Link}
         to={`/users/${user?.id}`}
         // It's important to pass the props to allow Material UI to manage the keyboard navigation
         {...props}
      >
         <ListItemIcon>
            <SettingsIcon fontSize="small" />
         </ListItemIcon>
         <ListItemText>{t("t.button.profile")}</ListItemText>
      </MenuItem>
   );
});
