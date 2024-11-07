'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function Submitbutton({
  title,
  isPending,
  className,
  size,
}: {
  title: string;
  isPending: any;
  className?: string;
  size?: 'default' | 'sm' | 'lg';
}) {
  const buttonId = title.replace(' ', '-').toLowerCase();
  return (
    <>
      {isPending ? (
        <Button disabled size={size}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button
          size={size}
          id={buttonId}
          type="submit"
          disabled={isPending}
          className={className}
        >
          {title}
        </Button>
      )}
    </>
  );
}

export function Navigatebutton({
  title,
  isPending,
  className,
  size,
  link,
}: {
  title: string;
  isPending?: any;
  className?: string;
  size?: 'default' | 'sm' | 'lg';
  link?: string;
}) {
  const buttonId = title.replace(' ', '-').toLowerCase();
  return (
    <>
      {isPending ? (
        <Button disabled size={size}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button
          size={size}
          id={buttonId}
          disabled={isPending}
          className={className}
        >
          <a href={link}>{title}</a>
        </Button>
      )}
    </>
  );
}

// export function BuyButton({ price }: { price: number }) {
//   const { pending } = useFormStatus();

//   return (
//     <>
//       {pending ? (
//         <Button disabled size="lg" className="w-full mt-10">
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Please Wait
//         </Button>
//       ) : (
//         <Button type="submit" size="lg" className="w-full mt-10">
//           Buy for ${price}
//         </Button>
//       )}
//     </>
//   );
// }
