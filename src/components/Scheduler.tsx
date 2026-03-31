import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Plus, 
  Sparkles 
} from 'lucide-react';
import { ScheduleItem } from '../types';
import { motion } from 'motion/react';

export const Scheduler: React.FC = () => {
  const schedule: ScheduleItem[] = [
    { id: '1', day: 'Monday', time: '09:00 - 10:30', subject: 'Advanced Mathematics', room: 'Room 302', teacher: 'Dr. Sarah Wilson', class: 'CS-4A' },
    { id: '2', day: 'Monday', time: '11:00 - 12:30', subject: 'Data Structures', room: 'Lab 1', teacher: 'Prof. James Chen', class: 'CS-4A' },
    { id: '3', day: 'Tuesday', time: '09:00 - 10:30', subject: 'Software Engineering', room: 'Room 105', teacher: 'Dr. Emily Brown', class: 'CS-4A' },
    { id: '4', day: 'Wednesday', time: '14:00 - 15:30', subject: 'Database Systems', room: 'Lab 2', teacher: 'Prof. Michael Ross', class: 'CS-4A' },
    { id: '5', day: 'Thursday', time: '10:00 - 11:30', subject: 'Operating Systems', room: 'Room 204', teacher: 'Dr. Sarah Wilson', class: 'CS-4A' },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Master Scheduler</h2>
          <p className="text-slate-500 text-sm">AI-driven timetable and resource optimization</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-100 transition-all">
            <Sparkles className="w-5 h-5" />
            AI Optimize
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            <Plus className="w-5 h-5" />
            Add Entry
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {days.map((day, i) => (
          <motion.div 
            key={day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="space-y-4"
          >
            <div className="bg-slate-100 p-3 rounded-2xl text-center">
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{day}</span>
            </div>

            <div className="space-y-4">
              {schedule
                .filter(item => item.day === day)
                .map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.time}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-indigo-600 transition-colors">{item.subject}</h4>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <MapPin className="w-3 h-3" />
                        <span>{item.room}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <User className="w-3 h-3" />
                        <span>{item.teacher}</span>
                      </div>
                    </div>
                  </div>
                ))}
              {schedule.filter(item => item.day === day).length === 0 && (
                <div className="h-32 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No Classes</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
