import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  MessageSquare, 
  UserCircle,
  LogOut
} from 'lucide-react';
import { ViewType, UserRole } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, activeRole, setActiveRole }) => {
  const menuItems: { id: ViewType; label: string; icon: any; roles: UserRole[] }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Teacher'] },
    { id: 'students', label: 'Students', icon: Users, roles: ['Admin', 'Teacher'] },
    { id: 'admissions', label: 'Admissions', icon: UserPlus, roles: ['Admin'] },
    { id: 'schedule', label: 'Schedule', icon: Calendar, roles: ['Admin', 'Teacher', 'Student', 'Parent'] },
    { id: 'finance', label: 'Finance', icon: CreditCard, roles: ['Admin', 'Parent'] },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['Admin'] },
    { id: 'messages', label: 'Messages', icon: MessageSquare, roles: ['Admin', 'Teacher', 'Student', 'Parent'] },
    { id: 'portal', label: 'My Portal', icon: UserCircle, roles: ['Student', 'Parent'] },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col sticky top-0">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-800">EduERP</span>
      </div>

      <div className="p-4 border-b border-slate-100">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Switch Role</label>
        <select 
          value={activeRole} 
          onChange={(e) => setActiveRole(e.target.value as UserRole)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="Admin">Administrator</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
          <option value="Parent">Parent</option>
        </select>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems
          .filter(item => item.roles.includes(activeRole))
          .map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                currentView === item.id 
                  ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-all font-medium">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};
