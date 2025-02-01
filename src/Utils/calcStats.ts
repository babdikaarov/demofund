/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCollectionDataDB, createSingleDataDB } from "./utils";

// Function to calculate stats
export const calculateStats = async () => {
   try {
      // Fetching all required collections
      const fundsIn = await getCollectionDataDB("fundsIn");
      const fundsOut = await getCollectionDataDB("fundsOut");
      const users = await getCollectionDataDB("users");

      // Compute the stats
      const totalDonations = fundsIn.exists ? fundsIn.data.filter((doc: any) => doc.isVerified).length : 0;

      const totalDonors = users.exists
         ? users.data.filter((doc: any) => doc.role === "donor" || doc.role === "admin").length
         : 0;

      const totalPayments = fundsOut.exists ? fundsOut.data.length : 0;

      const totalSumDonations = fundsIn.exists
         ? fundsIn.data.filter((doc: any) => doc.isVerified).reduce((sum, doc: any) => sum + (doc.amount || 0), 0)
         : 0;

      const totalSumPayments = fundsOut.exists
         ? fundsOut.data.reduce((sum, doc: any) => sum + (doc.amount || 0), 0)
         : 0;

      // Calculate currentFund = totalSumDonations - totalSumPayments
      const currentFund = totalSumDonations - totalSumPayments;

      // Prepare stats data
      const statsData = {
         currentFund,
         totalDonations,
         totalDonors,
         totalPayments,
         totalSumDonations,
         totalSumPayments,
      };

      console.log("✅ Calculated Stats:", statsData);

      // Store in Firestore at `stats/1`
      await createSingleDataDB("stats", "1", statsData);

      return true;
   } catch (error) {
      console.error("❌ Error calculating stats:", error);
      return false;
   }
};
