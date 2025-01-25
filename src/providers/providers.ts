import { FirebaseAuthProvider, FirebaseDataProvider } from "react-admin-firebase";
import { initializeApp } from "firebase/app";

export const config = {
   apiKey: "AIzaSyCd1ySBmZTudXiyGxPvfOAzalJ3wNOjmLk",
   authDomain: "kdmfund-95d8a.firebaseapp.com",
   databaseURL: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
   projectId: "kdmfund-95d8a",
   storageBucket: "kdmfund-95d8a.firebasestorage.app",
   messagingSenderId: "484663891678",
   appId: "1:484663891678:web:60bb7df7f00e336040944f",
   measurementId: "G-93FYZD1310",
};

export const app = initializeApp(config);
console.log(app);
export const authProvider = FirebaseAuthProvider(config, {});
export const dataProvider = FirebaseDataProvider(config, {
   logging: true,
   // rootRef: "/",,
   // app: app,
   // watch: ["users"],
   // dontwatch: ['comments'];
   //  persistence: "local",
   // disableMeta: true
   //  dontAddIdFieldToDoc: true,
   //  lazyLoading: {
   //     enabled: true,
   //  },
   //  firestoreCostsLogger: {
   //     enabled: true,
   //  },
});
