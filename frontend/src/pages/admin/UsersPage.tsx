import React, { useState, useEffect } from 'react';
import {
  Users2,
  Search,
  Filter,
  Shield,
  UserCheck,
  Mail,
  Building2,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import api from '../../services/api';

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      if (res.data?.success) {
        setUsers(res.data.data || []);
      }
    } catch {
      // Mock fallback
      setUsers([
        {
          id: '1',
          email: 'employee@statintel.demo',
          role: 'EMPLOYEE',
          isActive: true,
          profile: {
            firstName: 'Rahul',
            lastName: 'Sharma',
            employeeId: 'ISS-2018-042',
            designation: 'Assistant Director',
            department: { name: 'National Sample Survey Office (NSSO)' }
          }
        },
        {
          id: '2',
          email: 'trainer@statintel.demo',
          role: 'TRAINER',
          isActive: true,
          profile: {
            firstName: 'Dr. Priya',
            lastName: 'Patel',
            employeeId: 'NSSTA-FAC-014',
            designation: 'Senior Faculty (Sampling & Methodology)',
            department: { name: 'National Statistical Systems Training Academy' }
          }
        },
        {
          id: '3',
          email: 'admin@statintel.demo',
          role: 'ADMIN',
          isActive: true,
          profile: {
            firstName: 'Vikram',
            lastName: 'Singh',
            employeeId: 'ISS-2006-008',
            designation: 'Joint Director (Cadre Policy)',
            department: { name: 'Ministry of Statistics & PI (Headquarters)' }
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter((u) => {
    const name = `${u.profile?.firstName || ''} ${u.profile?.lastName || ''}`.toLowerCase();
    const email = u.email?.toLowerCase();
    const id = (u.profile?.employeeId || '').toLowerCase();
    const matchesSearch =
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase()) ||
      id.includes(search.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Official Personnel & Cadre Directory</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Registered officers, trainers, and administrators across the National Statistical System.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search officer name, ID, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {['ALL', 'EMPLOYEE', 'TRAINER', 'ADMIN'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                roleFilter === r
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {r === 'ALL' ? 'All Roles' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Personnel Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="p-4">Officer / Official</th>
              <th className="p-4">Cadre ID</th>
              <th className="p-4">Designation & Department</th>
              <th className="p-4">Portal Role</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                      {user.profile?.firstName?.[0] || 'U'}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">
                        {user.profile?.firstName} {user.profile?.lastName}
                      </div>
                      <div className="text-[11px] text-slate-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-mono font-bold text-slate-700">
                  {user.profile?.employeeId || 'DEMO-2024'}
                </td>
                <td className="p-4">
                  <div className="font-medium text-slate-800">
                    {user.profile?.designation || 'Statistical Officer'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {user.profile?.department?.name || 'MoSPI'}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      user.role === 'ADMIN'
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        : user.role === 'TRAINER'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className="text-emerald-700 font-semibold">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
