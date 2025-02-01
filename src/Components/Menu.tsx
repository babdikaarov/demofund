// in src/MyMenu.js
import { Menu, useGetIdentity, useTranslate } from "react-admin";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
export const MyMenu = () => {
   const t = useTranslate();
   const { data: userData, isPending } = useGetIdentity();
   if (isPending) return null;

   return (
      <Menu>
         <Menu.DashboardItem />
         {userData!.role === "guest" ? null : (
            <Menu.Item to="/stats" type="show" primaryText={t("t.menu.stats")} leftIcon={<AssessmentOutlinedIcon />} />
         )}
         <Menu.ResourceItems />
      </Menu>
   );
};
