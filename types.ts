export interface AnalysisResult {
  url: string;
  safetyScore: number; // 0 to 100
  verdict: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS' | 'UNKNOWN';
  summary: string;
  riskFactors: string[];
  safeFactors: string[];
  technicalDetails: {
    domainAge?: string;
    hostingProvider?: string;
    sslStatus?: string;
  };
  sources: Array<{
    title: string;
    uri: string;
  }>;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  SCANNER = 'SCANNER',
  EDUCATION = 'EDUCATION',
}

export interface SecurityTip {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  category: 'phishing' | 'malware' | 'privacy';
}