'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '../form-context';
import { PersonalDetailsFormValues } from '../constants';
import { useSession } from '@/providers/SessionProvider';
import { onboardUser } from '../../_actions/update-member';

export default function ReviewDetails() {
  const { user } = useSession();
  const navigate = useNavigate();

  const { onHandlePrev, onHandleNext, setFormData, formData } = useFormState();
  const { handleSubmit } = useForm<PersonalDetailsFormValues>({
    defaultValues: formData,
  });

  function onHandleFormSubmit(data: PersonalDetailsFormValues) {
    if (user?.id) {
      setFormData((prevFormData) => ({ ...prevFormData, ...data }));
      // Call onboardUser function to save the data
      onboardUser(user.id, data).then((result) => {
        if (result.success) {
          onHandleNext();
          toast.success('Onboarding process completed!');
          navigate('/onboarding/reg-payment');
        } else {
          console.error('Error onboarding user:', result.error);
          toast.error('Ooops! Error onboarding user');
        }
      });
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <h1 className="mt-4 mb-2 items-center font-semibold text-sm">
          REVIEW DETAILS
        </h1>
      </div>
      <form className="space-x-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div>
          <div className="flex flex-col gap-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Personal Details</AccordionTrigger>
                <AccordionContent>
                  {Object.entries(formData)
                    .filter(
                      ([key]) =>
                        !['nok_'].some((prefix) => key.startsWith(prefix))
                    )
                    .map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-x-4 py-2">
                        <Label className="font-semibold">
                          {key.replace('_', ' ')}:
                        </Label>
                        <p className="ml-2">{value}</p>
                      </div>
                    ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Next of Kin</AccordionTrigger>
                <AccordionContent>
                  {Object.entries(formData)
                    .filter(([key]) => key.startsWith('nok_'))
                    .map(([key, value]) => (
                      <div className="grid grid-cols-2 gap-x-4 py-2" key={key}>
                        <label className="font-semibold">
                          {key.replace('nok_', '').replace('_', ' ')}
                        </label>
                        <p className="ml-2">{value}</p>
                      </div>
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button type="button" onClick={onHandlePrev}>
            Prev
          </Button>

          <Button type="submit">Payment</Button>
        </div>
      </form>
    </>
  );
}
