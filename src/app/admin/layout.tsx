// Updated 2024-12-19: Created protected admin layout with authentication requirement

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { validateAdminSession } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin-session')?.value;
  
  if (!sessionCookie || !validateAdminSession(sessionCookie)) {
    // Redirect to admin login if not authenticated
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Admin User</span>
              <form action="/admin/logout" method="POST" className="ml-4">
                <button
                  type="submit"
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}
