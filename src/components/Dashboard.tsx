import * as React from "react";
import Card from "@mui/material/Card";
import { Title, useGetList, useGetOne } from "react-admin";
import CardWithIcon from "./CardWithIcon";
import DollarIcon from "@mui/icons-material/AttachMoney";
import CommentIcon from "@mui/icons-material/PersonAdd";
import "./styles/Dashboard.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Grid2 as Grid, Stack, useMediaQuery } from "@mui/material";
import Navigation from "./Navigation";

export const Dashboard = () => {
   const [chartData, setChartData] = React.useState([
      { name: "Jan", totalPayments: 0 },
      { name: "Feb", totalPayments: 0 },
      { name: "Mar", totalPayments: 0 },
      { name: "Apr", totalPayments: 0 },
      { name: "May", totalPayments: 0 },
      { name: "Jun", totalPayments: 0 },
      { name: "Jul", totalPayments: 0 },
      { name: "Aug", totalPayments: 0 },
      { name: "Sep", totalPayments: 0 },
      { name: "Oct", totalPayments: 0 },
      { name: "Nov", totalPayments: 0 },
      { name: "Dec", totalPayments: 0 },
   ]);

   const { data: statsData } = useGetOne("stats", { id: 1 });
   const { data: fundsData = [] } = useGetList("fundsIn");

   const isSmallScreen = useMediaQuery("(max-width:650px)");

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const getMonth = (el: any) => {
      const date = new Date(el.depositedAt);
      return date.getUTCMonth(); // 0 = Jan, 1 = Feb, ..., 11 = Dec
   };

   React.useEffect(() => {
      if (fundsData.length > 0) {
         const newChartData = [
            { name: "Jan", totalPayments: 0 },
            { name: "Feb", totalPayments: 0 },
            { name: "Mar", totalPayments: 0 },
            { name: "Apr", totalPayments: 0 },
            { name: "May", totalPayments: 0 },
            { name: "Jun", totalPayments: 0 },
            { name: "Jul", totalPayments: 0 },
            { name: "Aug", totalPayments: 0 },
            { name: "Sep", totalPayments: 0 },
            { name: "Oct", totalPayments: 0 },
            { name: "Nov", totalPayments: 0 },
            { name: "Dec", totalPayments: 0 },
         ];

         fundsData.forEach((el) => {
            const monthIndex = getMonth(el); // Find the month index
            newChartData[monthIndex].totalPayments += el.amount; // Accumulate the amount
         });

         setChartData(newChartData); // Update the state
      }
   }, [fundsData]);

   return (
      <Card>
         <Stack direction={"column"} spacing={2}>
            <Title title="Welcome to the administration" />
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
                  <CardWithIcon icon={DollarIcon} title="Current Fund" subtitle={`$ ${statsData?.currentFund || 0}`} />
               </Grid>
               <Grid>
                  <CardWithIcon
                     icon={DollarIcon}
                     title="totalDonations"
                     subtitle={`$ ${statsData?.totalDonations || 0}`}
                  />
               </Grid>
               <Grid>
                  <CardWithIcon icon={CommentIcon} title="Total Donors" subtitle={statsData?.totalDonors || 0} />
               </Grid>
               <Grid>
                  <CardWithIcon
                     icon={DollarIcon}
                     title="Total funds"
                     subtitle={`$ ${statsData?.totalSumDonations || 0}`}
                  />
               </Grid>
               <Grid>
                  <CardWithIcon icon={CommentIcon} title="totalPayments" subtitle={statsData?.totalPayments || 0} />
               </Grid>
               <Grid>
                  <CardWithIcon
                     icon={DollarIcon}
                     title="Total spendings"
                     subtitle={`$ ${statsData?.totalSumPayments || 0}`}
                  />
               </Grid>
            </Grid>
            <Box>
               <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 300}>
                  <BarChart data={chartData}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="name" />
                     <YAxis />
                     <Tooltip />
                     <Legend />
                     <Bar dataKey="totalPayments" fill="#8884d8" />
                  </BarChart>
               </ResponsiveContainer>
            </Box>
            <Navigation />
         </Stack>
      </Card>
   );
};

export default Dashboard;
