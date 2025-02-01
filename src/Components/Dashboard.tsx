import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Title, Resource, useGetList, useGetOne } from "react-admin";
import CardWithIcon from "./CardWithIcon";
import DollarIcon from '@mui/icons-material/AttachMoney'
import CommentIcon from "@mui/icons-material/PersonAdd";
import "./styles/Dashboard.css";
import { FundsInList } from "../Resources/FundsIn/ListShow";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useMediaQuery } from "@mui/material";

export const Dashboard = () => {
  const [totalFunds, setTotalFunds] = React.useState<number>(0);
  const [totalPayments, setTotalPayments] = React.useState<number>(0);

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

  const { data: statsData} = useGetOne("stats", {id: 1});
  const { data: fundsData = [], total: fundsTotal, isPending: fundsPending, error: fundsError } = useGetList("fundsIn");

  const isSmallScreen = useMediaQuery('(max-width:650px)');
  const isMediumScreen = useMediaQuery('(max-width:900px)');

  const getMonth = (el: any) => {
    const date = new Date(el.depositedAt);
    return date.getUTCMonth(); // 0 = Jan, 1 = Feb, ..., 11 = Dec
  };

  React.useEffect(() => {
    let total;

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

        if (fundsData.length > 0) {
          let totalPayments = 0;

          fundsData.forEach((el) => {
            totalPayments += el.amount;
          });
          setTotalPayments(totalPayments);
        }
      });

      setChartData(newChartData); // Update the state
    }
  }, [fundsData]);

  return (
    <>
      <Card>
        <Title title="Welcome to the administration" />
        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        <div
          className="cardIcons-div"
          style={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row', // Stack on small screens
            justifyContent: 'center',
            gap: '10px',  // 50px gap between card elements
            flexWrap: 'wrap',
          }}
        >
          <CardWithIcon key={`Current Fund`} icon={DollarIcon} to="/" title="Current Fund" subtitle={`$ ${statsData?.currentFund || 0}`} />
          <CardWithIcon key={`Total Donations`} icon={DollarIcon} to="/" title="Total funds" subtitle={`$ ${statsData?.totalSumDonations || 0}`} />
          <CardWithIcon key={'Total Payments'} icon={DollarIcon} to='/' title="Total spendings" subtitle={`$ ${statsData?.totalSumPayments || 0}`} />
          <CardWithIcon key={`Total Donors`} icon={CommentIcon} to="/" title="Total Donors" subtitle={statsData?.totalDonors || 0} />
        </div>

        {/* Render Resource only if not on small screen */}
        {!isSmallScreen && <Resource name="fundsIn" list={FundsInList} />}

        {/* Ensure there is always 50px gap between cardIcons-div and the chart */}
        <div style={{ marginTop: '50px' }}>
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
        </div>
      </CardContent>

      </Card>
    </>
  );
};

export default Dashboard;
