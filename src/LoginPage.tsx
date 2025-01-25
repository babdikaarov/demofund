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
   const [open, setOpen] = useState(false);
   const [email, setEmail] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [message, setMessage] = useState('');

   const handleClickOpen = () => {
     setOpen(true);
   };

   const handleClose = () => {
     setOpen(false);
     setMessage(''); // Clear message on close
   };

   const handleEmailChange = (event) => {
     setEmail(event.target.value);
   };

   const handleSendReset = () => {
      setIsSubmitting(true);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setIsSubmitting(false);
          setMessage('A password reset email has been sent to your email address.');
        })
        .catch((error) => {
          setIsSubmitting(false);
          setMessage(`Error: ${error.message}`);
        });
   };

   const handleReset = () => {
      setOpen(true); // Open the dialog
      setMessage(''); // Clear any previous message
   };

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
