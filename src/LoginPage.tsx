// LoginPage.js
import { Login, LoginForm } from "react-admin";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { config } from "./providers/providers";
import ForgotPassword from "./ForgotPassword";

// Initialize Firebase
const app = initializeApp(config);
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
      <div>
         <LoginForm {...props} />
         <button onClick={handleGoogleLogin} style={{ marginTop: "20px", padding: "10px 20px" }}>
            Sign in with Google
         </button>
         <ForgotPassword />
      </div>
   );
};

const CustomLoginPage = (props: JSX.IntrinsicAttributes) => (
   <Login {...props}>
      <CustomLoginForm {...props} />
   </Login>
);

export default CustomLoginPage;
