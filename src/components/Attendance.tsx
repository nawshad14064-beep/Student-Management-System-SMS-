import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Calendar as CalendarIcon,
  Save,
  Users
} from 'lucide-react';
import { Student, AttendanceLog } from '../types';
import { motion } from 'motion/react';

interface AttendanceProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export const Attendance: React.FC<AttendanceProps> = ({ students, setStudents }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local state for current session attendance to avoid multiple state updates
  const [currentAttendance, setCurrentAttendance] = useState<Record<string, AttendanceLog['status']>>({});

  const courses = ['All', ...Array.from(new Set(students.map(s => s.course)))];

  const filteredStudents = students.filter(s => {
    const matchesCourse = selectedCourse === 'All' || s.course === selectedCourse;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const handleStatusChange = (studentId: string, status: AttendanceLog['status']) => {
    setCurrentAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const saveAttendance = () => {
    setStudents(prev => prev.map(student => {
      const status = currentAttendance[student.id];
      if (!status) return student;

      // Check if log for this date already exists
      const existingLogIndex = student.attendanceLogs.findIndex(log => log.date === selectedDate);
      let newLogs = [...student.attendanceLogs];
      
      if (existingLogIndex >= 0) {
        newLogs[existingLogIndex] = { date: selectedDate, status };
      } else {
        newLogs.push({ date: selectedDate, status });
      }

      // Recalculate attendance percentage
      const totalDays = newLogs.length;
      const presentDays = newLogs.filter(log => log.status === 'Present' || log.status === 'Late').length;
      const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

      return {
        ...student,
        attendanceLogs: newLogs,
        attendance: attendancePercentage
      };
    }));
    
    // Clear current session state after saving
    setCurrentAttendance({});
    alert('Attendance saved successfully!');
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Attendance Management</h2>
          <p className="text-slate-500 text-sm">Mark daily attendance and track student presence</p>
        </div>
        <button 
          onClick={saveAttendance}
          disabled={Object.keys(currentAttendance).length === 0}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg ${
            Object.keys(currentAttendance).length > 0 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Save className="w-5 h-5" />
          Save Attendance
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <CalendarIcon className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Select Date</span>
          </div>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Filter by Course</span>
          </div>
          <select 
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            {courses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Search className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Search Student</span>
          </div>
          <input 
            type="text" 
            placeholder="Name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Course & ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => {
                const status = currentAttendance[student.id] || 
                              student.attendanceLogs.find(l => l.date === selectedDate)?.status || 
                              '';
                
                return (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-700 text-sm">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-medium text-slate-600">{student.course}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{student.studentId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleStatusChange(student.id, 'Present')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-tighter transition-all border ${
                            status === 'Present' 
                              ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-100' 
                              : 'bg-white text-slate-400 border-slate-200 hover:border-emerald-200 hover:text-emerald-500'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Present
                        </button>
                        <button 
                          onClick={() => handleStatusChange(student.id, 'Absent')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-tighter transition-all border ${
                            status === 'Absent' 
                              ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-100' 
                              : 'bg-white text-slate-400 border-slate-200 hover:border-rose-200 hover:text-rose-500'
                          }`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Absent
                        </button>
                        <button 
                          onClick={() => handleStatusChange(student.id, 'Late')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-tighter transition-all border ${
                            status === 'Late' 
                              ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-100' 
                              : 'bg-white text-slate-400 border-slate-200 hover:border-amber-200 hover:text-amber-500'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
