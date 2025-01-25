import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Configure FirebaseUI for the SignUp page
const uiConfig: firebaseui.auth.Config = {
   signInFlow: "popup",
   signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID, // Enable email/password sign-up
      firebase.auth.GoogleAuthProvider.PROVIDER_ID, // Optional: Add Google sign-up
   ],
   callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
         console.log("Registration successful:", authResult);
         return false; // Prevent automatic redirect
      },
   },
};

const SignUp = () => {
   const history = useNavigate();

   const handleBackToLogin = () => {
      history("/login"); // Navigate to the login page
   };

   return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
         <Card style={{ maxWidth: 400, padding: "16px" }}>
            <CardContent>
               <Typography variant="h5" component="h2" style={{ marginBottom: "16px", textAlign: "center" }}>
                  Create an Account
               </Typography>
               <StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={uiConfig} />
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
               <Button color="primary" onClick={handleBackToLogin}>
                  Back to Login
               </Button>
            </CardActions>
         </Card>
      </div>
   );
};

export default SignUp;
