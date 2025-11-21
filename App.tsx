import React, { useState } from 'react';
import { QualityModel, Duration, WizardData, GeneratedPrompts } from './types';
import { Step1Format, Step2Identity, Step3Cinematography, Step4Movement } from './components/WizardSteps';
import { generateSoraPrompts } from './services/geminiService';
import { ChevronRight, ChevronLeft, Wand2, Copy, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';

const INITIAL_DATA: WizardData = {
  style: '',
  duration: Duration.Sec4,
  quality: QualityModel.Sora2Pro,
  characterBible: '',
  props: '',
  framing: '',
  lensing: '',
  lighting: '',
  action: '',
  cameraMovement: '',
  continuity: '',
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardData>(INITIAL_DATA);
  const [prompts, setPrompts] = useState<GeneratedPrompts | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<'fr' | 'en' | null>(null);

  const updateField = (field: keyof WizardData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((p) => p + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((p) => p - 1);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateSoraPrompts(formData);
      setPrompts(result);
      setCurrentStep(5);
    } catch (err) {
      setError("Failed to generate prompts. Please ensure your API Key is valid and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_DATA);
    setPrompts(null);
    setCurrentStep(1);
    setError(null);
  };

  const copyToClipboard = async (text: string, key: 'fr' | 'en') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between items-center mb-8 px-2">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step === currentStep
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50 scale-110'
                  : step < currentStep || (currentStep === 5 && step === 5)
                  ? 'bg-indigo-900 text-indigo-200'
                  : 'bg-gray-800 text-gray-500'
              }`}
            >
              {step === 5 ? <Wand2 className="w-4 h-4" /> : step}
            </div>
            <span className="text-[10px] mt-1 text-gray-500 font-medium uppercase tracking-wider">
              {step === 1 ? 'Format' : step === 2 ? 'Identity' : step === 3 ? 'Cinema' : step === 4 ? 'Action' : 'Result'}
            </span>
          </div>
        ))}
        {/* Progress Bar Background */}
        <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-800 -z-10 hidden" />
      </div>
    );
  };

  const renderContent = () => {
    if (currentStep === 5 && prompts) {
      return (
        <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
              Prompts Optimized
            </h2>
            <p className="text-gray-400">Ready for Sora 2 deployment.</p>
          </div>

          {/* English Prompt */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
             <div className="flex justify-between items-start mb-3">
               <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-900/30 px-2 py-1 rounded">English Version</span>
               <div className="text-xs text-gray-500">{prompts.charCountEn} / 1000 chars</div>
             </div>
             <p className="text-gray-200 leading-relaxed font-mono text-sm whitespace-pre-wrap mb-4">
               {prompts.english}
             </p>
             <button
                onClick={() => copyToClipboard(prompts.english, 'en')}
                className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors ml-auto bg-gray-700/50 hover:bg-gray-700 px-3 py-1.5 rounded-lg"
             >
               {copiedKey === 'en' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
               {copiedKey === 'en' ? 'Copied' : 'Copy Prompt'}
             </button>
          </div>

          {/* French Prompt */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
             <div className="flex justify-between items-start mb-3">
               <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-900/30 px-2 py-1 rounded">French Version</span>
               <div className="text-xs text-gray-500">{prompts.charCountFr} / 1000 chars</div>
             </div>
             <p className="text-gray-200 leading-relaxed font-mono text-sm whitespace-pre-wrap mb-4">
               {prompts.french}
             </p>
             <button
                onClick={() => copyToClipboard(prompts.french, 'fr')}
                className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors ml-auto bg-gray-700/50 hover:bg-gray-700 px-3 py-1.5 rounded-lg"
             >
               {copiedKey === 'fr' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
               {copiedKey === 'fr' ? 'Copier' : 'Copier Prompt'}
             </button>
          </div>

          <div className="flex justify-center pt-6">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-6 py-2 rounded-full border border-gray-700 hover:border-gray-500"
            >
              <RotateCcw className="w-4 h-4" />
              Create New Prompt
            </button>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1: return <Step1Format data={formData} updateData={updateField} />;
      case 2: return <Step2Identity data={formData} updateData={updateField} />;
      case 3: return <Step3Cinematography data={formData} updateData={updateField} />;
      case 4: return <Step4Movement data={formData} updateData={updateField} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 flex items-center justify-center p-4 md:p-8">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-2xl z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              Sora 2
            </span> Prompt Architect
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Powered by Gemini 2.5 • High Fidelity Video Generation
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#121214] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Progress Bar */}
          <div className="h-1 w-full bg-gray-900">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>

          <div className="p-6 md:p-8">
            {currentStep < 5 && renderStepIndicator()}
            
            <div className="min-h-[400px]">
              {renderContent()}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-3 text-red-200 text-sm animate-in fade-in slide-in-from-bottom-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Navigation Footer */}
            {currentStep < 5 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1 || isLoading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentStep === 1 
                      ? 'text-gray-600 cursor-not-allowed' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-gray-100 text-black px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-white transition-all transform active:scale-95"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className={`flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-2.5 rounded-lg text-sm font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25 transform active:scale-95 ${
                      isLoading ? 'opacity-70 cursor-wait' : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Wand2 className="w-4 h-4 animate-spin" />
                        Synthesizing...
                      </>
                    ) : (
                      <>
                        Generate Prompt
                        <Wand2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;