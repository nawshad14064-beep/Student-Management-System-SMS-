import React from 'react';
import { 
  UserPlus, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Filter,
  MoreVertical,
  Download
} from 'lucide-react';
import { AdmissionApplication } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const Admissions: React.FC = () => {
  const applications: AdmissionApplication[] = [
    { id: 'APP-001', name: 'Alice Johnson', email: 'alice.j@example.com', course: 'Computer Science', status: 'Reviewing', date: '2026-03-25', documents: ['Transcript.pdf', 'ID_Proof.jpg'] },
    { id: 'APP-002', name: 'Bob Smith', email: 'bob.s@example.com', course: 'Business Admin', status: 'Pending', date: '2026-03-28', documents: ['Transcript.pdf'] },
    { id: 'APP-003', name: 'Charlie Davis', email: 'charlie.d@example.com', course: 'Mechanical Eng', status: 'Accepted', date: '2026-03-20', documents: ['Transcript.pdf', 'ID_Proof.jpg', 'Letter.pdf'] },
    { id: 'APP-004', name: 'Diana Prince', email: 'diana.p@example.com', course: 'Fine Arts', status: 'Rejected', date: '2026-03-15', documents: ['Portfolio.pdf'] },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Enrollment & Admissions</h2>
          <p className="text-slate-500 text-sm">Digital application forms and automated workflows</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            <UserPlus className="w-5 h-5" />
            New Application
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-amber-50 p-3 rounded-2xl">
            <Clock className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Pending Review</p>
            <p className="text-2xl font-black text-slate-800">12</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-50 p-3 rounded-2xl">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Accepted Today</p>
            <p className="text-2xl font-black text-slate-800">4</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-indigo-50 p-3 rounded-2xl">
            <FileText className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Total Apps</p>
            <p className="text-2xl font-black text-slate-800">156</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search applications..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                        {app.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 text-sm">{app.name}</p>
                        <p className="text-[10px] text-slate-400">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600">{app.course}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-500">{app.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer">{app.documents.length} Files</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${
                      app.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      app.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                      app.status === 'Reviewing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Accept">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Reject">
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
