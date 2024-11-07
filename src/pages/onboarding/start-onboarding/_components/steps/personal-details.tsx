import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useSession } from '@/providers/SessionProvider';
import { useFormState } from '../form-context';
import { PersonalDetailsFormValues, localGovernmentAreas } from '../constants';
import { Textarea } from '@/components/ui/textarea';
import { Submitbutton } from '@/components/sections/submit-buttons';

export default function PersonalDetails() {
  const [selectedState, setSelectedState] = useState<string | undefined>(''); // Set initial state to undefined
  const [selectedLGA, setSelectedLGA] = useState('');

  const { user, know_your_member, isOnboarded } = useSession();

  // if (!user?.id) {
  //   return redirect('/authenticate/sign-in')
  // }

  // if (!know_your_member) {
  //   return redirect('/onboarding/know-your-member')
  // }

  // if (isOnboarded) {
  //   return redirect('/')
  // }

  const { onHandleNext, setFormData, formData } = useFormState();
  const { register, handleSubmit } = useForm<PersonalDetailsFormValues>({
    defaultValues: formData,
  });

  function onHandleFormSubmit(data: PersonalDetailsFormValues) {
    if (user?.id) {
      const formDataWithUser = {
        ...data,
      };

      setFormData(formDataWithUser);
      onHandleNext();
    }
  }

  // Calculate the maximum date for 18 years old
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split('T')[0];

  const handleStateChange = (e: any) => {
    setSelectedState(e.target.value);
    setSelectedLGA(''); // Reset selected LGA when state changes
  };

  const handleLGAChange = (e: any) => {
    setSelectedLGA(e.target.value);
  };

  return (
    <>
      <div className="flex justify-end">
        <h1 className="mt-4 mb-2 items-center font-semibold text-sm">
          PERSONAL DETAILS (1 of 3)
        </h1>
      </div>
      <Separator />
      <form className="space-x-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className="flex flex-col gap-1">
          <div className="py-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              required
              id="dob"
              max={maxDate}
              type="date"
              {...register('birth_date')}
              title="You must be above 18 to proceed."
            />
          </div>

          <div className="py-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              className="block appearance-none w-full h-9 dark:bg-slate-950 border hover:focus-visible:border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none"
              {...register('gender')}
            >
              <option className="w-full h-12" value="male">
                Male
              </option>
              <option className="w-full h-12" value="female">
                Female
              </option>
            </select>
          </div>
          <div className="py-2">
            <Label htmlFor="marital_status">Marital Status</Label>
            <select
              className="block appearance-none w-full h-9 dark:bg-slate-950 border hover:focus-visible:border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none"
              {...register('marital_status')}
            >
              <option className="w-full h-12" value="single">
                Single
              </option>
              <option className="w-full h-12" value="married">
                Married
              </option>
              <option className="w-full h-12" value="divorced">
                Divorced
              </option>
            </select>
          </div>
          <div className="py-2">
            <Label htmlFor="address">First Line of Address</Label>
            <Textarea
              required
              id="address"
              placeholder="10 Cambridge Street, London"
              {...register('address')}
            />
          </div>
          <div className="py-2">
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              id="postcode"
              type="text"
              placeholder="LU1 9QB"
              {...register('postcode')}
            />
          </div>
          <div className="py-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              required
              id="nationality"
              type="text"
              placeholder="e.g. Nigerian"
              {...register('nationality')}
            />
          </div>

          <div className="py-2">
            <Label htmlFor="state">State of Origin</Label>
            <select
              required
              {...register('state')}
              className="block appearance-none w-full h-9 dark:bg-slate-800 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none"
              onChange={handleStateChange}
              value={selectedState}
            >
              <option value="">Select a state</option>
              {Object.keys(localGovernmentAreas)
                .sort()
                .map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
            </select>

            {selectedState && (
              <div className="mt-2">
                <Label htmlFor="lga">Local Government Area</Label>
                <select
                  required
                  {...register('lga')}
                  className="block appearance-none w-full h-9 dark:bg-slate-800 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none"
                  onChange={handleLGAChange}
                  value={selectedLGA}
                >
                  <option value="">Select an LGA</option>
                  {localGovernmentAreas[
                    selectedState as keyof typeof localGovernmentAreas
                  ].map((lga, index) => (
                    <option key={index} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="py-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              required
              id="occupation"
              type="text"
              placeholder="e.g. Engineer"
              {...register('occupation')}
            />
          </div>
          <div className="flex justify-end mt-3">
            <Button type="submit">Next</Button>
          </div>
        </div>
      </form>
    </>
  );
}
