import { FirebaseAuthProvider, FirebaseDataProvider, RAFirebaseOptions } from "react-admin-firebase";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, updateEmail } from "firebase/auth";
import { CreateParams, DeleteParams, UpdateParams, UserIdentity } from "react-admin";
import { createSingleDataDB, getSingleDataDB, rootPath } from "../Utils/utils";
import { deleteObject, getStorage, ref } from "firebase/storage";

export const config = {
   apiKey: import.meta.env.VITE_API_KEY,
   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
   projectId: import.meta.env.VITE_PROJECT_ID,
   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
   appId: import.meta.env.VITE_APP_ID,
   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};
export const app = initializeApp(config);
export const db = getFirestore(app);
export const auth = getAuth(app);

const storage = getStorage(app);
export const rootFireBaseDBPath = "root-production/apiv1";
const options: RAFirebaseOptions = {
   logging: false,
   rootRef: rootFireBaseDBPath,
   persistence: "local",
   useFileNamesInStorage: true,
   firestoreCostsLogger: {
      enabled: false,
      persistCount: false,
   },
   renameMetaFields: {
      created_at: "createdAt", // default: 'createdate'
      created_by: "createdBy", // default: 'createdby'
      updated_at: "updatedAt", // default: 'lastupdate'
      updated_by: "updatedBy", // default: 'updatedby'
   },
   associateUsersById: true,
};

interface Iidentity {
   createDate: Date;
   lastSignIn: Date;
   firstName: string;
   lastName: string;
   email: string;
   id: string;
   phone: number;
   photoURL: string;
   emailVerified: boolean;
   role: string;
}

const baseAuthProvider = FirebaseAuthProvider(config, options);

export const authProvider = {
   ...baseAuthProvider,
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   async login(params: any) {
      try {
         const userCredential = await baseAuthProvider.login(params);
         console.log(userCredential);

         const user = userCredential.user;
         if (!user) {
            throw new Error("User authentication failed");
         }

         const userDocRef = doc(db, rootPath("users"), user.uid);
         const userDoc = await getDoc(userDocRef);
         let userData = {};
         if (userDoc.exists()) {
            userData = userDoc.data();
            const updateUserData = {
               lastSignIn: serverTimestamp(),
            };
            await createSingleDataDB("users", user.uid, updateUserData);
            localStorage.setItem(`userData:${user.uid}`, JSON.stringify(userData));
         }

         return userCredential;
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
         console.error("Login error:i18n", error);
         throw new Error(error);
      }
   },

   async getIdentity(): Promise<UserIdentity> {
      const user = await baseAuthProvider.getIdentity?.();
      if (!user) {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         return null as any;
      }
      const userData = JSON.parse(localStorage.getItem(`userData:${user.id}`) || "{}");
      return {
         ...userData,
         id: user.id,
         fullName: userData.firstName ? `${userData.firstName} ${userData.lastName || ""}`.trim() : user.displayName,
         avatar: userData.photoURL.src || user.avatar || "",
      };
   },

   async getPermissions(): Promise<Iidentity | null> {
      const user = await baseAuthProvider.getIdentity?.();

      if (!user) {
         return null;
      }
      return user.role;
   },

   async logout() {
      const user = await baseAuthProvider.getIdentity?.();
      if (user) {
         localStorage.removeItem(`userData:${user.id}`);
      }
      return baseAuthProvider.logout(auth);
   },

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   async canAccess({ action, resource, record }: { action: string; resource: string; record?: any }) {
      const userData = await this.getIdentity();
      const rolePermissions: Record<string, Record<string, string[]>> = {
         admin: {
            fundsIn: ["create", "edit", "delete", "list", "show"],
            fundsOut: ["create", "edit", "delete", "list", "show"],
            beneficiaries: ["create", "edit", "delete", "list", "show"],
            votes: ["create", "edit", "delete", "list", "show"],
            polls: ["create", "edit", "delete", "list", "show"],
            users: ["edit", "delete", "list", "show"],
            stats: ["list", "show"],
            navigation: ["create", "edit", "delete", "list", "show"],
         },
         dev: {
            fundsIn: ["list", "show"],
            fundsOut: ["list", "show"],
            beneficiaries: ["list", "show"],
            votes: ["list", "show"],
            polls: ["list", "show"],
            users: ["list", "show"],
            stats: ["list", "show"],
            navigation: ["list", "show"],
         },
         donor: {
            navigation: ["show"],
            stats: ["list", "show"],
            beneficiaries: ["create", "list", "show"],
            fundsIn: ["create", "edit", "delete", "list", "show"],
            fundsOut: ["list", "show"],
            votes: ["create", "edit", "list", "show"],
            polls: ["create", "edit", "list", "show"],
            users: ["edit", "list", "show"],
         },
         guest: {
            users: ["list", "edit", "show"],
         },
      };
      const resourcePermissions = rolePermissions[userData.role][resource] || [];
      const hasPermission = resourcePermissions.includes(action);

      if (!hasPermission) {
         return false;
      }

      if (resource == "users") {
         if (record && ["edit"].includes(action)) {
            if (userData.role === "guest" || userData.role === "donor") {
               return record.createdBy === userData.id;
            } else if (userData.role === "admin") {
               return true;
            }
         }
      }
      if (userData.role === "donor") {
         if (record && ["edit", "create", "delete"].includes(action)) {
            return record.createdBy === userData.id;
         }
      }

      // if (userData.role === "donor") {
      //    if (!record && ["edit"].includes(action)) {
      //       if (record.createdBy !== userData.user.id) {
      //          return false;
      //       }
      //    }
      // }
      return true;
   },
};

// DataProvider //

const baseDataProvider = FirebaseDataProvider(config, options);

const FileResources: Record<string, string> = {
   fundsIn: "reciept",
   fundsOut: "reciept",
   users: "photoURL",
};

const StatsRelUpdateResources: Record<string, string> = {
   users: "role",
   fundsIn: "isVerified",
   fundsOut: "amount",
};

// data provider

export const dataProvider = {
   ...baseDataProvider,

   async create(resource: string, params: CreateParams) {
      const { data } = params;

      // update stats
      if (resource == "fundsOut") {
         const stats = "stats";
         const currentStats = await getSingleDataDB(stats, "1");
         const field = StatsRelUpdateResources[resource];

         if (currentStats.exists) {
            const currentData = currentStats.snap!;
            const currentFund = currentData.currentFund;
            const totalSumPayments = currentData.totalSumPayments;
            const totalPayments = currentData.totalPayments;
            const amount = data[field];
            if (amount > 0) {
               await createSingleDataDB(stats, "1", {
                  totalPayments: totalPayments + 1,
                  totalSumPayments: totalSumPayments + amount,
                  currentFund: currentFund - amount,
               });
            }
         }
      }

      return baseDataProvider.create(resource, params);
   },
   async delete(resource: string, params: DeleteParams) {
      const { id, previousData } = params;
      // update stats
      console.log(params);

      if (resource in StatsRelUpdateResources) {
         const stats = "stats";
         const currentStats = await getSingleDataDB(stats, "1");
         const field = StatsRelUpdateResources[resource];
         console.log();

         const currentData = currentStats.snap!;
         const totalDonors = currentData.totalDonors;
         const totalSumDonations = currentData.totalSumDonations;
         const currentFund = currentData.currentFund;
         const totalDonations = currentData.totalDonations;
         const totalSumPayments = currentData.totalSumPayments;
         const totalPayments = currentData.totalPayments;

         if (resource == "users") {
            if (previousData[field] !== "guest") {
               await createSingleDataDB(stats, "1", {
                  totalDonors: totalDonors == 0 ? 0 : totalDonors - 1,
               });
            }
         }
         if (resource == "fundsIn") {
            const isVerifed = previousData[field];
            console.log(isVerifed);

            if (isVerifed) {
               await createSingleDataDB(stats, "1", {
                  totalDonations: totalDonations == 0 ? 0 : totalDonations - 1,
                  totalSumDonations: totalSumDonations - previousData["amount"],
                  currentFund: currentFund - previousData["amount"],
               });
            }
         }
         if (resource == "fundsOut") {
            const amount = previousData[field];
            console.log(amount);
            await createSingleDataDB(stats, "1", {
               totalPayments: totalPayments == 0 ? 0 : totalPayments - 1,
               totalSumPayments: totalSumPayments - amount,
               currentFund: currentFund + amount,
            });
         }
      }
      // delete from firebase storage
      if (previousData) {
         const fileField = FileResources[resource];
         if (fileField && previousData[fileField]?.src) {
            const fileRef = ref(storage, previousData[fileField].src);
            try {
               await deleteObject(fileRef);
               console.log(`File with id:${id} deleted successfully`);
            } catch (error) {
               console.error(`Error deleting file id:${id}`, error);
            }
         }
      }
      return baseDataProvider.delete(resource, params);
   },

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   async update(resource: string, params: UpdateParams): Promise<{ data: any }> {
      const { id, previousData, data } = params;
      console.log(`Updating record with ID: ${id}`);

      // handle avatar change and full name

      if (resource === "users") {
         if (previousData !== data) {
            localStorage.setItem(`userData:${id}`, JSON.stringify(data));
         }
         if (previousData.email !== data.email) {
            updateEmail(auth.currentUser!, data.email).then(() => {
               console.log("email updated");
            });
         }
      }

      // handle stats update
      if (resource in StatsRelUpdateResources) {
         const stats = "stats";
         console.log("updating resoruce", resource, ":", StatsRelUpdateResources);

         const currentStats = await getSingleDataDB(stats, "1");
         const field = StatsRelUpdateResources[resource];
         console.log(currentStats);
         console.log(field);

         if (currentStats.exists) {
            const currentData = currentStats.snap!;
            console.log(currentData);
            const totalDonors = currentData.totalDonors;
            const totalSumDonations = currentData.totalSumDonations;
            const currentFund = currentData.currentFund;
            const totalDonations = currentData.totalDonations;
            const totalSumPayments = currentData.totalSumPayments;
            console.log(previousData[field], " ", data[field]);

            if (resource == "users") {
               if (previousData[field] === "guest" && data[field] !== "guest") {
                  await createSingleDataDB(stats, "1", {
                     totalDonors: totalDonors + 1,
                  });
               }
               if (previousData[field] !== "guest" && data[field] === "guest") {
                  await createSingleDataDB(stats, "1", {
                     totalDonors: totalDonors - 1,
                  });
               }
            }
            if (resource == "fundsIn") {
               console.log(previousData[field]);
               if (!previousData[field] && data[field]) {
                  console.log("adding donor to totalDonors");
                  await createSingleDataDB(stats, "1", {
                     totalDonations: totalDonations + 1,
                     totalSumDonations: totalSumDonations + previousData.amount,
                     currentFund: currentFund + previousData.amount,
                  });
               } else if (previousData[field] && !data[field]) {
                  console.log("removing donor from totalDonors");
                  await createSingleDataDB(stats, "1", {
                     totalDonations: totalDonations == 0 ? 0 : totalDonations - 1,
                     totalSumDonations: totalSumDonations - previousData["amount"],
                     currentFund: currentFund - previousData["amount"],
                  });
               }
            }
            if (resource == "fundsOut") {
               await createSingleDataDB(stats, "1", {
                  totalSumPayments: totalSumPayments - previousData[field] + data[field],
                  currentFund: currentFund + previousData[field] - data[field],
               });
            }
         }
      }

      // hanle firebase storage file updates
      if (previousData && data) {
         const fileField = FileResources[resource];

         if (fileField && previousData[fileField]?.src !== data[fileField]?.src) {
            try {
               if (previousData[fileField]?.src) {
                  const oldFileRef = ref(storage, previousData[fileField].src);
                  await deleteObject(oldFileRef);
                  console.log("Old file deleted successfully");
               }
            } catch (error) {
               console.error("Error deleting old file:", error);
            }
         }
      }

      return baseDataProvider.update(resource, params);
   },
};
