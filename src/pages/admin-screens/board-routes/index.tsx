// Remove the "use client" directive as it's not needed in Vite projects
// import React, { useEffect, useState } from "react";
import { useEffect, useState } from 'react';
import { useSession } from '@/providers/SessionProvider';
// Remove the next/navigation import
// import { useRouter } from "next/navigation";
import AdminMetricCards from './_components/admin-metric-cards';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
// Import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

const AdminBoardRoutes = () => {
  // Replace useRouter with useNavigate
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    // Commenting out authorization checks
    /*
    if (session === null) {
      // Session is still loading
      return;
    }

    const { user } = session;

    if (!user?.id || (user.role === "GUEST" || user.role === "MEMBER")) {
      navigate("/authenticate/sign-in");
    } else {
      setLoading(false);
    }
    */

    // Instead, we'll just set loading to false after a short delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [session, navigate]);

  const handleManageClick = (route: string) => {
    setLoading(true);
    navigate(route);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground mt-20">
        <div className="container mx-auto p-4">
          <Skeleton className="w-64 h-8 mb-6" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="w-40 h-6" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="w-full h-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground mt-20">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Admin Dashboard
        </h1>
        <AdminMetricCards
          loading={loading}
          handleManageClick={handleManageClick}
          isAuthorized={true}
          userId={session?.user?.id || null}
        />
      </div>
    </div>
  );
};

export default AdminBoardRoutes;
