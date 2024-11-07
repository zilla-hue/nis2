import { FileLock } from 'lucide-react';

export const cards = [
  {
    id: 'manage-finance',
    label: 'Manage Finance',
    image: '/finance.jpg',
    description: 'Budgeting, expense tracking, and financial reporting...',
    icon: <FileLock />,
    route: '/admin-screens/finance',
  },
  {
    id: 'manage-events',
    label: 'Manage Event',
    image: '/abstract-blurred-people-seminar-event-background.jpg',
    description: 'Organize and manage events, schedule activities...',
    icon: <FileLock />,
    route: '/admin-screens/events',
  },
  {
    id: 'manage-members',
    label: 'Manage Members',
    image: '/manage-people.svg',
    description: 'Handle member registrations, updates, and communications...',
    icon: <FileLock />,
    route: '/admin-screens/manage-mambers',
  },
  {
    id: 'manage-payments',
    label: 'Manage Payments',
    image: '/finance_icon.jpg',
    description: 'Administer and assign payments to members...',
    icon: <FileLock />,
    route: '/admin-screens/manage-payment',
  },
];
