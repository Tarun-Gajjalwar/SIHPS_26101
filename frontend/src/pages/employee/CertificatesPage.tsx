import React from 'react';
import {
  Award,
  Download,
  ExternalLink,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  QrCode
} from 'lucide-react';

export const CertificatesPage: React.FC = () => {
  const certificates = [
    {
      id: 'CERT-2023-0891',
      title: 'Certification in Consumer Price Index (CPI) Methodology',
      issuer: 'Ministry of Statistics & Programme Implementation (MoSPI)',
      issuedAt: '15 November 2023',
      credentialId: 'MOSPI-CPI-2023-0891',
      skills: ['Laspeyres Formula', 'Price Collection', 'Index Weighting', 'Imputation Protocols']
    },
    {
      id: 'CERT-2024-0112',
      title: 'Official Statistics & Survey Sampling Specialist',
      issuer: 'National Statistical Systems Training Academy (NSSTA)',
      issuedAt: '28 February 2024',
      credentialId: 'NSSTA-SAM-2024-0112',
      skills: ['Stratified Sampling', 'Non-Sampling Errors', 'PLFS Design', 'NSSO Methodology']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Official Certificates & Credentials</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Digitally signed certificates issued by MoSPI and NSSTA upon successful completion of assessments and courses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm hover:border-blue-500 transition relative overflow-hidden flex flex-col justify-between"
          >
            {/* Top Emblem Ribbon */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Cryptographically Authenticated</span>
                  </div>
                </div>
              </div>

              <QrCode className="w-8 h-8 text-slate-300" />
            </div>

            <div className="my-4 space-y-2">
              <h2 className="text-sm font-bold text-slate-900 leading-snug">{cert.title}</h2>
              <p className="text-[11px] text-slate-500 font-mono">ID: {cert.credentialId}</p>

              <div className="flex flex-wrap gap-1 pt-1">
                {cert.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Issued: {cert.issuedAt}</span>

              <button
                onClick={() => alert(`Certificate ${cert.credentialId} PDF generated and ready for print.`)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
              >
                <Download className="w-3 h-3" />
                <span>Download Official Certificate</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
