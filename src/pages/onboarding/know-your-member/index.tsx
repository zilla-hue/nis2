"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  User,
  Briefcase,
  Book,
  Music,
  Film,
  Heart,
  Coffee,
} from "lucide-react";
import { motion } from "framer-motion";

interface MemberInfo {
  name: string;
  avatar: string;
  role: string;
  joinDate: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  interests: string[];
  recentActivities: {
    type: string;
    description: string;
    date: string;
  }[];
}

const dummyMember: MemberInfo = {
  name: "Jane Doe",
  avatar: "/placeholder.svg?height=100&width=100",
  role: "Community Manager",
  joinDate: "2022-05-15",
  location: "New York, NY",
  email: "jane.doe@example.com",
  phone: "+1 (555) 123-4567",
  bio: "Passionate about building strong communities and fostering meaningful connections. I love to organize events and bring people together.",
  interests: ["Reading", "Hiking", "Photography", "Cooking", "Volunteering"],
  recentActivities: [
    {
      type: "Event",
      description: "Organized community book club meeting",
      date: "2023-06-01",
    },
    {
      type: "Forum",
      description: "Started discussion on sustainable living",
      date: "2023-05-28",
    },
    {
      type: "Project",
      description: "Launched community garden initiative",
      date: "2023-05-20",
    },
  ],
};

const KnowYourMemberPage: React.FC = () => {
  const [member, setMember] = useState<MemberInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demonstration, we'll use the dummy data
        // In a real app, you'd fetch the user data here
        setMember(dummyMember);
        
        // Simulating the redirect condition
        // In a real app, you'd check the user's status here
        // if (user?.know_your_member) {
        //   router.push("/onboarding/start-onboarding");
        //   return;
        // }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        {error}
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex justify-center items-center h-screen">
        No member data available.
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-primary mb-8 mt-20">
        Know Your Members
      </h1>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
            >
              <Avatar className="w-24 h-24 ring-2 ring-primary ring-offset-2">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left space-y-2">
                <CardTitle className="text-3xl font-bold text-primary">
                  {member.name}
                </CardTitle>
                <CardDescription className="text-lg font-medium">
                  {member.role}
                </CardDescription>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <Badge variant="secondary" className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" /> Joined{" "}
                    {member.joinDate}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" /> {member.location}
                  </Badge>
                </div>
              </div>
            </motion.div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="interests">Interests</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">
                      About {member.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center bg-secondary/10 p-3 rounded-md">
                      <Mail className="w-5 h-5 mr-2 text-primary" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center bg-secondary/10 p-3 rounded-md">
                      <Phone className="w-5 h-5 mr-2 text-primary" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              <TabsContent value="interests">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {member.name}&apos;s Interests
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {member.interests.map((interest, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge
                          variant="outline"
                          className="flex items-center px-3 py-2 text-sm"
                        >
                          {getInterestIcon(interest)}
                          <span className="ml-2">{interest}</span>
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
              <TabsContent value="activities">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    Recent Activities
                  </h3>
                  <ul className="space-y-4">
                    {member.recentActivities.map((activity, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start bg-secondary/5 p-4 rounded-md"
                      >
                        <Badge variant="outline" className="mr-3 flex-shrink-0">
                          {activity.type}
                        </Badge>
                        <div>
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {activity.date}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">
              <User className="w-4 h-4 mr-2" />
              Connect with {member.name.split(" ")[0]}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

function getInterestIcon(interest: string) {
  const icons = {
    Reading: <Book className="w-4 h-4" />,
    Music: <Music className="w-4 h-4" />,
    Film: <Film className="w-4 h-4" />,
    Cooking: <Coffee className="w-4 h-4" />,
    Volunteering: <Heart className="w-4 h-4" />,
  };
  return (
    icons[interest as keyof typeof icons] || <Briefcase className="w-4 h-4" />
  );
}

export default KnowYourMemberPage;