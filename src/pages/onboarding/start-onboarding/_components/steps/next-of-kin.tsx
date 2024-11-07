'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PersonalDetailsFormValues } from '../constants';
import { useFormState } from '../form-context';

export default function NextOfKin() {
  const { onHandlePrev, onHandleNext, setFormData, formData } = useFormState();
  const { register, handleSubmit } = useForm<PersonalDetailsFormValues>({
    defaultValues: formData,
  });

  function onHandleFormSubmit(data: PersonalDetailsFormValues) {
    setFormData((preFormData) => ({ ...preFormData, ...data }));
    onHandleNext();
  }

  return (
    <>
      <div className="flex justify-end">
        <h1 className=" mt-4 mb-2 items-center font-semibold text-sm">
          NEXT OF KIN (4 of 4)
        </h1>
      </div>
      <form className="space-x-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className="flex flex-col gap-1">
          <div className="py-2">
            <Label htmlFor="nok_first_name">First Name</Label>
            <Input
              required
              id="nok_first_name"
              type="text"
              placeholder="John"
              {...register('nok_first_name')}
            />
          </div>
          <div className="py-2">
            <Label htmlFor="nok_last_name">Last Name</Label>
            <Input
              required
              id="nok_last_name"
              type="text"
              placeholder="Doe"
              {...register('nok_last_name')}
            />
          </div>
          <div className="py-2">
            <Label htmlFor="nok_email">Email</Label>
            <Input
              required
              id="nok_email"
              type="nok_email"
              placeholder="john.doe@email.fake"
              {...register('nok_email')}
            />
          </div>
          <div className="py-2">
            <Label htmlFor="nok_phone">Phone</Label>
            <Input
              required
              id="nok_phone"
              type="text"
              placeholder="07436253698"
              {...register('nok_phone')}
            />
          </div>
          <div className="py-2">
            <Label htmlFor="isMarried">Gender</Label>
            <select
              required
              className="block appearance-none w-full h-9  dark:bg-slate-800 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none"
              {...register('nok_gender')}
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
            <Label htmlFor="nok_nationality">Nationality</Label>
            <Input
              required
              id="nok_nationality"
              type="text"
              placeholder="e.g. Nigerian"
              {...register('nok_nationality')}
            />
          </div>
          <div className="py-2">
            <Label htmlFor="nok_address">Full Address</Label>
            <Textarea
              id="nok_address"
              placeholder="e.g. 25 Tayo Street, Benin City, Nigeria."
              {...register('nok_address')}
            />
          </div>
          <div className="py-2">
            <Label htmlFor="nok_postcode">Postcode or Zip Code</Label>
            <Input
              required
              id="nok_postcode"
              type="text"
              placeholder="e.g. 2538ZY"
              {...register('nok_postcode')}
            />
          </div>

          <div className="flex justify-between mt-3">
            <Button type="button" onClick={onHandlePrev}>
              Prev
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </div>
      </form>
    </>
  );
}
