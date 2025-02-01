import { useState } from "react";
import { defaultFormState } from "./constants";
import { FormContext } from "./context/FormContext";

export interface FormState {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   confirmPassword: string;
}

// Form context provider
export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [state, setState] = useState<FormState>(defaultFormState);

   return <FormContext.Provider value={{ state, setState }}>{children}</FormContext.Provider>;
};
