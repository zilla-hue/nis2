import { useState } from 'react';
import { FormProvider } from './form-context';
import { FormStep } from './form-step';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface User {
  // Define user properties here
}

const OnboardingClient = ({ user }: { user: User }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5; // Assuming there are 5 steps in total

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Welcome, {(user as any)?.first_name ?? ''}{' '}
          {(user as any)?.last_name ?? ''}!
        </h2>
        <p className="text-muted-foreground">
          Let&apos;s get you set up. Please complete the following steps.
        </p>
      </div>
      <div className="mb-6">
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <FormProvider>
            <FormStep />
          </FormProvider>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          onClick={() =>
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
          }
          disabled={currentStep === totalSteps}
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default OnboardingClient;
