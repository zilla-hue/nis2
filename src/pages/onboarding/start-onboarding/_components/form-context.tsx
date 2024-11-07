'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface FormData {
  marital_status?: string;
}
interface IFormContext {
  onHandleNext: () => void;
  onHandlePrev: () => void;
  step: number;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

const FormContext = createContext<IFormContext>({
  onHandleNext: () => {},
  onHandlePrev: () => {},
  step: 1,
  formData: {},
  setFormData: () => {},
});

interface FormProviderProps {
  children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});

  function onHandleNext() {
    setStep((currentStep) => currentStep + 1);
  }

  function onHandlePrev() {
    setStep((currentStep) => currentStep - 1);
  }

  console.log({ formData });

  return (
    <FormContext.Provider
      value={{ onHandlePrev, onHandleNext, step, formData, setFormData }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormContext);
}
