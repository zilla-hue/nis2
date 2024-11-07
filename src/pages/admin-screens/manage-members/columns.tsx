import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import TableActions from './table-actions'; // Correct import
import { GetMembersResponseType } from '@/app/api/members/types';

type memberRow = GetMembersResponseType[0];

// Function to get color based on membership status
const getMembershipStatusColorClass = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return {
        bgColor: 'bg-green-200',
        textColor: 'text-green-800',
        text: 'Active',
      };
    case 'INACTIVE':
      return {
        bgColor: 'bg-red-200',
        textColor: 'text-red-800',
        text: 'Inactive',
      };
    case 'PENDING':
    default:
      return {
        bgColor: 'bg-amber-200',
        textColor: 'text-amber-800',
        text: 'Pending',
      };
  }
};

// Function to get color based on role status
const getRoleStatusColorClass = (status: string) => {
  switch (status) {
    case 'MEMBER':
      return {
        bgColor: 'bg-green-200',
        textColor: 'text-green-800',
        text: 'Member',
      };
    case 'ADMIN':
      return {
        bgColor: 'bg-blue-200',
        textColor: 'text-blue-800',
        text: 'Admin',
      };
    case 'GUEST':
    default:
      return {
        bgColor: 'bg-amber-200',
        textColor: 'text-amber-800',
        text: 'Guest',
      };
  }
};

// Function to get color based on dues paid status
const getDuesPaidColorClass = (isPaid: boolean) => {
  return isPaid
    ? { bgColor: 'bg-green-200', textColor: 'text-green-800', text: 'Paid' }
    : { bgColor: 'bg-red-200', textColor: 'text-red-800', text: 'Unpaid' };
};

// Function to get color based on onboarding status
const getOnboardingStatusColorClass = (isOnboarded: boolean) => {
  return isOnboarded
    ? {
        bgColor: 'bg-green-200',
        textColor: 'text-green-800',
        text: 'Onboarded',
      }
    : {
        bgColor: 'bg-red-200',
        textColor: 'text-red-800',
        text: 'Not Onboarded',
      };
};

export const columns = (
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void
): ColumnDef<memberRow>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'picture',
    header: 'Photo',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <img
          src={row.original.picture ?? '/images/user_placeholder.png'} // Provide a default image path
          alt={`${row.original.first_name} ${row.original.last_name}`}
          className="h-10 w-10 rounded-full"
        />
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => `${row.original.first_name} ${row.original.last_name}`,
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone_number',
    header: 'Mobile Phone',
  },
  {
    accessorKey: 'role',
    header: 'Membership Role',
    cell: ({ row }) => {
      const { bgColor, textColor, text } = getRoleStatusColorClass(
        row.original.role
      );
      return (
        <div
          className={`px-2 py-1 rounded-md text-sm font-medium ${bgColor} ${textColor}`}
        >
          {text}
        </div>
      );
    },
  },
  {
    accessorKey: 'membership_status',
    header: 'Membership Status',
    cell: ({ row }) => {
      const { bgColor, textColor, text } = getMembershipStatusColorClass(
        row.original.membership_status
      );
      return (
        <div
          className={`px-2 py-1 rounded-md text-sm font-medium ${bgColor} ${textColor}`}
        >
          {text}
        </div>
      );
    },
  },
  {
    accessorKey: 'dues_paid',
    header: 'Dues Paid',
    cell: ({ row }) => {
      const { bgColor, textColor, text } = getDuesPaidColorClass(
        row.original.dues_paid
      );
      return (
        <div
          className={`px-2 py-1 rounded-md text-sm font-medium ${bgColor} ${textColor}`}
        >
          {text}
        </div>
      );
    },
  },
  {
    accessorKey: 'isOnboarded',
    header: 'Onboarded',
    cell: ({ row }) => {
      const { bgColor, textColor, text } = getOnboardingStatusColorClass(
        row.original.isOnboarded
      );
      return (
        <div
          className={`px-2 py-1 rounded-md text-sm font-medium ${bgColor} ${textColor}`}
        >
          {text}
        </div>
      );
    },
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <TableActions
        id={row.original.id}
        onEdit={handleEdit}
        onDelete={handleDelete} // Pass the onDelete prop
      />
    ),
  },
];
