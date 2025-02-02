import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { checkCollectionHasDocuments, createSingleDataDB, createUserAuthentication } from "../Utils/utils";
import { NotificationType, useNotify, useTranslate } from "react-admin";
import { useFormContext } from "../Utils/useFormContext";
import { defaultFormState } from "../Utils/constants";
import { serverTimestamp } from "firebase/firestore";

const RegisterDialog: React.FC<{ disabled: boolean }> = ({ disabled }) => {
   const t = useTranslate();
   const defaultState = {
      isOpen: false,
      isSubmitting: false,
   };
   const [myState, setMyState] = useState(defaultState);
   const { state, setState } = useFormContext();
   const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, [field]: event.target.value }));
   };
   const handleClose = () => {
      setMyState(defaultState);
      setState(defaultFormState);
   };
   const notify = useNotify();

   const handleEvent = (msg: string, type: NotificationType) => {
      notify(msg, { type });
   };
   const handleCreateUser = async () => {
      if (!state.email.includes("@")) {
         handleEvent(t("t.register.notification.valid"), "error");
         return;
      }
      if (state.password !== state.confirmPassword) {
         handleEvent(t("t.register.notification.match"), "error");
         return;
      }

      if (state.password.length < 6) {
         handleEvent(t("t.register.notification.length"), "error");
         return;
      }

      setMyState((p) => ({ ...p, isSubmitting: true }));

      const result = await createUserAuthentication(state.email, state.password);
      // console.log(result);
      if (!result.error && result.user) {
         const userCollection = await checkCollectionHasDocuments("users");
         console.log(userCollection);
         let role;
         if (userCollection) {
            role = "guest";
         } else {
            role = "admin";
         }
         console.log("create userdata obbject");
         const userData = {
            id: result.user.uid,
            createdBy: result.user.uid,
            createDate: serverTimestamp(),
            creationTime: serverTimestamp(),
            lastSignIn: serverTimestamp(),
            firstName: state.firstName,
            lastName: state.lastName,
            fullName: `${state.firstName} ${state.lastName}`,
            email: state.email,
            emailVerified: false,
            phone: 996,
            photoURL: {
               src: result.user!.photoURL || "",
               title: state.firstName || "avatar",
            },
            role: role,
         };
         localStorage.setItem(`userData:${result.user.uid}`, JSON.stringify(userData));
         await createSingleDataDB("users", result.user.uid, userData);
         handleEvent(t("t.register.notification.success"), "success");
         setMyState(defaultState);
         setState(defaultFormState);
         window.location.href = "/";
      } else {
         setMyState((p) => ({ ...p, isSubmitting: false }));
         handleEvent(t("t.register.notification.server"), "warning");
         throw Error(result.error);
      }
   };

   return (
      <>
         <Button
            type="button"
            className="RaLoginForm-button"
            onClick={() => setMyState({ ...defaultState, isOpen: true })}
            variant="outlined"
            fullWidth
            size="large"
            color="inherit"
            disabled={disabled}
         >
            {t("t.login.register")}
         </Button>
         <Dialog open={myState.isOpen} onClose={handleClose}>
            <DialogTitle>{t("t.register.title")}</DialogTitle>
            <DialogContent>
               <Typography variant="body1">{t("t.register.description")}</Typography>
               <TextField
                  label={t("t.register.fName")}
                  type="text"
                  fullWidth
                  value={state.firstName}
                  onChange={handleInputChange("firstName")}
                  margin="normal"
                  autoFocus
                  required
                  autoComplete="off"
               />
               <TextField
                  label={t("t.register.lName")}
                  type="text"
                  fullWidth
                  required
                  value={state.lastName}
                  onChange={handleInputChange("lastName")}
                  margin="normal"
                  autoComplete="off"
               />
               <TextField
                  label={t("t.register.inputEmail")}
                  type="email"
                  inputMode="email"
                  fullWidth
                  required
                  value={state.email}
                  onChange={handleInputChange("email")}
                  margin="normal"
                  autoComplete="off"
               />
               <TextField
                  label={t("t.register.inputPassword")}
                  type="password"
                  autoComplete="off"
                  fullWidth
                  required
                  value={state.password}
                  onChange={handleInputChange("password")}
                  margin="normal"
               />
               <TextField
                  label={t("t.register.inputRepeatPassword")}
                  type="password"
                  autoComplete="off"
                  fullWidth
                  required
                  value={state.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  margin="normal"
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="secondary" type="button" disabled={myState.isSubmitting}>
                  {t("t.register.cancel")}
               </Button>
               <Button
                  onClick={handleCreateUser}
                  color="primary"
                  type="button"
                  disabled={
                     myState.isSubmitting ||
                     !state.email ||
                     !state.password ||
                     !state.confirmPassword ||
                     !state.firstName ||
                     !state.lastName
                  }
               >
                  {myState.isSubmitting ? t("t.register.creating") : t("t.register.create")}
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
};

export default RegisterDialog;
