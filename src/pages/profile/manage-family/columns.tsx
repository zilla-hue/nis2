import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import TableActions from "./table-actions"  // Correct import
import { format, differenceInYears, parseISO } from 'date-fns' // Import the format and differenceInYears functions from date-fns
import { GetChildrenResponseType } from "@/app/api/children/types"

type ChildRow = GetChildrenResponseType[0];

// Define a format for the date
const dateFormat = "d MMMM, yyyy";

// Function to calculate age from date of birth
const calculateAge = (birthDate: Date | string): number => {
  // Convert the birthDate to a string if it is a Date object
  const birthDateString = typeof birthDate === 'string' ? birthDate : birthDate.toISOString();

  // Parse the birthDate string to a Date object
  const birthDateParsed = parseISO(birthDateString);

  // Calculate the age difference in years
  return differenceInYears(new Date(), birthDateParsed);
};

// Function to get the color based on the age
const getAgeColorClass = (age: number) => {
  if (age <= 7) return { bgColor: 'bg-green-200', textColor: 'text-green-800', text: 'Young' };  // Light Green
  if (age <= 17) return { bgColor: 'bg-amber-200', textColor: 'text-amber-800', text: 'Teen' };   // Light Amber
  return { bgColor: 'bg-red-200', textColor: 'text-red-800', text: 'Adult' };  // Light Red
};


export const columns = (handleEdit: (id: string) => void, handleDelete: (id: string) => void): ColumnDef<ChildRow>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
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
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "birth_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Birth Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => format(new Date(row.original.birth_date), dateFormat), // Use the format function with dateFormat
  },
  {
    id: "age",
    header: "Age",
    cell: ({ row }) => {
      const birthDateString = row.original.birth_date;
      const age = calculateAge(birthDateString);  // Handle both string and Date object formats
      const { bgColor, textColor, text } = getAgeColorClass(age);
      return (
        <div className={`px-2 py-1 rounded-md text-sm font-medium ${bgColor} ${textColor}`}>
          {age} years - {text}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <TableActions
        id={row.original.id}
        onEdit={handleEdit}
        onDelete={handleDelete} // Pass the onDelete prop
      />
    ),
  }
];
