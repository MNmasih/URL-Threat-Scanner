import React from 'react';
import { Shield, Activity, Users, Lock, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Mon', attempts: 12 },
  { name: 'Tue', attempts: 19 },
  { name: 'Wed', attempts: 3 },
  { name: 'Thu', attempts: 25 },
  { name: 'Fri', attempts: 15 },
  { name: 'Sat', attempts: 8 },
  { name: 'Sun', attempts: 22 },
];

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
  <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 ${color}`} />
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg bg-gray-800 ${color.replace('bg-', 'text-')}`}>
          {icon}
        </div>
        <span className="text-gray-400 text-sm font-medium">{title}</span>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Shield size={20} />} 
          title="Protected Scans" 
          value="1,248" 
          color="bg-cyan-500" 
        />
        <StatCard 
          icon={<AlertTriangleIcon size={20} />} 
          title="Threats Blocked" 
          value="342" 
          color="bg-red-500" 
        />
        <StatCard 
          icon={<Activity size={20} />} 
          title="Avg. Response" 
          value="0.8s" 
          color="bg-green-500" 
        />
        <StatCard 
          icon={<Users size={20} />} 
          title="Community Reports" 
          value="89" 
          color="bg-purple-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart2 className="text-cyan-400" size={20} />
            Global Threat Activity (Mock)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="attempts" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.attempts > 20 ? '#ef4444' : '#06b6d4'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Lock className="text-cyan-400" size={20} />
            Recent Alerts
          </h3>
          <div className="space-y-4">
            {[
              { type: 'Phishing', url: 'account-verify-google.com', time: '2m ago' },
              { type: 'Malware', url: 'freedownload-soft.net', time: '15m ago' },
              { type: 'Scam', url: 'crypto-bonus-claim.xyz', time: '1h ago' },
              { type: 'Phishing', url: 'amaz0n-support-ticket.com', time: '3h ago' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-red-400">{item.type}</span>
                  <span className="text-xs text-gray-400 truncate max-w-[150px]">{item.url}</span>
                </div>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AlertTriangleIcon = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

export default Dashboard;