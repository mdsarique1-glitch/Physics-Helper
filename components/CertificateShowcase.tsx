
import React from 'react';

const CertificateTier: React.FC<{
    type: 'Gold' | 'Silver' | 'Bronze';
    icon: React.ReactNode;
    rule: string;
    bgColor: string;
    textColor: string;
}> = ({ type, icon, rule, bgColor, textColor }) => (
    <div className={`p-4 rounded-lg shadow-md flex items-center space-x-4 ${bgColor}`}>
        <div className="flex-shrink-0">{icon}</div>
        <div>
            <h4 className={`text-lg font-bold ${textColor}`}>{type} Certificate</h4>
            <p className={`text-sm ${textColor} opacity-90`}>{rule}</p>
        </div>
    </div>
);

const GoldIcon = () => (
    <svg className="w-12 h-12 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);
const SilverIcon = () => (
    <svg className="w-12 h-12 text-slate-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);
const BronzeIcon = () => (
    <svg className="w-12 h-12 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);

const CertificateShowcase: React.FC = () => {
    return (
        <div className="my-6 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Certificate Tiers</h3>
            <CertificateTier
                type="Gold"
                icon={<GoldIcon />}
                rule="Awarded for an excellent score of 81% or higher."
                bgColor="bg-amber-100"
                textColor="text-amber-800"
            />
            <CertificateTier
                type="Silver"
                icon={<SilverIcon />}
                rule="Awarded for a great score of 71% to 80%."
                bgColor="bg-slate-200"
                textColor="text-slate-800"
            />
            <CertificateTier
                type="Bronze"
                icon={<BronzeIcon />}
                rule="Awarded for a good score of 61% to 70%."
                bgColor="bg-orange-200"
                textColor="text-orange-900"
            />
            <p className="text-xs text-center text-gray-600 pt-2">Scores 60% and below receive a personalized improvement report to help you succeed next time!</p>
        </div>
    );
};

export default CertificateShowcase;
