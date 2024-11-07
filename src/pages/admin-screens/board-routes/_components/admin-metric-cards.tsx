'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileLock, Loader2, NetworkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { cards } from './constants';
import { useMediaQuery } from 'react-responsive';

interface Props {
  loading: boolean;
  handleManageClick: (route: string) => void;
  isAuthorized: boolean;
  userId: string | null;
}

const AdminMetricCards: React.FC<Props> = ({
  loading,
  handleManageClick,
  isAuthorized,
  userId,
}) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Commenting out authorization check
  // if (!isAuthorized) {
  //   return null; // or a loading spinner
  // }

  const updatedCards = [
    ...cards,
    {
      id: 'organogram',
      label: 'Organogram',
      description: 'Manage organizational structure',
      image: '/images/organogram.jpg', // You'll need to add an appropriate image
      route: '/admin-screens/organogram',
      icon: NetworkIcon,
    },
  ];

  return (
    <TooltipProvider>
      <div className="flex items-center justify-center min-h-screen p-4 bg-background">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl w-full">
          {updatedCards.map((card, index) => (
            <motion.div
              key={card.id}
              // variants={cardVariants}
              // initial="hidden"
              // animate="visible"
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="w-full"
            >
              <Card
                className={`h-full transition-all duration-300 hover:shadow-lg`}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {card.label}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="relative h-48 overflow-hidden rounded-md">
                    <img
                      src={card.image}
                      alt={card.id}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end p-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={loading ? 'outline' : 'default'}
                        size={isSmallScreen ? 'sm' : 'default'}
                        onClick={() => handleManageClick(card.route)}
                        disabled={loading /* || !userId */} // Commenting out userId check
                        className="transition-all duration-300 hover:bg-primary/90"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please Wait
                          </>
                        ) : (
                          'Manage'
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {loading ? 'Please wait...' : card.label}
                    </TooltipContent>
                  </Tooltip>
                </CardFooter>
              </Card>
              {/* Commenting out the userId check
              {!userId && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/75 rounded-md">
                  <FileLock size={48} className="text-muted-foreground animate-pulse" />
                </div>
              )}
              */}
            </motion.div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AdminMetricCards;
