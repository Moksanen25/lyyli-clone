import type { Metadata } from 'next';
import MonitoringDashboard from '@/components/admin/MonitoringDashboard';

export const metadata: Metadata = {
  title: 'Error Monitoring Dashboard',
  description: 'Real-time monitoring of 4xx and 5xx errors',
  robots: 'noindex, nofollow',
};

export default function MonitoringPage() {
  return <MonitoringDashboard />;
}
