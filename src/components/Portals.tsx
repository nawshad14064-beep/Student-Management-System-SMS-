import React from 'react';
import { 
  UserCircle, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  Bell,
  Star
} from 'lucide-react';
import { Student, UserRole } from '../types';
import { motion } from 'motion/react';

interface PortalsProps {
  student: Student;
  role: UserRole;
}

export const Portals: React.FC<PortalsProps> = ({ student, role }) => {
  const isParent = role === 'Parent';

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-indigo-200">
            {student.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{isParent ? `${student.name}'s Dashboard` : `Welcome, ${student.name}`}</h2>
            <p className="text-slate-500 text-sm">{student.course} • Semester {student.semester}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="relative bg-white border border-slate-200 p-3 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>
          </button>
          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            Contact Support
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Progress */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="bg-emerald-50 p-3 rounded-2xl w-fit mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Attendance</p>
              <p className="text-3xl font-black text-slate-800">{student.attendance}%</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="bg-indigo-50 p-3 rounded-2xl w-fit mb-4">
                <TrendingUp className="w-6 h-6 text-indigo-500" />
              </div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Current GPA</p>
              <p className="text-3xl font-black text-slate-800">{student.gpa}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="bg-amber-50 p-3 rounded-2xl w-fit mb-4">
                <Star className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Credits Earned</p>
              <p className="text-3xl font-black text-slate-800">48/120</p>
            </div>
          </div>

          {/* Academic Progress / Grades */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800">Academic Performance</h3>
              <button className="text-indigo-600 text-xs font-bold hover:underline">Download Report Card</button>
            </div>
            <div className="space-y-4">
              {[
                { subject: 'Advanced Mathematics', grade: 'A', score: 92, status: 'Completed' },
                { subject: 'Data Structures', grade: 'A-', score: 88, status: 'Completed' },
                { subject: 'Software Engineering', grade: 'B+', score: 84, status: 'In Progress' },
                { subject: 'Database Systems', grade: 'A', score: 95, status: 'In Progress' },
              ].map(item => (
                <div key={item.subject} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-indigo-600">
                      {item.grade}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{item.subject}</p>
                      <p className="text-slate-500 text-[10px]">{item.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-800">{item.score}%</p>
                    <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.score}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Schedule & Billing */}
        <div className="space-y-8">
          {/* Upcoming Classes */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Today's Schedule</h3>
            <div className="space-y-6">
              {[
                { time: '09:00 AM', subject: 'Mathematics', room: '302' },
                { time: '11:00 AM', subject: 'Data Structures', room: 'Lab 1' },
                { time: '02:00 PM', subject: 'Database Systems', room: 'Lab 2' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== 2 && <div className="absolute left-2 top-8 bottom-[-24px] w-0.5 bg-slate-100"></div>}
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-500 bg-white z-10 mt-1"></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</p>
                    <p className="font-bold text-slate-800 text-sm">{item.subject}</p>
                    <p className="text-slate-500 text-[10px]">Room {item.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Summary */}
          <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl shadow-indigo-200 text-white">
            <div className="flex items-center justify-between mb-6">
              <CreditCard className="w-8 h-8 text-indigo-200" />
              <span className="bg-white/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Billing</span>
            </div>
            <p className="text-indigo-100 text-xs mb-1">Outstanding Balance</p>
            <p className="text-3xl font-black mb-6">$350.00</p>
            <button className="w-full bg-white text-indigo-600 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-lg">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
