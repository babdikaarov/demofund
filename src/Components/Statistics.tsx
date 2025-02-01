import {
   NumberField,
   useShowController,
   RecordContextProvider,
   TabbedShowLayout,
   Title,
   useTranslate,
} from "react-admin";
export const StatisticsShow = () => (
   <div>
      <StatisticsShowLayout />
   </div>
);

const StatisticsShowLayout = () => {
   const t = useTranslate();
   const { isPending, record } = useShowController({ resource: "stats", id: 1 });

   if (isPending) {
      return;
   }

   return (
      <RecordContextProvider value={record}>
         <Title title={t("t.menu.stats")} />
         <TabbedShowLayout syncWithLocation={false}>
            <TabbedShowLayout.Tab label={t("t.statistics.title_1")}>
               <NumberField source="currentFund" label={t("t.statistics.fields.cFund")} />
               <NumberField source="totalDonors" label={t("t.statistics.fields.tDonors")} />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label={t("t.statistics.title_2")}>
               <NumberField source="totalDonations" label={t("t.statistics.fields.tDonations")} />
               <NumberField source="totalSumDonations" label={t("t.statistics.fields.tSumDonations")} />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label={t("t.statistics.title_3")}>
               <NumberField source="totalPayments" label={t("t.statistics.fields.tPayments")} />
               <NumberField source="totalSumPayments" label={t("t.statistics.fields.tSumPayments")} />
            </TabbedShowLayout.Tab>
         </TabbedShowLayout>
      </RecordContextProvider>
   );
};
