// import React, { useState, useCallback, useEffect } from 'react';

// interface FinancialSection {
//   title: string;
//   key_insights: string[];
//   story: string;
// }

// interface NarrativeData {
//   company_overview: {
//     name: string;
//     storytelling_approach: string;
//   };
//   financial_story_sections: {
//     income_statement_narrative?: FinancialSection; // Made optional
//     balance_sheet_narrative?: FinancialSection;    // Made optional
//     cash_flow_statement_narrative?: FinancialSection; // Made optional
//   };
//   comprehensive_narrative: {
//     title: string;
//     story: string;
//   };
//   key_performance_indicators: {
//     revenue_growth: string;
//     net_income_growth: string;
//     asset_growth: string;
//   };
// }

// interface FinancialNarrativeGeneratorProps {
//   financialStatementContent: string;
// }

// const FinancialNarrativeGenerator: React.FC<FinancialNarrativeGeneratorProps> = ({ financialStatementContent }) => {
//   const [narrativeData, setNarrativeData] = useState<NarrativeData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const generateNarrative = useCallback(async () => {
//     if (!financialStatementContent.trim()) {
//       setError('No financial data provided');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://localhost:3001/generate-narrative', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ fileContent: financialStatementContent }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: NarrativeData = await response.json();
//       setNarrativeData(data);
//     } catch (err: any) {
//       setError(err.message || 'An error occurred while generating narrative');
//     } finally {
//       setLoading(false);
//     }
//   }, [financialStatementContent]);

//   useEffect(() => {
//     if (financialStatementContent) {
//       generateNarrative();
//     }
//   }, [financialStatementContent, generateNarrative]);

//   const renderSectionContent = useCallback(
//     (section: FinancialSection | undefined, type: 'income' | 'balance' | 'cashFlow') => {
//       if (!section) {
//         return (
//           <div className="p-6 rounded-xl shadow-lg bg-gray-100 border-l-4 border-gray-500">
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">Section Unavailable</h3>
//             <p className="text-gray-700">Data for this section is not available.</p>
//           </div>
//         );
//       }

//       const sectionColors = {
//         income: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-800' },
//         balance: { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-800' },
//         cashFlow: { bg: 'bg-cyan-50', border: 'border-cyan-500', text: 'text-cyan-800' },
//       };

//       const colors = sectionColors[type];

//       return (
//         <div className={`p-6 rounded-xl shadow-lg ${colors.bg} ${colors.border} border-l-4`}>
//           <h3 className={`text-2xl font-bold ${colors.text} mb-4`}>{section.title}</h3>
//           <div className="space-y-4">
//             <div className="bg-white/50 p-4 rounded-lg">
//               <h4 className="font-semibold text-lg mb-2 text-gray-700">Key Insights</h4>
//               <ul className="space-y-2">
//                 {section.key_insights.map((insight, index) => (
//                   <li key={index} className="text-gray-600">{insight}</li>
//                 ))}
//               </ul>
//             </div>
//             <div className="bg-white/50 p-4 rounded-lg">
//               <h4 className="font-semibold text-lg mb-2 text-gray-700">Narrative</h4>
//               <p className="text-gray-700 leading-relaxed">{section.story}</p>
//             </div>
//           </div>
//         </div>
//       );
//     },
//     []
//   );

//   return (
//     <div className="container mx-auto px-4 py-12 max-w-4xl">
//       {loading && (
//         <div className="text-center py-4">
//           <p className="text-blue-500">Generating narrative...</p>
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
//           {error}
//         </div>
//       )}

//       {narrativeData && (
//         <div className="space-y-8">
//           <div className="bg-blue-100 p-6 rounded-xl shadow-lg">
//             <h2 className="text-3xl font-bold text-blue-800 mb-4">
//               {narrativeData.company_overview?.name ?? 'Unknown Company'}
//             </h2>
//             <p className="text-gray-700">
//               {narrativeData.company_overview?.storytelling_approach ?? 'No storytelling approach provided'}
//             </p>
//           </div>

//           <div className="space-y-6">
//             {renderSectionContent(narrativeData.financial_story_sections?.income_statement_narrative, 'income')}
//             {renderSectionContent(narrativeData.financial_story_sections?.balance_sheet_narrative, 'balance')}
//             {renderSectionContent(narrativeData.financial_story_sections?.cash_flow_statement_narrative, 'cashFlow')}
//           </div>

//           <div className="bg-blue-50 p-6 rounded-xl shadow-lg">
//             <h3 className="text-2xl font-bold text-blue-800 mb-4">
//               {narrativeData.comprehensive_narrative?.title ?? 'Comprehensive Narrative Unavailable'}
//             </h3>
//             <p className="text-gray-700 leading-relaxed">
//               {narrativeData.comprehensive_narrative?.story ?? 'No comprehensive story available.'}
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-4">
//             {narrativeData.key_performance_indicators ? (
//               Object.entries(narrativeData.key_performance_indicators).map(([key, value]) => (
//                 <div key={key} className="bg-blue-100 p-4 rounded-lg text-center">
//                   <h4 className="text-lg font-semibold text-blue-700 capitalize">
//                     {key.replace(/_/g, ' ')}
//                   </h4>
//                   <p className="text-2xl font-bold text-blue-800">{value}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-700">No key performance indicators available.</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FinancialNarrativeGenerator;
import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// TypeScript interfaces matching the backend response structure
interface FinancialSection {
  title: string;
  key_insights: string[];
  story: string;
}

interface NarrativeData {
  company_overview: {
    name: string;
    storytelling_approach: string;
  };
  financial_story_sections: {
    income_statement_narrative?: FinancialSection;
    balance_sheet_narrative?: FinancialSection;
    cash_flow_narrative?: FinancialSection;
  };
  comprehensive_narrative: {
    title: string;
    story: string;
  };
  key_performance_indicators: {
    revenue_growth: string;
    net_income_growth: string;
    asset_growth: string;
  };
}

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';

// TypeScript interfaces matching the backend response structure
interface FinancialSection {
  title: string;
  key_insights: string[];
  story: string;
}

interface NarrativeData {
  company_overview: {
    name: string;
    storytelling_approach: string;
  };
  financial_story_sections: {
    income_statement_narrative?: FinancialSection;
    balance_sheet_narrative?: FinancialSection;
    cash_flow_narrative?: FinancialSection;
  };
  comprehensive_narrative: {
    title: string;
    story: string;
  };
  key_performance_indicators: {
    revenue_growth: string;
    net_income_growth: string;
    asset_growth: string;
  };
}

const FinancialNarrativeDashboard: React.FC = () => {
  const [narrativeData, setNarrativeData] = useState<NarrativeData | null>(null);
  const [selectedSection, setSelectedSection] = useState<'income' | 'balance' | 'cashFlow'>('income');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch narrative data from backend
  const fetchNarrativeData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/generate-narrative', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileContent: '' // Modify as per your backend requirements
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: NarrativeData = await response.json();
      setNarrativeData(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching narrative');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchNarrativeData();
  }, [fetchNarrativeData]);

  // Render section content based on selected section
  const renderSectionContent = () => {
    if (!narrativeData) return null;

    const sectionMap = {
      income: narrativeData.financial_story_sections?.income_statement_narrative,
      balance: narrativeData.financial_story_sections?.balance_sheet_narrative,
      cashFlow: narrativeData.financial_story_sections?.cash_flow_narrative
    };

    const section = sectionMap[selectedSection];

    if (!section) {
      return (
        <div className="p-6 text-center text-gray-500">
          No data available for this section
        </div>
      );
    }

    const sectionColors = {
      income: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-800' },
      balance: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-800' },
      cashFlow: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-800' }
    };

    const colors = sectionColors[selectedSection];

    return (
      <div className={`${colors.bg} p-6 rounded-lg`}>
        <h2 className={`text-2xl font-bold ${colors.text} mb-4`}>
          {section.title}
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Key Insights</h3>
            <ul className="list-disc pl-5 space-y-2">
              {section.key_insights.map((insight, index) => (
                <li key={index} className="text-gray-700">{insight}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Narrative</h3>
            <p className="text-gray-700 leading-relaxed">{section.story}</p>
          </div>
        </div>
      </div>
    );
  };

  // Render key performance indicators
  const renderKPIs = () => {
    if (!narrativeData?.key_performance_indicators) return null;

    return (
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {Object.entries(narrativeData.key_performance_indicators).map(([key, value]) => (
          <div key={key} className="bg-gray-100 p-4 rounded-lg text-center">
            <h4 className="text-sm uppercase text-gray-600">
              {key.replace(/_/g, ' ')}
            </h4>
            <p className="text-xl font-bold text-gray-800">{value}</p>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading financial narrative...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">
            {narrativeData?.company_overview?.name || 'Financial Narrative'}
          </CardTitle>
          
          <div className="flex space-x-4 mb-4">
            <Button 
              variant={selectedSection === 'income' ? 'default' : 'outline'}
              onClick={() => setSelectedSection('income')}
            >
              Income Statement
            </Button>
            <Button 
              variant={selectedSection === 'balance' ? 'default' : 'outline'}
              onClick={() => setSelectedSection('balance')}
            >
              Balance Sheet
            </Button>
            <Button 
              variant={selectedSection === 'cashFlow' ? 'default' : 'outline'}
              onClick={() => setSelectedSection('cashFlow')}
            >
              Cash Flow
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {renderSectionContent()}
          {renderKPIs()}
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialNarrativeDashboard;