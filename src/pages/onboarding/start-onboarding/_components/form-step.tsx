'use client';

import { useFormState } from './form-context';
import NextOfKin from './steps/next-of-kin';
import PersonalDetails from './steps/personal-details';
import Payment from './steps/payment';

export function FormStep() {
  const { step } = useFormState();

  switch (step) {
    case 1:
      return <PersonalDetails />;
    case 2:
      return <NextOfKin />;
    case 3:
      return <Payment />;
    default:
      return null;
  }
}
