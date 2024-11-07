'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AdminMetricCards from './admin-metric-cards';

async function MetricCards() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleManageClick = async (href: string) => {
    setLoading(true);
    try {
      router.push(href); // Wait for navigation to complete
    } catch (error: any) {
      toast.error('Error navigating:', error);
    } finally {
      setLoading(false); // Set loading back to false regardless of success or error
    }
  };

  return (
    <div>
      <AdminMetricCards
        loading={loading}
        handleManageClick={handleManageClick}
        isAuthorized={false}
        userId={null}
      />
    </div>
  );
}

export default MetricCards;
