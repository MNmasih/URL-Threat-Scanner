import React from 'react';
import { BookOpen, ShieldCheck, UserCheck, Smartphone } from 'lucide-react';
import { SecurityTip } from '../types';

const tips: SecurityTip[] = [
  {
    title: "Verify the Domain",
    description: "Hackers often use 'typo-squatting' (e.g., goog1e.com instead of google.com). Always check the spelling of the URL carefully.",
    severity: 'high',
    category: 'phishing'
  },
  {
    title: "Check for HTTPS",
    description: "While not a guarantee of safety, a missing lock icon or 'Not Secure' warning is a major red flag for any site asking for data.",
    severity: 'medium',
    category: 'privacy'
  },
  {
    title: "Urgency is a Trap",
    description: "Phishing emails often create false urgency (e.g., 'Your account will be deleted in 24 hours!'). Legitimate companies rarely do this.",
    severity: 'high',
    category: 'phishing'
  },
  {
    title: "Mobile Link Shorteners",
    description: "Be careful with bit.ly or tinyurl links on SMS. Use our scanner to expand and check them before clicking.",
    severity: 'medium',
    category: 'malware'
  }
];

const Education: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
       <div className="text-center space-y-4 mb-10">
        <h2 className="text-3xl font-bold text-white">Security Knowledge Base</h2>
        <p className="text-gray-400">Learn how to spot attacks before they happen.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl hover:bg-gray-800/80 transition-colors border-l-4 border-l-cyan-500">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{tip.title}</h3>
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                tip.severity === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {tip.severity} risk
              </span>
            </div>
            <p className="text-gray-300 mb-4">{tip.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {tip.category === 'phishing' && <UserCheck size={16} />}
              {tip.category === 'malware' && <ShieldCheck size={16} />}
              <span className="capitalize">{tip.category} Prevention</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-2xl mt-8 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="p-4 bg-cyan-500/10 rounded-full">
            <Smartphone size={48} className="text-cyan-400" />
          </div>
          <div>
             <h3 className="text-2xl font-bold text-white mb-2">Did you know?</h3>
             <p className="text-gray-300">
               Over 90% of successful cyberattacks start with a phishing email. Using a link scanner like LinkGuardian significantly reduces your risk profile by adding a verification layer between you and the attacker.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;