import React from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Student } from '../types';
import { motion } from 'motion/react';

interface DashboardProps {
  students: Student[];
}

export const Dashboard: React.FC<DashboardProps> = ({ students }) => {
  const atRisk = students.filter(s => s.attendance < 75 || s.gpa < 2.0);
  const totalStudents = students.length;
  const avgAttendance = totalStudents > 0 
    ? (students.reduce((acc, s) => acc + s.attendance, 0) / totalStudents).toFixed(1)
    : 0;
  const avgGPA = totalStudents > 0 
    ? (students.reduce((acc, s) => acc + s.gpa, 0) / totalStudents).toFixed(2)
    : 0;
  const pendingFees = students.filter(s => s.feeStatus !== 'Paid').length;

  const stats = [
    { label: 'Total Students', value: totalStudents, icon: Users, color: 'bg-blue-500', trend: '+12%', up: true },
    { label: 'Avg. Attendance', value: `${avgAttendance}%`, icon: TrendingUp, color: 'bg-emerald-500', trend: '-2%', up: false },
    { label: 'Avg. GPA', value: avgGPA, icon: CheckCircle2, color: 'bg-indigo-500', trend: '+0.1', up: true },
    { label: 'Pending Fees', value: pendingFees, icon: DollarSign, color: 'bg-rose-500', trend: '-5%', up: false },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Administrative Overview</h2>
        <p className="text-slate-500 text-sm">Real-time insights and predictive analytics</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-2xl shadow-lg shadow-slate-100 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-800">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Predictive Analytics: At-Risk Students */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-rose-50 p-2 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Predictive Risk Analysis</h3>
                <p className="text-slate-500 text-xs">Students flagged for immediate intervention</p>
              </div>
            </div>
            <span className="bg-rose-100 text-rose-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
              {atRisk.length} Flagged
            </span>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {atRisk.length > 0 ? (
              atRisk.map(student => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-rose-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{student.name}</p>
                      <p className="text-slate-500 text-[10px] font-mono">{student.studentId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${student.attendance < 75 ? 'text-rose-500' : 'text-slate-400'}`}>
                      {student.attendance}% Att.
                    </p>
                    <p className={`text-xs font-bold ${student.gpa < 2.0 ? 'text-rose-500' : 'text-slate-400'}`}>
                      {student.gpa} GPA
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm font-medium">No students currently at risk</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity / Admissions */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 p-2 rounded-xl">
                <Clock className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Recent Admissions</h3>
                <p className="text-slate-500 text-xs">Latest enrollment applications</p>
              </div>
            </div>
            <button className="text-indigo-600 text-xs font-bold hover:underline">View All</button>
          </div>

          <div className="space-y-4">
            {students.slice(0, 4).map(student => (
              <div key={student.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {student.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800 text-sm">{student.name}</p>
                  <p className="text-slate-500 text-[10px]">{student.course} • {student.enrollmentDate}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  Enrolled
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
