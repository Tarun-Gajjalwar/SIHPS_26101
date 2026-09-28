import React from 'react';


export const EmergingSkillsPage: React.FC = () => {
  const emergingSkills = [
    {
      id: '1',
      title: 'Satellite Imagery & Earth Observation in Agricultural Statistics',
      domain: 'Geospatial Statistics',
      readiness: '32%',
      readinessColor: 'bg-rose-500',
      horizon: '2025 - Immediate Priority',
      description: 'Using Sentinel-2 satellite data and NDVI index to independently estimate crop acreage and yield forecasts, supplementing GCES field crop cutting experiments.',
      recommendedAction: 'NSSTA 2-Week Residential Workshop on GIS & Remote Sensing for Official Statisticians.'
    },
    {
      id: '2',
      title: 'Big Data & Telecommunications Data for Population Mobility',
      domain: 'Alternative Data Sources',
      readiness: '24%',
      readinessColor: 'bg-rose-500',
      horizon: '2025 - 2026',
      description: 'Leveraging anonymized CDR and mobile signaling data to model internal migrant worker flows and tourism statistics without traditional costly census surveys.',
      recommendedAction: 'Formulation of Privacy-Preserving Computation Curriculum with IIT Delhi / NSSTA.'
    },
    {
      id: '3',
      title: 'Machine Learning Imputation for Missing Survey Records',
      domain: 'Advanced Analytics',
      readiness: '48%',
      readinessColor: 'bg-amber-500',
      horizon: '2025 - Active Ingestion',
      description: 'Replacing standard mean/median imputation in PLFS and ASI with Random Forest and MICE algorithms to preserve variance structures.',
      recommendedAction: 'iGOT Karmayogi Module: Modern Machine Learning for Statistical Officers.'
    },
    {
      id: '4',
      title: 'Automated Classification using NLP (NIC & HS Code Mapping)',
      domain: 'Generative AI & NLP',
      readiness: '58%',
      readinessColor: 'bg-blue-500',
      horizon: '2025 - Production Pilot',
      description: 'Automating the semantic classification of open-text enterprise descriptions into National Industrial Classification (NIC 2008) 5-digit codes.',
      recommendedAction: 'Deployment of StatSaksham Classification Microservice to field tablets.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Future Skills & Technology Forecast</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Predictive competency mapping aligned with United Nations Statistical Commission (UNSC) standards and National Statistical Commission (NSC) directives.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {emergingSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {skill.domain}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {skill.horizon}
                </span>
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug">{skill.title}</h2>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{skill.description}</p>
              </div>

              {/* Cadre Readiness Track */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Current Cadre Readiness</span>
                  <span className="font-bold text-slate-900">{skill.readiness}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${skill.readinessColor}`}
                    style={{ width: skill.readiness }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 bg-slate-50/60 -mx-6 -mb-6 p-4 rounded-b-2xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Recommended Policy Action:
              </span>
              <p className="text-xs font-semibold text-slate-800">{skill.recommendedAction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
