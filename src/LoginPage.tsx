// LoginPage.js

import { Login, LoginForm } from "react-admin";
import { getAuth, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import {
   CardContent,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Button,
   TextField,
   Typography,
   Box,
} from "@mui/material";
import { useState } from "react";
import googleIcon from "../public/google-icon.svg";
import { app } from "./providers/providers";

const auth = getAuth(app);
auth.languageCode = "en"; // Set language (optional)

const CustomLoginForm = (props: JSX.IntrinsicAttributes) => {
   const [open, setOpen] = useState(false);
   const [email, setEmail] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [message, setMessage] = useState("");

   const handleClose = () => {
      setOpen(false);
      setMessage(""); // Clear message on close
   };

   const handleEmailChange = (event) => {
      setEmail(event.target.value);
   };

   const handleSendReset = () => {
      setIsSubmitting(true);
      sendPasswordResetEmail(auth, email)
         .then(() => {
            setIsSubmitting(false);
            setMessage("A password reset email has been sent to your email address.");
         })
         .catch((error) => {
            setIsSubmitting(false);
            setMessage(`Error: ${error.message}`);
         });
   };

   const handleReset = () => {
      setOpen(true); // Open the dialog
      setMessage(""); // Clear any previous message
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
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
         <LoginForm {...props} />
         <Box sx={{ width: "100%", maxWidth: 400 }}>
            <CardContent>
               <Button
                  onClick={handleGoogleLogin}
                  fullWidth
                  variant="outlined"
                  startIcon={<img src={googleIcon} alt="Google Logo" style={{ width: "28px", height: "28px" }} />} // Inherit original colors
                  style={{ color: "#92ccfa" }}
                  /*             sx={{
               backgroundColor:  '#fff'
               
            }} */
               >
                  Sign in with Google
               </Button>
            </CardContent>

            {/*       <ToggleThemeButton/> */}

            <Button
               style={{
                  textDecoration: "underline",
                  textDecorationThickness: "1.5px",
                  textDecorationColor: "gray", // Default underline color
                  color: "gray", // Default text color
                  transition: "all 0.3s ease", // Smooth transition for color change and opacity
               }}
               onClick={handleReset}
               fullWidth
               onMouseEnter={(e) => {
                  e.target.style.color = "#92ccfa";
                  e.target.style.textDecorationColor = "#92ccfa";
                  e.target.style.opacity = 0.8; // Add opacity change on hover
               }}
               onMouseLeave={(e) => {
                  e.target.style.color = "gray";
                  e.target.style.textDecorationColor = "gray";
                  e.target.style.opacity = 1; // Revert opacity to default
               }}
            >
               Forgot Password
            </Button>

            <Dialog open={open} onClose={handleClose}>
               <DialogTitle>Send Password Reset</DialogTitle>
               <DialogContent>
                  <Typography variant="body1">A password reset will be sent to the following email:</Typography>
                  <TextField
                     label="Email Address"
                     type="email"
                     fullWidth
                     value={email}
                     onChange={handleEmailChange}
                     margin="normal"
                     autoFocus
                  />
                  {message && (
                     <Typography variant="body2" color="success.main" mt={2}>
                        {message}
                     </Typography>
                  )}
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose} color="secondary" disabled={isSubmitting}>
                     Cancel
                  </Button>
                  <Button onClick={handleSendReset} color="primary" disabled={isSubmitting || !email}>
                     {isSubmitting ? "Sending..." : "Send Email"}
                  </Button>
               </DialogActions>
            </Dialog>
         </Box>
      </div>
   );
};

const CustomLoginPage = (props: JSX.IntrinsicAttributes) => (
   <Login {...props}>
      <CustomLoginForm {...props} />
   </Login>
);

export default CustomLoginPage;
