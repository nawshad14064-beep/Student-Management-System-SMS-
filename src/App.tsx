import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StudentManagement } from './components/StudentManagement';
import { Admissions } from './components/Admissions';
import { Scheduler } from './components/Scheduler';
import { Finance } from './components/Finance';
import { Portals } from './components/Portals';
import { StudentDetailsModal } from './components/StudentDetailsModal';
import { Student, UserRole, ViewType } from './types';
import { Bell, Search, User } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeRole, setActiveRole] = useState<UserRole>('Admin');
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [notifications, setNotifications] = useState<{id: string, text: string, type: 'info' | 'warning' | 'error', date: string}[]>([]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // Automated Communication: Predictive Risk Alerts
  useEffect(() => {
    const atRisk = students.filter(s => s.attendance < 75 || s.gpa < 2.0);
    const newNotifications = atRisk.map(s => ({
      id: crypto.randomUUID(),
      text: `Predictive Alert: ${s.name} is at risk (Attendance: ${s.attendance}%, GPA: ${s.gpa})`,
      type: 'warning' as const,
      date: new Date().toLocaleString()
    }));
    setNotifications(newNotifications);
  }, [students.length]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard students={students} />;
      case 'students':
        return <StudentManagement students={students} setStudents={setStudents} setSelectedStudent={setSelectedStudent} />;
      case 'admissions':
        return <Admissions />;
      case 'schedule':
        return <Scheduler />;
      case 'finance':
        return <Finance />;
      case 'portal':
        return students.length > 0 ? <Portals student={students[0]} role={activeRole} /> : <div className="p-8 text-center text-slate-400">No student data available for portal view.</div>;
      default:
        return <Dashboard students={students} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        activeRole={activeRole} 
        setActiveRole={setActiveRole} 
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {notifications.length}
                </span>
              )}
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">Nawshad</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeRole}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {renderView()}
        </div>
      </main>

      {/* Global Modals */}
      <StudentDetailsModal 
        student={selectedStudent} 
        onClose={() => setSelectedStudent(null)} 
      />
    </div>
  );
}
