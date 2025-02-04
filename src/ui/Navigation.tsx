import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CalculateIcon from "@mui/icons-material/Calculate";
import { Grid2 as Grid, Button, Stack, Typography } from "@mui/material";
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
      {
         label: t("t.menu.users"),
         icon: (
            <PeopleAltOutlinedIcon
               fontSize="large"
               sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
               }}
            />
         ),
         path: "users",
      },
      {
         label: t("t.menu.fundsIn"),
         icon: (
            <VolunteerActivismOutlinedIcon
               fontSize="large"
               sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
               }}
            />
         ),
         path: "fundsIn",
      },
      {
         label: t("t.menu.polls"),
         icon: (
            <CampaignOutlinedIcon
               fontSize="large"
               sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
               }}
            />
         ),
         path: "polls",
      },
      {
         label: t("t.menu.votes"),
         icon: (
            <ThumbsUpDownOutlinedIcon
               fontSize="large"
               sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
               }}
            />
         ),
         path: "votes",
      },
      {
         label: t("t.menu.fundsOut"),
         icon: (
            <RequestQuoteOutlinedIcon
               fontSize="large"
               sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
               }}
            />
         ),
         path: "fundsOut",
      },
      {
         label: t("t.menu.beneficiaries"),
         icon: (
            <ReceiptOutlinedIcon
               fontSize="large"
               sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
               }}
            />
         ),
         path: "beneficiaries",
      },
      {
         label: t("t.menu.stats"),
         icon: (
            <AssessmentOutlinedIcon
               fontSize="large"
               sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
               }}
            />
         ),
         path: "stats",
      },
   ];

   const hanldeCalculate = async () => {
      try {
         const success = await calculateStats();
         if (success) {
            navigate("/");
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
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
            <Grid key={index} sx={{ width: "100%", aspectRatio: "2/1" }}>
               <Link to={createPath({ resource: item.path, type: "list" })} style={{ textDecoration: "none" }}>
                  <Button
                     fullWidth
                     variant="contained"
                     color="primary"
                     type="button"
                     sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                     }}
                  >
                     <Stack alignItems="center" spacing={1}>
                        {item.icon}
                        <Typography
                           sx={{
                              fontSize: {
                                 // md:  "small",
                                 sm: "small",
                              },
                           }}
                        >
                           {item.label}
                        </Typography>
                     </Stack>
                  </Button>
               </Link>
            </Grid>
         ))}

         {userData!.role !== "admin" ? null : (
            <Grid sx={{ width: "100%" }}>
               <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={hanldeCalculate}
                  sx={{
                     height: "100%",
                     display: "flex",
                     justifyContent: "flex-end",
                     alignItems: "flex-end",
                  }}
               >
                  <CalculateIcon
                     fontSize="large"
                     sx={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                     }}
                  />
                  <Typography
                     sx={{
                        fontSize: {
                           md: "medium",
                           sm: "small",
                        },
                     }}
                  >
                     Calculate Statistics
                  </Typography>
               </Button>
            </Grid>
         )}
      </Grid>
   );
};

export default Navigation;
