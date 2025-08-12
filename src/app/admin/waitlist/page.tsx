"use client";

import { useState, useEffect } from 'react';

interface WaitlistSubmission {
  id: number;
  email: string;
  company: string;
  role: string;
  phone?: string;
  countryCode?: string;
  organizationSize: string;
  gdprConsent: boolean;
  securityConsent: boolean;
  timestamp: string;
  source: string;
}

export default function AdminWaitlistPage() {
  const [submissions, setSubmissions] = useState<WaitlistSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple authentication (in production, use proper auth system)
  const handleAuth = () => {
    // This is a basic example - in production, use proper authentication
    if (password === 'lyyli-admin-2024') {
      setIsAuthenticated(true);
      localStorage.setItem('admin-auth', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/waitlist');
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        setSubmissions(data.submissions || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [isAuthenticated]);

  const exportToCSV = () => {
    if (submissions.length === 0) {
      alert('No submissions to export');
      return;
    }

    const csvContent = [
      ['ID', 'Email', 'Company', 'Role', 'Phone', 'Country Code', 'Organization Size', 'GDPR Consent', 'Security Consent', 'Timestamp', 'Source'],
      ...submissions.map(sub => [
        sub.id,
        sub.email,
        sub.company,
        sub.role,
        sub.phone || '',
        sub.countryCode || '',
        sub.organizationSize,
        sub.gdprConsent ? 'Yes' : 'No',
        sub.securityConsent ? 'Yes' : 'No',
        new Date(sub.timestamp).toLocaleString(),
        sub.source
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-forest mb-6">
            Admin Access
          </h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
            />
            <button
              onClick={handleAuth}
              className="w-full bg-forest text-white py-2 px-4 rounded-lg hover:bg-forest/90 transition-colors"
            >
              Access Admin Panel
            </button>
          </div>
          <p className="text-sm text-gray-600 text-center mt-4">
            Contact system administrator for access
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-forest text-white px-4 py-2 rounded-lg hover:bg-forest/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-forest">
              Waitlist Submissions
            </h1>
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="bg-turquoise text-white px-4 py-2 rounded-lg hover:bg-turquoise/90 transition-colors"
              >
                Export to CSV
              </button>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  localStorage.removeItem('admin-auth');
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              Total submissions: <span className="font-bold">{submissions.length}</span>
            </p>
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No submissions yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Org Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      GDPR
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Security
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                        {submission.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                        {submission.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                        {submission.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                        {submission.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                        {submission.phone ? `${submission.countryCode} ${submission.phone}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                        {submission.organizationSize}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.gdprConsent 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {submission.gdprConsent ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.securityConsent 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {submission.securityConsent ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                        {new Date(submission.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                        {submission.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
