// page.tsx

'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addChildAction, updateChildAction } from './action/child.action'; // Import updateChildAction
import { useState } from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { format, formatDate } from 'date-fns';
import { GetChildrenResponseType } from '@/api/children/types';

// Define the query key for the 'children' query
const childrenQueryKey = ['children'];

function Page() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [birth_date, setDateOfBirth] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingChildId, setEditingChildId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate: addChild, isPending: isAddingChild } = useMutation({
    mutationKey: ['addChild'],
    mutationFn: async () =>
      addChildAction({
        first_name,
        last_name,
        birth_date: new Date(birth_date), // Convert the string to a Date object
      }),
    onSuccess: () => {
      toast.success('Your child has been successfully registered');
      setFirstName('');
      setLastName('');
      setDateOfBirth('');
      queryClient.invalidateQueries({ queryKey: childrenQueryKey });
      setIsSheetOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: updateChild, isPending: isEditingChild } = useMutation({
    mutationKey: ['updateChild'],
    mutationFn: async () => {
      if (editingChildId) {
        await updateChildAction({
          id: editingChildId,
          first_name,
          last_name,
          birth_date: new Date(birth_date), // Convert the string to a Date object
        });
      }
    },
    onSuccess: () => {
      toast.success('Child information updated successfully');
      setFirstName('');
      setLastName('');
      setDateOfBirth('');
      queryClient.invalidateQueries({ queryKey: childrenQueryKey });
      setIsSheetOpen(false);
      setIsEdit(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date();
    const selectedDate = new Date(birth_date);
    let age = currentDate.getFullYear() - selectedDate.getFullYear();
    const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
    const dayDiff = currentDate.getDate() - selectedDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age > 17) {
      toast.error('The child must be 17 years old or younger.');
      return;
    }

    if (isEdit) {
      updateChild();
    } else {
      addChild();
    }
  };

  const handleEdit = (id: string) => {
    const child = childrenData?.find((child) => child.id === id);
    if (child) {
      setEditingChildId(id);
      setFirstName(child.first_name);
      setLastName(child.last_name);
      setDateOfBirth(format(new Date(child.birth_date), 'yyyy-MM-dd')); // Set the date as a string in yyyy-MM-dd format
      setIsSheetOpen(true);
      setIsEdit(true);
    }
  };

  const { mutate: bulkDelete, isPending: isDeletingChildren } = useMutation({
    mutationKey: ['bulkDelete'],
    mutationFn: (childIds: string[]) => deleteChildren(childIds),
    onSuccess: (remainingChildren) => {
      toast.success('Children deleted successfully');
      queryClient.setQueryData(childrenQueryKey, remainingChildren);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteChildren = async (childIds: string[]) => {
    const response = await fetch('/api/children', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ childIds }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete children');
    }

    return response.json();
  };

  const {
    data: childrenData,
    error,
    isLoading,
  } = useQuery<GetChildrenResponseType>({
    queryKey: childrenQueryKey,
    queryFn: () =>
      fetch(`/api/children`).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      }),
  });

  const { mutate: deleteChild, isPending: isDeletingChild } = useMutation({
    mutationKey: ['deleteChild'],
    mutationFn: (childId: string) => deleteSingleChild(childId),
    onSuccess: () => {
      toast.success('Child deleted successfully');
      queryClient.invalidateQueries({ queryKey: childrenQueryKey });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteSingleChild = async (childId: string) => {
    const response = await fetch(`/api/children?childId=${childId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete child');
    }

    return response.json();
  };

  const isTableDisabled =
    isLoading ||
    isDeletingChildren ||
    isDeletingChild ||
    isAddingChild ||
    isEditingChild;

  if (isLoading)
    return (
      <div className="w-full pb-10 mt-4">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-w8" />
          </CardHeader>
          <CardContent className="h-[500px] w-full flex items-center justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  if (error) return <div>Error loading children data: {error.message}</div>;

  return (
    <div className="w-full pb-10 mt-16">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Manage Family</CardTitle>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button size={'sm'}>
                <Plus className="size-4 mr-2" />
                {isEdit ? 'Edit Child' : 'Add New'}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{isEdit ? 'Edit Child' : 'Add Child'}</SheetTitle>
                <SheetDescription>
                  {isEdit
                    ? 'Update the details of the child.'
                    : 'Register a child. Note that the family member must be below 18 years old.'}
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      required
                      placeholder="e.g. Adaugo"
                      id="first_name"
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      placeholder="e.g. Anajemba"
                      required
                      id="last_name"
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="birth_date">Birth Date</Label>
                    <Input
                      required
                      id="birth_date"
                      type="date"
                      value={birth_date}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>
                </div>
                <SheetFooter>
                  <Button
                    type="submit"
                    disabled={isAddingChild || isEditingChild}
                  >
                    {isEdit
                      ? isEditingChild
                        ? 'Updating...'
                        : 'Update Child'
                      : isAddingChild
                      ? 'Submitting...'
                      : 'Save Changes'}
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns(handleEdit, deleteChild)}
            data={childrenData ?? []}
            filterKey="first_name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              bulkDelete(ids);
            }}
            onEdit={handleEdit}
            disabled={isTableDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
