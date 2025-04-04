// LoginPage.js

import { Login } from "react-admin";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Avatar, Button, CardContent, CircularProgress, Divider, Stack } from "@mui/material";
import { Form, required, useTranslate, useLogin, useNotify } from "ra-core";
import { TextInput } from "react-admin";
import googleIcon from "../assets/google-icon.svg";
import { checkCollectionHasDocuments, createSingleDataDB, getSingleDataDB, handleGoogleLogin } from "../Utils/utils";
import ResetDialog from "./ResetDialog";
import RegisterDialog from "./RegisterDialog";
import { serverTimestamp } from "firebase/firestore";
import { FormProvider } from "../Utils/contextAPI";
const MyLoginForm = (props: LoginFormProps) => {
   const { redirectTo, className } = props;
   const [loading, setLoading] = React.useState(false);
   const login = useLogin();
   const translate = useTranslate();
   const notify = useNotify();

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const submit: any = (values: FormData) => {
      setLoading(true);
      login(values, redirectTo)
         .then(() => {
            setLoading(false);
         })
         .catch((error) => {
            setLoading(false);
            notify(
               typeof error === "string"
                  ? error
                  : typeof error === "undefined" || !error.message
                  ? "ra.auth.sign_in_error"
                  : error.message,
               {
                  type: "error",
                  messageArgs: {
                     _: typeof error === "string" ? error : error && error.message ? error.message : undefined,
                  },
               },
            );
         });
   };
   const handleCreateGoogleUser = async () => {
      try {
         setLoading(true);
         // Step 1: Sign in with Google
         const result = await handleGoogleLogin();
         if (!result || "error" in result) {
            setLoading(false);
            console.error("Google Login failed:", result.error);
            return; // Exit early if sign-in failed
         }
         const { user } = result;

         // Step 2: Check if user already exists in Firestore
         const data = await getSingleDataDB("users", user.uid);

         // // Step 3: Create user in Firestore if they don't exist
         if (data.exists) {
            const userData = {
               lastSignIn: serverTimestamp(),
            };

            localStorage.setItem(`userData:${user.uid}`, JSON.stringify(data.snap));
            await createSingleDataDB("users", user.uid, userData);
            window.location.href = "/";
         } else {
            try {
               const userCollection = await checkCollectionHasDocuments("users");
               // console.log(userCollection);
               let role;
               if (userCollection) {
                  role = "guest";
               } else {
                  role = "admin";
               }
               // console.log(role);

               const userData = {
                  id: user.uid,
                  createdBy: user.uid,
                  createDate: serverTimestamp(),
                  creationTime: serverTimestamp(),
                  lastSignIn: serverTimestamp(),
                  firstName: user.displayName?.split(" ")[0],
                  lastName: user.displayName?.split(" ")[1],
                  fullName: user.displayName,
                  email: user.email,
                  phone: user.phoneNumber,
                  photoURL: {
                     src: user.photoURL,
                     title: user.displayName?.split(" ")[0] || "avatar",
                  },
                  role: role,
               };
               // console.log("processing user:", user);

               const res = await createSingleDataDB("users", result.user.uid, userData);
               localStorage.setItem(`userData:${res.data.id}`, JSON.stringify(res.data));
               setLoading(false);
               window.location.href = "/";
            } catch (error) {
               return error;
            }
         }
      } catch (err) {
         setLoading(false);
         console.error("An error occurred:", err);
      }
   };

   return (
      <FormProvider>
         <StyledForm onSubmit={submit} mode="onChange" noValidate className={className}>
            <CardContent className={LoginFormClasses.content}>
               <TextInput
                  autoFocus
                  source="username"
                  label={translate("ra.auth.username")}
                  autoComplete="username"
                  inputMode="email"
                  validate={required()}
               />
               <TextInput
                  source="password"
                  label={translate("ra.auth.password")}
                  type="password"
                  autoComplete="current-password"
                  validate={required()}
               />
               <ResetDialog />
               <Stack direction={"column"} divider={<Divider orientation="horizontal" flexItem />} spacing={2}>
                  <Button
                     variant="contained"
                     type="submit"
                     color="primary"
                     disabled={loading}
                     fullWidth
                     size="large"
                     className={LoginFormClasses.button}
                  >
                     {loading ? (
                        <CircularProgress className={LoginFormClasses.icon} size={19} thickness={3} />
                     ) : (
                        translate("ra.auth.sign_in")
                     )}
                  </Button>
                  <Button
                     type="button"
                     onClick={handleCreateGoogleUser}
                     variant="outlined"
                     fullWidth
                     size="large"
                     disabled={loading}
                     color="info"
                     startIcon={<img src={googleIcon} alt="Google Logo" />}
                     children={translate("t.login.signGoogle")}
                     className={LoginFormClasses.button}
                  />
                  <RegisterDialog disabled={loading} />
               </Stack>
            </CardContent>
         </StyledForm>
      </FormProvider>
   );
};

const PREFIX = "RaLoginForm";

// eslint-disable-next-line react-refresh/only-export-components
export const LoginFormClasses = {
   content: `${PREFIX}-content`,
   button: `${PREFIX}-button`,
   icon: `${PREFIX}-icon`,
};

const StyledForm = styled(Form, {
   name: PREFIX,
   overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
   [`& .${LoginFormClasses.content}`]: {
      width: 300,
   },
   [`& .${LoginFormClasses.button}`]: {
      marginTop: theme.spacing(2),
   },
   [`& .${LoginFormClasses.icon}`]: {
      margin: theme.spacing(0.3),
   },
}));

export interface LoginFormProps {
   redirectTo?: string;
   className?: string;
}

interface FormData {
   username: string;
   password: string;
}

export const CustomLoginPage = (props: JSX.IntrinsicAttributes) => {
   return (
      <Login
         {...props}
         avatarIcon={
            <Avatar sizes="large">
               <img src="./icon.png" width={"100%"} alt="Avatar" />
            </Avatar>
         }
      >
         <MyLoginForm {...props} />
      </Login>
   );
};
