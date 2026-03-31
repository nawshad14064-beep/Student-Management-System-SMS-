import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Student } from '../types';

interface StudentDetailsModalProps {
  student: Student | null;
  onClose: () => void;
}

export const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-indigo-600 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold leading-none mb-1">{student.name}</h2>
                <p className="text-indigo-100 text-xs font-mono">{student.studentId}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div className="space-y-6">
              <section>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Personal Information</h3>
                <div className="space-y-2">
                  <DetailItem label="Email" value={student.email} />
                  <DetailItem label="Phone" value={student.phone || 'N/A'} />
                  <DetailItem label="DOB" value={student.dob || 'N/A'} />
                  <DetailItem label="Gender" value={student.gender || 'N/A'} />
                  <DetailItem label="Blood Group" value={student.bloodGroup || 'N/A'} />
                  <DetailItem label="Address" value={student.address || 'N/A'} />
                </div>
              </section>
              <section>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Guardian Information</h3>
                <div className="space-y-2">
                  <DetailItem label="Name" value={student.guardianName || 'N/A'} />
                  <DetailItem label="Relation" value={student.guardianRelation || 'N/A'} />
                  <DetailItem label="Phone" value={student.guardianPhone || 'N/A'} />
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Academic Details</h3>
                <div className="space-y-2">
                  <DetailItem label="Course" value={student.course} />
                  <DetailItem label="Semester" value={student.semester || 'N/A'} />
                  <DetailItem label="Section" value={student.section || 'N/A'} />
                  <DetailItem label="Advisor" value={student.advisor || 'N/A'} />
                  <DetailItem label="Attendance" value={`${student.attendance}%`} />
                  <DetailItem label="GPA" value={student.gpa.toString()} />
                  <DetailItem label="Status" value={student.status} />
                </div>
              </section>
              <section>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Financial & Health</h3>
                <div className="space-y-2">
                  <DetailItem label="Fee Status" value={student.feeStatus} />
                  <DetailItem label="Scholarship" value={student.scholarship || 'None'} />
                  <DetailItem label="Medical" value={student.medicalConditions || 'None'} />
                  <DetailItem label="Emergency" value={student.emergencyContact || 'N/A'} />
                </div>
              </section>
            </div>
          </div>
          
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-300 transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-xs text-slate-500 font-medium">{label}</span>
      <span className="text-xs text-slate-800 font-semibold text-right">{value}</span>
    </div>
  );
}
