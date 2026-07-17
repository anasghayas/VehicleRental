import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'sonner';

export default function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (err) {
      setError('Failed to load users.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    setActionLoading(userId);
    try {
      await api.put(`/admin/users/${userId}/approve`);
      setUsers(users.map(u => 
        u._id === userId ? { ...u, isApproved: true } : u
      ));
      toast.success("Agency approved successfully!");
    } catch (err) {
      console.error("Failed to approve agency", err);
      toast.error(err.response?.data?.message || "Error approving agency.");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <LoadingSpinner text="Loading users..." fullScreen />;
  if (error) return <div className="text-center text-red-500 mt-20 bg-red-50 p-4 rounded-lg inline-block">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Users 👥</h1>
      
      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Name / Agency Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.role === 'agency' ? user.agencyName : user.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      user.role === 'agency' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === 'customer' ? (
                      <span className="text-gray-400 italic">N/A</span>
                    ) : user.isApproved ? (
                      <span className="text-green-600 font-medium">Approved ✅</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Pending ⏳</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {user.role === 'agency' && !user.isApproved && (
                      <Button 
                        onClick={() => handleApprove(user._id)}
                        disabled={actionLoading === user._id}
                        size="sm"
                      >
                        {actionLoading === user._id ? 'Approving...' : 'Approve Agency'}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
