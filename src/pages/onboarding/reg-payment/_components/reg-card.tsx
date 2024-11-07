"use client";
import { BadgePoundSterling, DollarSign, PoundSterling } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn, penceToPounds } from "@/lib/utils";
import { createCheckoutSessionAction } from "../[id]/actions";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegCard = ({ product }: { product: Dues }) => {
  const navigate = useNavigate();

  const { mutate: createCheckoutSession, isPending } = useMutation({
    mutationKey: ["createCheckoutSession"],
    mutationFn: createCheckoutSessionAction,
    onSuccess: ({ url }) => {
      if (url) navigate(url);
      else throw new Error("Error creating checkout session.Please try again later");
    },
    onError: (error) => {
      toast("Something went wrong. Please try again later.",);
    },
  });

  const handleBuyProduct = async () => {
    // call our mutation
    createCheckoutSession({ regId: product.id});
  };



  return (
    <Card className='flex flex-col items-center mt-4'>
      <CardHeader className='px-2 flex flex-col items-center space-y-2 pb-2'>
        <CardTitle className='text-lg font-medium text-center'>{product.name}</CardTitle>
        <div className='flex items-center'>
          <PoundSterling className='inline h-3 w-3 text-muted-foreground' />
          <span className='text-sm ml-1'>{penceToPounds(product.price)}</span>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col flex-1 justify-center'>
        <Button
          className='mt-5 px-5 py-2 rounded-md'
          disabled={isPending}
          size={"sm"}
          onClick={handleBuyProduct}
        >
          {isPending ? "Processing..." : "Register"}
        </Button>
      </CardContent>
    </Card>
  );
};
export default RegCard;
