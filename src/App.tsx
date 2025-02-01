// in src/admin/index.tsx
import { Admin, Authenticated, CustomRoutes, Resource, useTranslate } from "react-admin";
import { Route } from "react-router-dom";
import { authProvider, dataProvider } from "./providers/providers";
import { CustomLoginPage } from "./Components/LoginPage";
import { UsersEdit, UsersList, UsersShow } from "./Resources/Users";
import { PollsCreate, PollsEdit, PollsList, PollsShow } from "./Resources/Polls";
import { VotesCreate, VotesList, VotesShow } from "./Resources/Votes";
import { FundsOutCreate, FundsOutEdit, FundsOutList, FundsOutShow } from "./Resources/OutList";
import { MyLayout } from "./Components/Layout";
import { FundsInList, FundsInShow } from "./Resources/FundsIn/ListShow";
import { FundsInCreate } from "./Resources/FundsIn/Create";
import { FundsInEdit } from "./Resources/FundsIn/Edit";
import { StatisticsShow } from "./Components/Statistics";
import {
   BeneficiariesCreate,
   BeneficiariesEdit,
   BeneficiariesList,
   BeneficiariesShow,
} from "./Resources/Beneficiaries";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Navigation from "./Components/Navigation";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { translations } from "./locale/index";
const tCallBack = (l: string) => {
   return translations[l as keyof typeof translations];
};
const i18nProvider = polyglotI18nProvider(tCallBack, "ru", [
   // { locale: "kg", name: "Kyrgyz" },
   { locale: "ru", name: "Ru" },
   { locale: "en", name: "En" },
   // { locale: "tr", name: "Turkish" },
]);

const App = () => {
   return (
      <Admin
         requireAuth
         layout={MyLayout}
         i18nProvider={i18nProvider}
         dataProvider={dataProvider}
         authProvider={authProvider}
         loginPage={CustomLoginPage}
      >
         <CustomRoutes>
            <Route
               path="/navigation"
               element={
                  <Authenticated>
                     <Navigation />
                  </Authenticated>
               }
            />
            <Route
               path="/stats"
               element={
                  <Authenticated>
                     <StatisticsShow />
                  </Authenticated>
               }
            />
         </CustomRoutes>
         <Resource
            name="fundsIn"
            options={{ label: "t.menu.fundsIn" }}
            list={<FundsInList />}
            create={<FundsInCreate />}
            show={<FundsInShow />}
            edit={<FundsInEdit />}
            recordRepresentation={(record) => `> ${record.depositedAt}`}
            icon={VolunteerActivismOutlinedIcon}
         />
         <Resource
            name="users"
            options={{ label: "t.menu.users" }}
            list={<UsersList />}
            show={<UsersShow />}
            edit={<UsersEdit />}
            recordRepresentation={(record) => `> ${record.firstName} ${record.lastName}`}
            icon={PeopleAltOutlinedIcon}
         />

         <Resource
            name="polls"
            options={{ label: "t.menu.polls" }}
            list={<PollsList />}
            show={<PollsShow />}
            create={<PollsCreate />}
            edit={<PollsEdit />}
            // icon={CampaignOutlinedIcon}
         />
         <Resource
            name="votes"
            options={{ label: "t.menu.votes" }}
            list={<VotesList />}
            show={<VotesShow />}
            create={<VotesCreate />}
            icon={ThumbsUpDownOutlinedIcon}
         />

         <Resource
            name="beneficiaries"
            options={{ label: "t.menu.beneficiaries" }}
            list={<BeneficiariesList />}
            create={<BeneficiariesCreate />}
            edit={<BeneficiariesEdit />}
            show={<BeneficiariesShow />}
            recordRepresentation={(record) => `${record.firstName} ${record.lastName}`}
            icon={ReceiptOutlinedIcon}
         />
         <Resource
            name="fundsOut"
            options={{ label: "t.menu.fundsOut" }}
            list={<FundsOutList />}
            create={<FundsOutCreate />}
            show={<FundsOutShow />}
            edit={<FundsOutEdit />}
            icon={RequestQuoteOutlinedIcon}
            recordRepresentation={(record) => `${record.amount}`}
         />
      </Admin>
   );
};

export default App;
