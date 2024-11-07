'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { ScrollArea } from '../../../components/ui/scroll-area';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '../../../components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../../components/ui/dialog';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import {
  PlusIcon,
  MapPinIcon,
  CalendarIcon,
  EditIcon,
  TrashIcon,
} from 'lucide-react';
import NavBar from '../../../components/sections/header-section';
import Footer from '../../../components/sections/footer-section';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { toast } from 'sonner';

interface Event {
  id: number;
  title: string;
  date: string;
  venue: string;
  image: string;
}

function EventManager() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Summer Music Festival',
      date: '2023-07-15',
      venue: 'Central Park',
      image: '/placeholder.svg?height=400&width=400',
    },
    {
      id: 2,
      title: 'Tech Conference 2023',
      date: '2023-08-22',
      venue: 'Convention Center',
      image: '/placeholder.svg?height=400&width=400',
    },
    {
      id: 3,
      title: 'Food & Wine Expo',
      date: '2023-09-10',
      venue: 'City Hall',
      image: '/placeholder.svg?height=400&width=400',
    },
  ]);

  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      currentEvent &&
      currentEvent.title &&
      currentEvent.date &&
      currentEvent.venue
    ) {
      if (currentEvent.id) {
        // Update existing event
        setEvents(
          events.map((event) =>
            event.id === currentEvent.id ? currentEvent : event
          )
        );
      } else {
        // Add new event
        setEvents([
          ...events,
          {
            ...currentEvent,
            id: events.length + 1,
            image:
              currentEvent.image || '/placeholder.svg?height=400&width=400',
          },
        ]);
      }
      setIsEventDialogOpen(false);
      setCurrentEvent(null);
      toast.success(
        currentEvent.id
          ? 'Event updated successfully'
          : 'Event added successfully'
      );
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleDeleteEvent = () => {
    if (currentEvent) {
      setEvents(events.filter((event) => event.id !== currentEvent.id));
      setIsDeleteDialogOpen(false);
      setCurrentEvent(null);
    }
  };

  const handleImageUpload = (result: any) => {
    const info = result.info as CloudinaryUploadWidgetInfo;
    setCurrentEvent({ ...currentEvent!, image: info.secure_url });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        {' '}
        {/* Added mt-16 for top margin */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Event Manager</h1>
            <Button
              size="sm"
              onClick={() => {
                setCurrentEvent({
                  id: 0,
                  title: '',
                  date: '',
                  venue: '',
                  image: '',
                });
                setIsEventDialogOpen(true);
              }}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Add Event</span>
            </Button>
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={event.image} alt={event.title} />
                          <AvatarFallback>
                            {event.title.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <h2 className="text-lg font-semibold line-clamp-1">
                            {event.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(event.date), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setCurrentEvent(event);
                            setIsEventDialogOpen(true);
                          }}
                        >
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setCurrentEvent(event);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  </CardContent>
                  <CardFooter className="p-4 flex flex-col items-start">
                    <p className="text-sm flex items-center mb-2">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                    </p>
                    <p className="text-sm flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      {event.venue}
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEvent?.id ? 'Edit Event' : 'Add New Event'}
            </DialogTitle>
            <DialogDescription>
              {currentEvent?.id
                ? 'Edit the details of the event.'
                : 'Fill in the details for the new event.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEventSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={currentEvent?.title || ''}
                onChange={(e) =>
                  setCurrentEvent({ ...currentEvent!, title: e.target.value })
                }
                placeholder="Enter event title"
              />
            </div>
            <div>
              <Label htmlFor="date">Event Date</Label>
              <Input
                id="date"
                type="date"
                value={currentEvent?.date || ''}
                onChange={(e) =>
                  setCurrentEvent({ ...currentEvent!, date: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                value={currentEvent?.venue || ''}
                onChange={(e) =>
                  setCurrentEvent({ ...currentEvent!, venue: e.target.value })
                }
                placeholder="Enter venue"
              />
            </div>
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
                <CldUploadWidget
                  signatureEndpoint="/api/sign-image"
                  onSuccess={(result) => handleImageUpload(result)}
                >
                  {({ open }) => (
                    <Button
                      type="button"
                      onClick={() => open && open()}
                      disabled={!open}
                    >
                      Upload
                    </Button>
                  )}
                </CldUploadWidget>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {currentEvent?.id ? 'Update Event' : 'Add Event'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

export default function EventManagerPage() {
  return <EventManager />;
}
