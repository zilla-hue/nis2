'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  PlusIcon,
  MapPinIcon,
  CalendarIcon,
  EditIcon,
  TrashIcon,
} from 'lucide-react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

// import { toast } from "sonner";

interface Event {
  id: number;
  title: string;
  date: string;
  venue: string;
  image: string;
}

function EventManager() {
  const [events, setEvents] = useState<Event[]>([
    // ... your initial events ...
  ]);

  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const cld = new Cloudinary({ cloud: { cloudName: 'your-cloud-name' } });

  const handleImageUpload = (error: any, result: any) => {
    if (!error && result && result.event === 'success') {
      setCurrentEvent({ ...currentEvent!, image: result.info.secure_url });
    }
  };

  return (
    // ... your JSX ...
    <div>
      <Label htmlFor="image">Event Image</Label>
      <div className="flex items-center space-x-4">
        <Input
          id="image"
          value={currentEvent?.image || ''}
          onChange={(e) =>
            setCurrentEvent({ ...currentEvent!, image: e.target.value })
          }
          placeholder="Enter image URL"
        />

        <Button type="button" onClick={() => open && open()} disabled={!open}>
          Upload
        </Button>
      </div>
    </div>
    // ... rest of your JSX ...
  );
}

export default EventManager;
