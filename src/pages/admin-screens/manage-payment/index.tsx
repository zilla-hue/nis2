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
import { addDuesAction, updateDuesAction } from './action/payment.action';
import { useState } from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/table/data-table';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { GetDuesResponseType } from '@/app/api/dues/types';
import { Switch } from '@/components/ui/switch';

// Define the query key for the 'dues' query
const duesQueryKey = ['dues'];

function Page() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isArchived, setIsArchived] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [editingDuesId, setEditingDuesId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate: addDues, isPending: isAddingDues } = useMutation({
    mutationKey: ['addDues'],
    mutationFn: async () =>
      addDuesAction({
        name,
        price,
      }),
    onSuccess: () => {
      toast.success('Your child has been successfully registered');
      setName('');
      setPrice('');
      setIsArchived(false); // Reset state
      queryClient.invalidateQueries({ queryKey: duesQueryKey });
      setIsSheetOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: updateDues, isPending: isEditingDues } = useMutation({
    mutationKey: ['updateDues'],
    mutationFn: async () => {
      if (editingDuesId) {
        await updateDuesAction({
          id: editingDuesId,
          name,
          price,
          isArchived,
        });
      }
    },
    onSuccess: () => {
      toast.success('Dues information updated successfully');
      setName('');
      setPrice('');
      queryClient.invalidateQueries({ queryKey: duesQueryKey });
      setIsSheetOpen(false);
      setIsEdit(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      updateDues();
    } else {
      addDues();
    }
  };

  const handleEdit = (id: string) => {
    const dues = duesData?.find((dues) => dues.id === id);
    if (dues) {
      setEditingDuesId(id);
      setName(dues.name);
      setPrice(String(dues.price));
      setIsArchived(dues.isArchived);
      setIsSheetOpen(true);
      setIsEdit(true);
    }
  };

  const { mutate: bulkDelete, isPending: isDeletingDues } = useMutation({
    mutationKey: ['bulkDelete'],
    mutationFn: (duesIds: string[]) => deleteDues(duesIds),
    onSuccess: (remainingDues) => {
      toast.success('Dues deleted successfully');
      queryClient.setQueryData(duesQueryKey, remainingDues);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteDues = async (duesIds: string[]) => {
    const response = await fetch('/api/dues', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ duesIds }), // Ensure correct key here
    });

    if (!response.ok) {
      throw new Error('Failed to delete dues');
    }

    return response.json();
  };

  const {
    data: duesData,
    error,
    isLoading,
  } = useQuery<GetDuesResponseType>({
    queryKey: duesQueryKey,
    queryFn: () =>
      fetch(`/api/dues`).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      }),
  });

  const { mutate: deleteDue, isPending: isDeletingDue } = useMutation({
    mutationKey: ['deleteDue'],
    mutationFn: (duesId: string) => deleteSingleDue(duesId),
    onSuccess: () => {
      toast.success('Due deleted successfully');
      queryClient.invalidateQueries({ queryKey: duesQueryKey });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteSingleDue = async (duesId: string) => {
    const response = await fetch(`/api/dues?duesId=${duesId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete due');
    }

    return response.json();
  };

  const handleSingleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this due?')) {
      deleteDue(id);
    }
  };

  const isTableDisabled =
    isLoading ||
    isDeletingDues ||
    isDeletingDue ||
    isAddingDues ||
    isEditingDues;

  if (isLoading)
    return (
      <div className="container mx-auto py-10 mt-16">
        <Card className="border-none shadow-md">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="h-[500px] w-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto py-10 mt-16">
        Error loading payment data: {error.message}
      </div>
    );

  return (
    <div className="container mx-auto py-10 mt-16">
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <CardTitle className="text-2xl font-bold">Manage Payment</CardTitle>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button size="sm" className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                {isEdit ? 'Edit Payment' : 'Add New Payment'}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  {isEdit ? 'Edit Payment' : 'Add Payment'}
                </SheetTitle>
                <SheetDescription>
                  {isEdit
                    ? 'Update the membership payment setup details.'
                    : 'Register a new payment for members.'}
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      required
                      placeholder="e.g. Registration fees"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      placeholder="e.g. 20.99"
                      type="number"
                      required
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isArchived">
                      {isArchived ? 'Archived' : 'Live'}
                    </Label>
                    <Switch
                      id="isArchived"
                      checked={isArchived}
                      onCheckedChange={setIsArchived}
                    />
                  </div>
                </div>
                <SheetFooter>
                  <Button
                    type="submit"
                    disabled={isAddingDues || isEditingDues}
                    className="w-full"
                  >
                    {isEdit
                      ? isEditingDues
                        ? 'Updating...'
                        : 'Update Payment'
                      : isAddingDues
                      ? 'Submitting...'
                      : 'Save Payment'}
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns(handleEdit, handleSingleDelete)}
            data={duesData ?? []}
            filterKey="name"
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
