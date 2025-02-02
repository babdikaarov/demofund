import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { doesUserEmailExist, handleResetPassword } from "../Utils/utils";
import { NotificationType, useNotify, useTranslate } from "react-admin";

const ResetDialog: React.FC = () => {
   const t = useTranslate();
   const defaultState = {
      isOpen: false,
      email: "",
      isSubmitting: false,
   };
   const [state, setState] = useState(defaultState);
   const notify = useNotify();

   const handleEvent = (msg: string, type: NotificationType) => {
      notify(msg, { type });
   };

   const handleSendReset = async () => {
      setState((prev) => ({ ...prev, isSubmitting: true }));
      const data = await doesUserEmailExist(state.email);

      if (data) {
         handleResetPassword(state.email);

         handleEvent(t("t.reset.sent"), "success");
         setState(defaultState);
      } else {
         handleEvent(`${t("t.reset.notFound")} ${state.email}`, "error");
         setState((prev) => ({ ...prev, isSubmitting: false }));
      }
   };

   return (
      <>
         <Button
            type="button"
            className="RaLoginForm-button"
            onClick={() => setState({ ...defaultState, isOpen: true })}
            color="info"
            size="small"
            variant="text"
            children={t("t.login.forgot")}
         />
         <Dialog open={state.isOpen}>
            <DialogTitle>{t("t.reset.title")}</DialogTitle>
            <DialogContent>
               <Typography variant="body1">{t("t.reset.description")}</Typography>
               <TextField
                  label={t("t.reset.input")}
                  type="email"
                  fullWidth
                  inputMode="email"
                  value={state.email}
                  onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
                  margin="normal"
                  autoFocus
               />
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={() => setState((prev) => ({ ...prev, isOpen: false }))}
                  color="secondary"
                  disabled={state.isSubmitting}
               >
                  {t("t.reset.cancel")}
               </Button>
               <Button onClick={handleSendReset} color="primary" disabled={state.isSubmitting || !state.email}>
                  {state.isSubmitting ? t("t.reset.sending") : t("t.reset.send")}
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
};

export default ResetDialog;
