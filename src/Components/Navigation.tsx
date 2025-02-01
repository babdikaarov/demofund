import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CalculateIcon from "@mui/icons-material/Calculate";
import { Grid2 as Grid, Button, Stack, Typography, Card, CardContent } from "@mui/material";
import { Title, useGetIdentity, useTranslate } from "react-admin";
import { Link, useNavigate } from "react-router-dom";
import { useCreatePath } from "react-admin";
import { calculateStats } from "../Utils/calcStats";

const Navigation: React.FC = () => {
   const createPath = useCreatePath();
   const t = useTranslate();
   const navigate = useNavigate();
   const { data: userData, isPending } = useGetIdentity();
   if (isPending) return null;
   const menuItems = [
      { label: t("t.menu.users"), icon: <PeopleAltOutlinedIcon fontSize="large" />, path: "users" },
      { label: t("t.menu.fundsIn"), icon: <VolunteerActivismOutlinedIcon fontSize="large" />, path: "fundsIn" },
      { label: t("t.menu.polls"), icon: <CampaignOutlinedIcon fontSize="large" />, path: "polls" },
      { label: t("t.menu.votes"), icon: <ThumbsUpDownOutlinedIcon fontSize="large" />, path: "votes" },
      { label: t("t.menu.fundsOut"), icon: <RequestQuoteOutlinedIcon fontSize="large" />, path: "fundsOut" },
      { label: t("t.menu.beneficiaries"), icon: <ReceiptOutlinedIcon fontSize="large" />, path: "beneficiaries" },
      { label: t("t.menu.stats"), icon: <AssessmentOutlinedIcon fontSize="large" />, path: "stats" },
   ];

   const hanldeCalculate = async () => {
      try {
         const success = await calculateStats();
         if (success) {
            navigate("/stats");
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <Card sx={{ height: "100%", display: "flex", alignItems: "start", justifyContent: "center" }}>
         <CardContent sx={{ width: "100%" }}>
            <Grid
               container
               spacing={2}
               sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: {
                     xs: "repeat(2, 1fr)", // 2 columns on mobile
                     sm: "repeat(3, 1fr)", // 3 columns on tablets
                     md: "repeat(4, 1fr)", // 4 columns on desktops
                  },
               }}
            >
               <Title title={t("t.menu.nav")} />
               {menuItems.map((item, index) => (
                  <Grid key={index} sx={{ width: "100%", aspectRatio: "1/1" }}>
                     <Link to={createPath({ resource: item.path, type: "list" })} style={{ textDecoration: "none" }}>
                        <Button
                           fullWidth
                           variant="contained"
                           color="primary"
                           type="button"
                           sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                           }}
                        >
                           <Stack alignItems="center" spacing={1}>
                              {item.icon}
                              <Typography fontSize="medium">{item.label}</Typography>
                           </Stack>
                        </Button>
                     </Link>
                  </Grid>
               ))}

               {userData!.role !== "admin" ? null : (
                  <Grid sx={{ width: "100%", aspectRatio: "1/1", borderRadius: 50 }}>
                     <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={hanldeCalculate}
                        sx={{
                           height: "100%",
                           display: "flex",
                           flexDirection: "column",
                           justifyContent: "center",
                           alignItems: "center",
                        }}
                     >
                        <Stack alignItems="center" spacing={1}>
                           <CalculateIcon fontSize="large" />
                           <Typography fontSize="medium">Calculate Statistics</Typography>
                        </Stack>
                     </Button>
                  </Grid>
               )}
            </Grid>
         </CardContent>
      </Card>
   );
};

export default Navigation;
