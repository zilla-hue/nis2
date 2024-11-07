'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import {
  getUserProfileAction,
  updateUserProfileAction,
} from '../_actions/actions';
import { toast } from 'sonner';
import {
  searchUsersAction,
  sendSpouseRequestAction,
  getPendingSpouseRequestsAction,
  acceptSpouseRequestAction,
  unlinkSpouseAction,
  getSpouseDetailsAction,
} from '../_actions/spouse.actions';
import {
  SearchResult,
  SpouseRequest,
  UpdateUserProfileParams,
} from '@/app/api/sign-image/types';
import { Skeleton } from '@/components/ui/skeleton';

interface UpdateProfileFormProps {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({ user }) => {
  const [profileData, setProfileData] = useState<UpdateUserProfileParams>({
    image: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    occupation: '',
    marital_status: '',
    nationality: '',
    email: '',
  });

  const [spouseData, setSpouseData] = useState({
    mediaUrl: '',
    name: '',
    email: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedSpouseId, setSelectedSpouseId] = useState<string | null>(null);
  const [pendingRequests, setPendingRequests] = useState<SpouseRequest[]>([]);

  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfileAction,
  });

  const { data: spouseProfile, refetch: refetchSpouseProfile } = useQuery({
    queryKey: ['spouseProfile', userProfile?.id],
    queryFn: () => getSpouseDetailsAction(userProfile?.id || ''),
    enabled: !!userProfile?.id,
  });

  const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: updateUserProfileAction,
    onSuccess: () => toast.success('Profile updated successfully'),
    onError: (error) => toast.error(error.message),
  });

  const { mutate: sendSpouseRequest, isPending: isSendingRequest } =
    useMutation({
      mutationKey: ['sendSpouseRequest'],
      mutationFn: ({ receiverId }: { receiverId: string }) =>
        sendSpouseRequestAction(userProfile?.id || '', receiverId),
      onSuccess: () => {
        toast.success('Spouse request sent successfully');
        setSearchQuery('');
        setSearchResults([]);
        setSelectedSpouseId(null);
      },
      onError: (error) => toast.error(error.message),
    });

  const { data: pendingSpouseRequests, refetch: refetchPendingRequests } =
    useQuery({
      queryKey: ['pendingSpouseRequests'],
      queryFn: () => getPendingSpouseRequestsAction(userProfile?.id || ''),
      enabled: !!userProfile?.id,
    });

  const { mutate: acceptRequest } = useMutation({
    mutationKey: ['acceptRequest'],
    mutationFn: acceptSpouseRequestAction,
    onSuccess: () => {
      toast.success('Spouse request accepted');
      refetchPendingRequests();
      refetchSpouseProfile();
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: unlinkSpouse, isPending: isUnlinkingSpouse } = useMutation({
    mutationKey: ['unlinkSpouse'],
    mutationFn: (userId: string) => unlinkSpouseAction(userId),
    onSuccess: () => {
      toast.success('Spouse unlinked successfully');
      refetchSpouseProfile();
    },
    onError: (error) => toast.error(error.message),
  });

  useEffect(() => {
    if (userProfile) {
      setProfileData({
        image: userProfile.picture || '/user-placeholder.png',
        first_name: userProfile.first_name || '',
        last_name: userProfile.last_name || '',
        phone: userProfile.phone_number || '',
        address: userProfile.address || '',
        occupation: userProfile.occupation || '',
        marital_status: userProfile.marital_status || '',
        nationality: userProfile.nationality || '',
        email: userProfile.email || '',
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (spouseProfile) {
      setSpouseData({
        mediaUrl: spouseProfile.image || '/user-placeholder.png',
        name: spouseProfile.name || '',
        email: spouseProfile.email || '',
      });
    }
  }, [spouseProfile]);

  useEffect(() => {
    if (pendingSpouseRequests) {
      setPendingRequests(pendingSpouseRequests);
    }
  }, [pendingSpouseRequests]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile(profileData);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    try {
      const results = await searchUsersAction(query);
      setSearchResults(results);
    } catch (error) {
      toast.error('Failed to search for users');
    }
  };

  const handleSendRequest = () => {
    if (selectedSpouseId) {
      sendSpouseRequest({ receiverId: selectedSpouseId });
    } else {
      toast.error('Please select a user to send a request');
    }
  };

  const handleUnlinkSpouse = () => {
    if (userProfile?.id) {
      unlinkSpouse(userProfile.id);
    }
  };

  const nameInitials = `${profileData.first_name[0] || ''}${
    profileData.last_name[0] || ''
  }`;
  const spouseNameInitials = spouseData.name.split(' ')[0][0] || '';

  return (
    <div className="px-4 py-8 md:py-12 lg:py-16 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground p-6">
              <CardTitle className="text-3xl font-bold text-center">
                Update Profile
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              {isLoadingProfile ? (
                <div className="space-y-4">
                  <Skeleton className="w-24 h-24 rounded-full mx-auto" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="flex justify-center mb-6">
                    <Avatar className="w-32 h-32">
                      <AvatarImage
                        src={profileData.image}
                        alt={`${profileData.first_name} ${profileData.last_name}`}
                      />
                      <AvatarFallback>{nameInitials}</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        value={profileData.first_name}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        value={profileData.last_name}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            disabled
                            className="mt-1"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">
                            For security reasons, your phone number cannot be
                            changed.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        name="occupation"
                        value={profileData.occupation}
                        onChange={handleInputChange}
                        placeholder="Enter your occupation"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="marital_status">Marital Status</Label>
                      <Input
                        id="marital_status"
                        name="marital_status"
                        value={profileData.marital_status}
                        onChange={handleInputChange}
                        placeholder="Enter your marital status"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      value={profileData.nationality}
                      onChange={handleInputChange}
                      placeholder="Enter your nationality"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="email"
                            name="email"
                            value={profileData.email}
                            disabled
                            className="mt-1"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">
                            For security reasons, your email cannot be changed.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div>
                    <Label htmlFor="picture">Profile Picture</Label>
                    <CldUploadWidget
                      signatureEndpoint="/api/sign-image"
                      onSuccess={(result: any) => {
                        setProfileData((prev) => ({
                          ...prev,
                          mediaUrl: result.info.secure_url,
                        }));
                      }}
                    >
                      {({ open }) => (
                        <Button
                          onClick={() => open()}
                          variant="outline"
                          type="button"
                          className="w-full mt-2"
                        >
                          Change Image
                        </Button>
                      )}
                    </CldUploadWidget>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2 rounded-md transition-colors"
                    >
                      {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground p-6">
              <CardTitle className="text-3xl font-bold text-center">
                Spouse Details
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <div className="mb-8">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      src={spouseData.mediaUrl}
                      alt={spouseData.name}
                    />
                    <AvatarFallback>{spouseNameInitials}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Spouse Name</Label>
                    <Input value={spouseData.name} readOnly className="mt-1" />
                  </div>
                  <div>
                    <Label>Spouse Email</Label>
                    <Input value={spouseData.email} readOnly className="mt-1" />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Search Users</h3>
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search for users"
                  className="mb-4"
                />
                {searchResults.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {searchResults.map((user) => (
                      <li
                        key={user.id}
                        className={`flex justify-between items-center p-3 rounded-md transition-colors ${
                          selectedSpouseId === user.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/80'
                        }`}
                      >
                        <span>
                          {user.first_name} {user.last_name}
                        </span>
                        <Button
                          onClick={() => setSelectedSpouseId(user.id)}
                          variant={
                            selectedSpouseId === user.id
                              ? 'secondary'
                              : 'outline'
                          }
                          size="sm"
                        >
                          {selectedSpouseId === user.id ? 'Selected' : 'Select'}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
                {searchResults.length === 0 && searchQuery && (
                  <p className="text-muted-foreground mb-4">No users found</p>
                )}
                <Button
                  onClick={handleSendRequest}
                  disabled={isSendingRequest || !selectedSpouseId}
                  className="w-full"
                >
                  {isSendingRequest
                    ? 'Sending Request...'
                    : 'Send Spouse Request'}
                </Button>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  Pending Spouse Requests
                </h3>
                {pendingRequests.length > 0 ? (
                  <ul className="space-y-2">
                    {pendingRequests.map((request) => (
                      <li
                        key={request.id}
                        className="flex justify-between items-center p-3 bg-secondary rounded-md"
                      >
                        <span>
                          {request.sender.first_name} {request.sender.last_name}
                        </span>
                        <Button
                          onClick={() => acceptRequest(request.id)}
                          variant="outline"
                          size="sm"
                        >
                          Accept
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No pending requests</p>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleUnlinkSpouse}
                  disabled={isUnlinkingSpouse || !spouseData.name}
                  variant="destructive"
                >
                  {isUnlinkingSpouse ? 'Unlinking...' : 'Unlink Spouse'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateProfileForm;
