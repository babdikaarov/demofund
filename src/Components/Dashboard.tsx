import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Title, useGetList, useGetOne, useTranslate } from "react-admin";
import CardWithIcon from "./CardWithIcon";
import DollarIcon from '@mui/icons-material/AttachMoney';
import CommentIcon from "@mui/icons-material/PersonAdd";
import "./styles/Dashboard.css";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line} from "recharts";
import { useMediaQuery } from "@mui/material";

export const Dashboard = () => {
  const { data: statsData } = useGetOne("stats", { id: 1 });
  const { data: fundsData = []} = useGetList("fundsIn");
  const isSmallScreen = useMediaQuery('(max-width:650px)');
  const [totalPayments, setTotalPayments] = React.useState<number>(0);
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
    { name: "Dec", pv: 0 }
  ]);

  const getMonth = (el: any) => {
    if (!el.depositedAt) return 0; // fallback for invalid date
    const date = new Date(el.depositedAt);
    return date.getUTCMonth(); // 0 = Jan, 1 = Feb, ..., 11 = Dec
  };

  React.useEffect(() => {
    if (fundsData.length > 0) {
      const newChartData = [
        { name: t("t.menu.jan", { defaultValue: "Jan" }), pv: 0, uv: 0, wv: 0},
        { name: t("t.menu.feb", { defaultValue: "Feb" }), pv: 0, uv: 0, wv: 0},
        { name: t("t.menu.mar", { defaultValue: "Mar" }), pv: 0, uv: 0, wv: 0 },
        { name: t("t.menu.apr", { defaultValue: "Apr" }), pv: 0, uv: 0, wv: 0 },
        { name: t("t.menu.may", { defaultValue: "May" }), pv: 0, uv: 0, wv: 0 },
        { name: t("t.menu.jun", { defaultValue: "Jun" }), pv: 0, uv: 0, wv: 0 },
        { name: t("t.menu.jul", { defaultValue: "Jul" }), pv: 0, uv: 0, wv: 0 },
        { name: t("t.menu.aug", { defaultValue: "Aug" }), pv: 0, uv: 0, wv: 0 },
        { name: t("t.menu.sep", { defaultValue: "Sep" }), pv: 0, uv: 0, wv: 0 },
        { name: t("t.menu.oct", { defaultValue: "Oct" }), pv: 0, uv: 0, wv: 0 },
        { name: t("t.menu.nov", { defaultValue: "Nov" }), pv: 0, uv: 0, wv: 0 },
        { name: t("t.menu.dec", { defaultValue: "Dec" }), pv: 0, uv: 0, wv: 0 },
      ];
  
      let totalPayments = 0;
      let uvAddedForMonth = new Array(12).fill(false); // Track whether uv has been added for a month
  
      fundsData.forEach((el) => {
        const monthIndex = getMonth(el);
        newChartData[monthIndex].pv += el.amount;
        totalPayments += el.amount;
  
        // Only add the uv value once for each month
        if (!uvAddedForMonth[monthIndex]) {
          newChartData[monthIndex].uv += statsData.currentFund;
          newChartData[monthIndex].wv += statsData.totalSumPayments;
          uvAddedForMonth[monthIndex] = true;
        }
      });
  
      setTotalPayments(totalPayments);
      setChartData(newChartData);
    }
  }, [fundsData, statsData, t]); // Ensure statsData is considered as a dependency

  return (
    <Card>
      <Title title={t("t.menu.welcome")} />
      <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        <div
          className="cardIcons-div"
          style={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <CardWithIcon key={`Current Fund`} icon={DollarIcon} to="/" title={t("t.statistics.fields.cFund")} subtitle={`$ ${statsData?.currentFund || 0}`} />
          <CardWithIcon key={`Total Donations`} icon={DollarIcon} to="/" title={t("t.statistics.fields.tDonations")} subtitle={`$ ${statsData?.totalSumDonations || 0}`} />
          <CardWithIcon key={'Total Payments'} icon={DollarIcon} to='/' title={t("t.statistics.fields.tPayments")} subtitle={`$ ${statsData?.totalSumPayments || 0}`} />
          <CardWithIcon key={`Total Donors`} icon={CommentIcon} to="/" title={t("t.statistics.fields.tDonors")} subtitle={statsData?.totalDonors || 0} />
        </div>

        {/* Render Resource only if not on small screen */}
{/*         {!isSmallScreen && <Resource name="fundsIn" list={FundsInList} />} */}


        <div style={{ marginTop: '50px' }}>
          <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 300}>
            <LineChart width={730} height={250} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" name={t('t.chart.pv')}/>
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" name={t('t.chart.uv')}/>
              <Line type="monotone" dataKey="wv" stroke="#ff7300" name={t('t.chart.wv')}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
