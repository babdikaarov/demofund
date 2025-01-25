import React from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { EmailField, TextField } from "react-admin";

export default function AlertDialog() {
   const [open, setOpen] = React.useState(false);
   const [email, setEmail] = React.useState("");

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };
   const handleSubmit = async () => {
      console.log("sending email to: ", email);
      try {
         await firebase.auth().sendPasswordResetEmail(email);
         setOpen(false);
         setToastOpen(true);
         setToastMessage("Password reset email sent!");
      } catch (error) {
         setToastOpen(true);
         setToastMessage(error.message);
      }
   };

   const handleOnChange = (event) => {
      const email = event.target.value;
      setEmail(email);
   };

   return (
      <div style={{ display: "flex", justifyContent: "center", padding: "10px", paddingTop: "0px" }}>
         <button onClick={handleClickOpen} style={{ width: "100%" }}>
            Forgot Password?
         </button>
         <dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <h1 id="alert-dialog-title">Send Password Reset?</h1>
            <div>
               <div id="alert-dialog-description">A password reset will be sent to the following email:</div>
               <EmailField
                  id="outlined-basic"
                  label="Email"
                  style={{ width: "100%" }}
                  onChange={handleOnChange}
                  source={""}
               />
            </div>
            <div>
               <button onClick={handleClose}>Cancel</button>
               <button onClick={handleSubmit} color="primary" autoFocus>
                  Send Email
               </button>
            </div>
         </dialog>
      </div>
   );
}
