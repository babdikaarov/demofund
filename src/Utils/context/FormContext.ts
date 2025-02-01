import { createContext } from "react";
import { FormState } from "../contextAPI";

interface FormContextType {
   state: FormState;
   setState: React.Dispatch<React.SetStateAction<FormState>>;
}
export const FormContext = createContext<FormContextType | undefined>(undefined);
