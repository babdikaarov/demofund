// LoginPage.js
import { Login, LoginForm } from "react-admin";
import { Button, CardContent } from "@mui/material";

import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { app } from "./providers/providers";
import ForgotPassword from "./ForgotPassword";

// Initialize Firebase

const auth = getAuth(app);

auth.languageCode = "en"; // Set language (optional)

const CustomLoginForm = (props: JSX.IntrinsicAttributes) => {
   const handleGoogleLogin = async () => {
      try {
         // Perform Google Sign-In
         const result = await signInWithPopup(auth, new GoogleAuthProvider());
         const credential = GoogleAuthProvider.credentialFromResult(result);
         const token = credential?.accessToken;
         const user = result.user;

         console.log("User signed in:", user);
         console.log("Access token:", token);

         // Optional: Redirect after successful login
         window.location.href = "/";
      } catch (error: any) {
         console.error("Error signing in with Google:", error);
         alert(`Sign-in failed: ${error.message}`);
      }
   };

   return (
      <>
         <LoginForm {...props} />
         <CardContent>
            <Button
               children="Sign in with Google"
               variant="outlined"
               fullWidth
               startIcon="@"
               onClick={handleGoogleLogin}
            />
         </CardContent>
      </>
   );
};

const CustomLoginPage = (props: JSX.IntrinsicAttributes) => (
   <Login {...props}>
      <CustomLoginForm {...props} />
   </Login>
);

export default CustomLoginPage;
