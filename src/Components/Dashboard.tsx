import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Title, Resource, useGetList } from "react-admin";
import CardWithIcon from "./CardWithIcon";
import DollarIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CommentIcon from "@mui/icons-material/Comment";
import CustomerIcon from "@mui/icons-material/PersonAdd";
import './styles/Dashboard.css';
import { FundsInList } from "../Resources/FundsIn/ListShow";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const Dashboard = () => {
  const [totalFunds, setTotalFunds] = React.useState<number>(0);
  const [totalPayments, setTotalPayments] = React.useState<number>(0);
  const [id, setId] = React.useState();

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

  const { data: statsData, total: statsTotal, isPending: statsPending, error: statsError } = useGetList("stats");
  const { data: fundsData = [], total: fundsTotal, isPending: fundsPending, error: fundsError } = useGetList("fundsIn");

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
  console.log(statsData);
  console.log(fundsData)

  React.useEffect(() => {
    if (statsData) {
      let totalFunds = 0;
      let id;

      statsData.forEach((el) => {
        totalFunds += el.totalPayments;
        id = el.id
      });
      setTotalFunds(totalFunds);
      setId(id);
    }
  }, [statsData]);
  return (
    <Card>
      <Title title="Welcome to the administration" />
      <CardContent>
          <div className="cardIcons-div" style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
            <CardWithIcon key={`Total funds`} icon={DollarIcon} to="/" title="Total payments" subtitle={`$ ${totalPayments}`} />
            <CardWithIcon key={`Total payments`} icon={ShoppingCartIcon} to="/" title="Total funds" subtitle={totalFunds} />
            <CardWithIcon key={`Id`} icon={CommentIcon} to="/" title="Id" subtitle={'undefined'} />
            <CardWithIcon key={'ref'} icon={CustomerIcon} to='/' title="The highest" subtitle={'undefined'} />
          </div>

        <Resource name="fundsIn" list={FundsInList} />

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalPayments" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
};

export default Dashboard