import * as React from "react";
import Card from "@mui/material/Card";
import { Title, useGetIdentity, useGetList, useGetOne, useTranslate } from "react-admin";
import CardWithIcon from "./CardWithIcon";
import "./styles/Dashboard.css";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Box, Grid2 as Grid, Stack, useMediaQuery } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";

export const Dashboard = () => {
   const { data: statsData } = useGetOne("stats", { id: 1 });
   const { data: fundsData = [] } = useGetList("fundsIn");
   const isSmallScreen = useMediaQuery("(max-width:650px)");
   const t = useTranslate(); // Use translate function
   const [chartData, setChartData] = React.useState([
      { name: "Jan", pv: 0 },
      { name: "Feb", pv: 0 },
      { name: "Mar", pv: 0 },
      { name: "Apr", pv: 0 },
      { name: "May", pv: 0 },
      { name: "Jun", pv: 0 },
      { name: "Jul", pv: 0 },
      { name: "Aug", pv: 0 },
      { name: "Sep", pv: 0 },
      { name: "Oct", pv: 0 },
      { name: "Nov", pv: 0 },
      { name: "Dec", pv: 0 },
   ]);

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const getMonth = (el: any) => {
      if (!el.depositedAt) return 0; // fallback for invalid date
      const date = new Date(el.depositedAt);
      return date.getUTCMonth(); // 0 = Jan, 1 = Feb, ..., 11 = Dec
   };

   React.useEffect(() => {
      if (fundsData.length > 0) {
         const newChartData = [
            { name: t("t.month.jan", { defaultValue: "Jan" }), pv: 0, uv: 0, wv: 0 },
            { name: t("t.month.feb", { defaultValue: "Feb" }), pv: 0, uv: 0, wv: 0 },
            { name: t("t.month.mar", { defaultValue: "Mar" }), pv: 0, uv: 0, wv: 0 },
            { name: t("t.month.apr", { defaultValue: "Apr" }), pv: 0, uv: 0, wv: 0 },
            { name: t("t.month.may", { defaultValue: "May" }), pv: 0, uv: 0, wv: 0 },
            { name: t("t.month.jun", { defaultValue: "Jun" }), pv: 0, uv: 0, wv: 0 },
            { name: t("t.month.jul", { defaultValue: "Jul" }), pv: 0, uv: 0, wv: 0 },
            { name: t("t.month.aug", { defaultValue: "Aug" }), pv: 0, uv: 0, wv: 0 },
            { name: t("t.month.sep", { defaultValue: "Sep" }), pv: 0, uv: 0, wv: 0 },
            { name: t("t.month.oct", { defaultValue: "Oct" }), pv: 0, uv: 0, wv: 0 },
            { name: t("t.month.nov", { defaultValue: "Nov" }), pv: 0, uv: 0, wv: 0 },
            { name: t("t.month.dec", { defaultValue: "Dec" }), pv: 0, uv: 0, wv: 0 },
         ];

         const uvAddedForMonth = new Array(12).fill(false); // Track whether uv has been added for a month

         fundsData.forEach((el) => {
            const monthIndex = getMonth(el);
            newChartData[monthIndex].pv += el.amount;

            // Only add the uv value once for each month
            if (!uvAddedForMonth[monthIndex]) {
               newChartData[monthIndex].uv += statsData.currentFund;
               newChartData[monthIndex].wv += statsData.totalSumPayments;
               uvAddedForMonth[monthIndex] = true;
            }
         });
         setChartData(newChartData);
      }
   }, [fundsData, statsData, t]); // Ensure statsData is considered as a dependency
   const { data: userIdentity, isPending } = useGetIdentity();
   if (isPending) return null;
   if (userIdentity!.role == "guest") return null;
   return (
      <Card
         sx={{
            marginBlock: "20px",
         }}
      >
         <Stack direction={"column"} spacing={2}>
            <Title title={t("t.admin.welcome")} />
            <Grid
               container
               sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: {
                     xs: "repeat(1, 1fr)", // 2 columns on mobile
                     sm: "repeat(2, 1fr)", // 3 columns on tablets
                     md: "repeat(3, 1fr)", // 4 columns on desktops
                  },
                  flexDirection: "column",
               }}
            >
               <Grid>
                  <CardWithIcon
                     icon={AccountBalanceIcon}
                     title={t("t.statistics.fields.cFund")}
                     subtitle={`${statsData?.currentFund || 0} c.`}
                  />
               </Grid>
               <Grid>
                  <CardWithIcon
                     icon={PaymentsIcon}
                     title={t("t.statistics.fields.tDonations")}
                     subtitle={`${statsData?.totalDonations || 0}`}
                  />
               </Grid>
               <Grid>
                  <CardWithIcon
                     icon={PeopleAltOutlinedIcon}
                     title={t("t.statistics.fields.tDonors")}
                     subtitle={`${statsData?.totalDonors || 0}`}
                  />
               </Grid>
               <Grid>
                  <CardWithIcon
                     icon={VolunteerActivismIcon}
                     title={t("t.statistics.fields.tSumDonations")}
                     subtitle={`${statsData?.totalSumDonations || 0} c.`}
                  />
               </Grid>
               <Grid>
                  <CardWithIcon
                     icon={RequestQuoteIcon}
                     title={t("t.statistics.fields.tPayments")}
                     subtitle={`${statsData?.totalPayments || 0}`}
                  />
               </Grid>
               <Grid>
                  <CardWithIcon
                     icon={ReceiptOutlinedIcon}
                     title={t("t.statistics.fields.tSumPayments")}
                     subtitle={`${statsData?.totalSumPayments || 0} c.`}
                  />
               </Grid>
            </Grid>
            <Box>
               <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 300}>
                  <LineChart
                     width={730}
                     height={250}
                     data={chartData}
                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="name" />
                     <YAxis />
                     <Tooltip />
                     <Legend />
                     <Line type="monotone" dataKey="pv" stroke="#8884d8" name={t("t.chart.pv")} />
                     <Line type="monotone" dataKey="uv" stroke="#82ca9d" name={t("t.chart.uv")} />
                     <Line type="monotone" dataKey="wv" stroke="#ff7300" name={t("t.chart.wv")} />
                  </LineChart>
               </ResponsiveContainer>
            </Box>
         </Stack>
      </Card>
   );
};

export default Dashboard;
