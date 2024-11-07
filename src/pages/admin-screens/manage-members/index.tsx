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
import { useState } from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { updateMemberAction } from './_actions/members.actions';
// import { MS, Role } from "@prisma/client";
import { GetMembersResponseType } from '@/client/src/api/members/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Define the query key for the 'members' query
const membersQueryKey = ['member'];

function ManageMembersPage() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [birth_date, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [role, setRole] = useState<Role>(Role.GUEST);
  const [membership_status, setMembershipStatus] = useState<MS>(MS.PENDING);
  const [dues_paid, setDuesPaid] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [middle_name, setMiddleName] = useState('');
  const [picture, setPicture] = useState('');
  const [address, setAddress] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate: updateMember, isPending: isEditingMember } = useMutation({
    mutationKey: ['updateMember'],
    mutationFn: async () => {
      if (editingMemberId) {
        await updateMemberAction({
          id: editingMemberId,
          first_name,
          last_name,
          birth_date: new Date(birth_date), // Convert the string to a Date object
          email,
          phone_number,
          role,
          membership_status,
          dues_paid,
          isSubscribed,
          isOnboarded,
          middle_name,
          picture,
          address,
          customerId,
          updatedBy,
        });
      }
    },
    onSuccess: () => {
      toast.success('Member information updated successfully');
      resetForm();
      queryClient.invalidateQueries({ queryKey: membersQueryKey });
      setIsSheetOpen(false);
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

    if (age < 18) {
      toast.error('The member must be 18 years old');
      return;
    }

    updateMember();
  };

  const handleEdit = (id: string) => {
    const member = membersData?.find(
      (member: GetMembersResponseType[number]) => member.id === id
    );
    if (member) {
      setEditingMemberId(id);
      setFirstName(member.first_name);
      setLastName(member.last_name);
      setDateOfBirth(
        format(new Date(member.birth_date || new Date()), 'yyyy-MM-dd')
      ); // Handle null case
      setEmail(member.email || '');
      setPhoneNumber(member.phone_number || '');
      setRole(member.role || Role.GUEST);
      setMembershipStatus(member.membership_status || MS.PENDING);
      setDuesPaid(member.dues_paid || false);
      setIsSubscribed(member.isSubscribed || false);
      setIsOnboarded(member.isOnboarded || false);
      setMiddleName(member.middle_name || '');
      setPicture(member.picture || '');
      setAddress(member.address || '');
      setCustomerId(member.customerId || '');
      setUpdatedBy(member.updatedBy || '');
      setIsSheetOpen(true);
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setDateOfBirth('');
    setEmail('');
    setPhoneNumber('');
    setRole(Role.GUEST);
    setMembershipStatus(MS.PENDING);
    setDuesPaid(false);
    setIsSubscribed(false);
    setIsOnboarded(false);
    setMiddleName('');
    setPicture('');
    setAddress('');
    setCustomerId('');
    setUpdatedBy('');
  };

  const { mutate: bulkDelete, isPending: isDeletingMembers } = useMutation({
    mutationKey: ['bulkDelete'],
    mutationFn: (memberIds: string[]) => deleteMembers(memberIds),
    onSuccess: (remainingMembers) => {
      toast.success('Members deleted successfully');
      queryClient.setQueryData(membersQueryKey, remainingMembers);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMembers = async (memberIds: string[]) => {
    const response = await fetch('/api/members', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ memberIds }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete members');
    }

    return response.json();
  };

  const {
    data: membersData,
    error,
    isLoading,
  } = useQuery<GetMembersResponseType>({
    queryKey: membersQueryKey,
    queryFn: () =>
      fetch(`/api/members`).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      }),
  });

  const { mutate: deleteMember, isPending: isDeletingMember } = useMutation({
    mutationKey: ['deleteMember'],
    mutationFn: (memberId: string) => deleteSingleMember(memberId),
    onSuccess: () => {
      toast.success('Member deleted successfully');
      queryClient.invalidateQueries({ queryKey: membersQueryKey });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteSingleMember = async (memberId: string) => {
    const response = await fetch(`/api/members?memberId=${memberId}`, {
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
    isLoading || isDeletingMembers || isDeletingMember || isEditingMember;

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

  if (error) return <div>Error loading members data: {error.message}</div>;

  if (!membersData || membersData.length === 0)
    return (
      <div className="w-full pb-10 mt-4">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              Manage Members
            </CardTitle>
            <Button size={'sm'} onClick={() => setIsSheetOpen(true)}>
              <Plus className="size-4 mr-2" />
              {'Add Member'}
            </Button>
          </CardHeader>
          <CardContent className="h-[500px] w-full flex items-center justify-center">
            <p>No members found. Please add a member.</p>
          </CardContent>
        </Card>
      </div>
    );

  // Ensure all birth_date values are Date objects
  const transformedMembersData = membersData.map(
    (member: GetMembersResponseType[number]) => ({
      id: member.id,
      first_name: member.first_name,
      last_name: member.last_name,
      email: member.email,
      birth_date: member.birth_date
        ? new Date(member.birth_date).toISOString()
        : null,
      // Add other properties as needed
    })
  );

  return (
    <div className="w-full pb-10 mt-16">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Manage Members</CardTitle>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{'Edit Member'}</SheetTitle>
                <SheetDescription>
                  {'Update the details of the member.'}
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
                    <Label htmlFor="email">Email</Label>
                    <Input
                      required
                      placeholder="e.g. adaugo@email.fake"
                      id="email"
                      value={email}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input
                      required
                      placeholder="e.g. 07491275689"
                      id="phone_number"
                      value={phone_number}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="role">Membership Role</Label>
                    <Select
                      value={role}
                      onValueChange={(value) => setRole(value as Role)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          <SelectItem value={Role.GUEST}>Guest</SelectItem>
                          <SelectItem value={Role.MEMBER}>Member</SelectItem>
                          <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                          <SelectItem value={Role.SUPER_ADMIN}>
                            Super Admin
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="membership_status">Membership Status</Label>
                    <Select
                      value={membership_status}
                      onValueChange={(value) =>
                        setMembershipStatus(value as MS)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Membership Status</SelectLabel>
                          <SelectItem value={MS.PENDING}>Pending</SelectItem>
                          <SelectItem value={MS.ACTIVE}>Active</SelectItem>
                          <SelectItem value={MS.INACTIVE}>Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit" disabled={isEditingMember}>
                    {isEditingMember ? 'Updating...' : 'Update Member'}
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns(handleEdit, deleteMember)}
            data={transformedMembersData ?? []}
            filterKey="email"
            onDelete={(row: { original: { id: string } }[]) => {
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

export default ManageMembersPage;
