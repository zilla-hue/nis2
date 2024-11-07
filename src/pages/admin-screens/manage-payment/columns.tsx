import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { PoundSterling } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import TableActions from './table-actions';
import { GetDuesResponseType } from '@/app/api/dues/types';
import { penceToPounds } from '@/lib/utils';

type DuesRow = GetDuesResponseType[0];

export const columns = (
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void
): ColumnDef<DuesRow>[] => [
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
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Price
        <PoundSterling className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => penceToPounds(row.original.price), // Format price as decimal
  },
  {
    accessorKey: 'isArchived',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`text-sm font-medium ${
          row.original.isArchived ? 'text-red-500' : 'text-green-500'
        }`}
      >
        {row.original.isArchived ? 'Archived' : 'Live'}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <TableActions
        id={row.original.id}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
  },
];
