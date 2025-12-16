import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Search, Globe, Lock, ExternalLink, Loader2 } from 'lucide-react';
import { analyzeUrl } from '../services/geminiService';
import { AnalysisResult } from '../types';

const Scanner: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsAnalyzing(true);
    setResult(null);

    // Simulate a minimum scanning time for effect, but rely on API
    const analysisPromise = analyzeUrl(url);
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 2000));
    
    const [analysisData] = await Promise.all([analysisPromise, minTimePromise]);
    
    setResult(analysisData);
    setIsAnalyzing(false);
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'SAFE': return 'text-cyber-green border-cyber-green shadow-[0_0_15px_rgba(16,185,129,0.3)]';
      case 'DANGEROUS': return 'text-cyber-red border-cyber-red shadow-[0_0_15px_rgba(239,68,68,0.3)]';
      case 'SUSPICIOUS': return 'text-cyber-yellow border-cyber-yellow shadow-[0_0_15px_rgba(245,158,11,0.3)]';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getVerdictBg = (verdict: string) => {
    switch (verdict) {
      case 'SAFE': return 'bg-cyber-green/10';
      case 'DANGEROUS': return 'bg-cyber-red/10';
      case 'SUSPICIOUS': return 'bg-cyber-yellow/10';
      default: return 'bg-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          URL Threat Scanner
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Enter a suspicious link below. Our AI scans the URL structure, domain reputation, and cross-references Google Search to detect phishing attempts.
        </p>
      </div>

      {/* Input Section */}
      <div className="glass-panel p-6 rounded-2xl shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <form onSubmit={handleScan} className="relative z-10 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/login"
              className="w-full pl-10 pr-4 py-4 bg-cyber-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500 transition-all font-mono"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isAnalyzing}
            className={`px-8 py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
              isAnalyzing 
                ? 'bg-gray-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-900/20'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Analyze Link
              </>
            )}
          </button>
        </form>

        {isAnalyzing && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800 overflow-hidden rounded-b-2xl">
            <div className="h-full bg-cyan-500 animate-[progress_2s_ease-in-out_infinite] w-full origin-left transform scale-x-0" />
            <style>{`
              @keyframes progress {
                0% { transform: scaleX(0); }
                50% { transform: scaleX(0.7); }
                100% { transform: scaleX(1); opacity: 0; }
              }
            `}</style>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Main Verdict Card */}
          <div className={`glass-panel rounded-2xl p-8 border-l-4 ${getVerdictColor(result.verdict)} relative overflow-hidden`}>
            {result.verdict === 'DANGEROUS' && (
               <div className="absolute -right-10 -top-10 text-cyber-red/10 animate-pulse">
                 <AlertTriangle size={200} />
               </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-8 relative z-10">
              {/* Score Gauge */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center">
                <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center relative ${getVerdictColor(result.verdict)}`}>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-white">{result.safetyScore}</span>
                    <span className="text-xs text-gray-400 block">/100</span>
                  </div>
                </div>
                <div className={`mt-4 px-4 py-1 rounded-full text-sm font-bold border ${getVerdictColor(result.verdict)} ${getVerdictBg(result.verdict)}`}>
                  {result.verdict}
                </div>
              </div>

              {/* Summary */}
              <div className="flex-grow space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Analysis Summary
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {result.summary}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                    <h4 className="text-red-400 font-bold mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Risk Factors
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                      {result.riskFactors.length > 0 ? (
                        result.riskFactors.map((risk, i) => <li key={i}>{risk}</li>)
                      ) : (
                        <li className="text-gray-500 italic">No specific risks detected</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                    <h4 className="text-green-400 font-bold mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Safety Indicators
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                      {result.safeFactors.length > 0 ? (
                        result.safeFactors.map((safe, i) => <li key={i}>{safe}</li>)
                      ) : (
                         <li className="text-gray-500 italic">No specific safety markers found</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details & Sources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl">
              <h4 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5" /> Technical Details
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Domain</span>
                  <span className="text-white font-mono text-sm truncate max-w-[200px]">{new URL(result.url).hostname}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">SSL Status</span>
                  <span className="text-white text-sm">{result.technicalDetails.sslStatus || 'Unknown'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Hosting</span>
                  <span className="text-white text-sm">{result.technicalDetails.hostingProvider || 'Unknown'}</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <h4 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5" /> Verified Sources
              </h4>
              {result.sources.length > 0 ? (
                <ul className="space-y-3">
                  {result.sources.map((source, idx) => (
                    <li key={idx} className="text-sm">
                      <a 
                        href={source.uri} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-400 hover:text-blue-300 hover:underline flex items-start gap-2"
                      >
                         <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                         {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic text-sm">No specific external reports found for this exact URL.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;