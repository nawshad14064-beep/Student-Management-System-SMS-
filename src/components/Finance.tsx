import React from 'react';
import { 
  CreditCard, 
  DollarSign, 
  FileText, 
  Download, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { Invoice } from '../types';
import { motion } from 'motion/react';

export const Finance: React.FC = () => {
  const invoices: Invoice[] = [
    { id: 'INV-001', amount: 1200, dueDate: '2026-04-15', status: 'Paid', description: 'Tuition Fee - Semester 4' },
    { id: 'INV-002', amount: 350, dueDate: '2026-04-20', status: 'Pending', description: 'Exam Fees - Spring 2026' },
    { id: 'INV-003', amount: 150, dueDate: '2026-03-30', status: 'Overdue', description: 'Library Fines' },
    { id: 'INV-004', amount: 1200, dueDate: '2026-05-15', status: 'Pending', description: 'Tuition Fee - Semester 5' },
  ];

  const stats = [
    { label: 'Total Revenue', value: '$45,200', icon: DollarSign, color: 'bg-emerald-500' },
    { label: 'Outstanding', value: '$8,450', icon: Clock, color: 'bg-amber-500' },
    { label: 'Overdue', value: '$1,200', icon: AlertTriangle, color: 'bg-rose-500' },
    { label: 'Paid Invoices', value: '124', icon: CheckCircle2, color: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Fee & Billing Management</h2>
          <p className="text-slate-500 text-sm">Automated invoice generation and financial tracking</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-100 transition-all">
            <Download className="w-5 h-5" />
            Export Report
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            <Plus className="w-5 h-5" />
            Create Invoice
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
          >
            <div className={`${stat.color} p-3 rounded-2xl shadow-lg shadow-slate-100 w-fit mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-800">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Recent Invoices</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-bold bg-slate-100 text-slate-600 rounded-lg">All</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:bg-slate-50 rounded-lg">Pending</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:bg-slate-50 rounded-lg">Overdue</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">
                        <FileText className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600">{invoice.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-slate-800">${invoice.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-500">{invoice.dueDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${
                      invoice.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      invoice.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                      'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <Download className="w-4 h-4" />
                    </button>
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
