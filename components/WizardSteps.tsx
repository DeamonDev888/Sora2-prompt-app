import React from 'react';
import { WizardData, QualityModel, Duration } from '../types';
import { Film, User, Camera, Zap, Info } from 'lucide-react';

interface StepProps {
  data: WizardData;
  updateData: (field: keyof WizardData, value: string) => void;
}

// --- Reusable Input Components ---

const Label: React.FC<{ children: React.ReactNode; icon?: React.ReactNode; tooltip?: string }> = ({ children, icon, tooltip }) => (
  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
    {icon && <span className="text-indigo-400">{icon}</span>}
    {children}
    {tooltip && (
      <div className="group relative">
        <Info className="w-4 h-4 text-gray-500 cursor-help" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-800 text-xs text-gray-200 rounded border border-gray-700 shadow-xl z-10 pointer-events-none">
          {tooltip}
        </div>
      </div>
    )}
  </label>
);

const TextArea: React.FC<{ 
  value: string; 
  onChange: (val: string) => void; 
  placeholder: string; 
  rows?: number 
}> = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea
    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none text-sm"
    rows={rows}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

const SelectButton: React.FC<{
  selected: boolean;
  onClick: () => void;
  label: string;
  subLabel?: string;
}> = ({ selected, onClick, label, subLabel }) => (
  <button
    onClick={onClick}
    className={`flex-1 p-3 rounded-lg border text-left transition-all ${
      selected 
        ? 'bg-indigo-900/20 border-indigo-500 ring-1 ring-indigo-500' 
        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
    }`}
  >
    <div className={`font-medium ${selected ? 'text-indigo-300' : 'text-gray-300'}`}>{label}</div>
    {subLabel && <div className="text-xs text-gray-500 mt-1">{subLabel}</div>}
  </button>
);

// --- Steps ---

export const Step1Format: React.FC<StepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 mb-6">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <Film className="w-5 h-5 text-indigo-400" />
          Format & Style
        </h3>
        <p className="text-sm text-gray-400">Define the visual foundation of your generated video.</p>
      </div>

      <div>
        <Label>Visual Style & Tone</Label>
        <TextArea
          value={data.style}
          onChange={(v) => updateData('style', v)}
          placeholder="e.g., Cinematic ad, 1970s romantic drama, Hand-painted 2D/3D hybrid, Hyper-realistic documentary..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Duration</Label>
          <div className="flex gap-3">
            {[Duration.Sec4, Duration.Sec8, Duration.Sec12].map((dur) => (
              <SelectButton
                key={dur}
                selected={data.duration === dur}
                onClick={() => updateData('duration', dur)}
                label={dur}
              />
            ))}
          </div>
        </div>

        <div>
          <Label tooltip="Sora 2 Pro offers better prompt adherence and understanding.">Model Version</Label>
          <div className="flex gap-3">
            {[QualityModel.Sora2, QualityModel.Sora2Pro].map((model) => (
              <SelectButton
                key={model}
                selected={data.quality === model}
                onClick={() => updateData('quality', model)}
                label={model}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Step2Identity: React.FC<StepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 mb-6">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-400" />
          Identity & Locks
        </h3>
        <p className="text-sm text-gray-400">Establish invariants to prevent hallucinations or morphing objects.</p>
      </div>

      <div>
        <Label tooltip="Describe immutable traits: Age, gender, specific clothing details (e.g. 'coffee stain on left cuff').">
          Character Bible (Identity Lock)
        </Label>
        <TextArea
          value={data.characterBible}
          onChange={(v) => updateData('characterBible', v)}
          placeholder="e.g., A 30-year-old mechanic, grease-stained blue jumpsuit, scar above right eyebrow. Wears a silver analog watch on left wrist."
          rows={4}
        />
      </div>

      <div>
        <Label tooltip="Objects that must not disappear or change shape.">
          Props & Object Continuity
        </Label>
        <TextArea
          value={data.props}
          onChange={(v) => updateData('props', v)}
          placeholder="e.g., Holding a red ceramic mug with a chipped rim in the right hand throughout the shot."
        />
      </div>
    </div>
  );
};

export const Step3Cinematography: React.FC<StepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 mb-6">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <Camera className="w-5 h-5 text-indigo-400" />
          Cinematography
        </h3>
        <p className="text-sm text-gray-400">Speak the language of the camera to control the shot.</p>
      </div>

      <div>
        <Label>Framing & Composition</Label>
        <TextArea
          value={data.framing}
          onChange={(v) => updateData('framing', v)}
          placeholder="e.g., Wide establishing shot, Extreme close-up on eye, Low angle hero shot..."
        />
      </div>

      <div>
        <Label tooltip="Mention focal length (24mm, 50mm, 85mm) and Depth of Field (shallow/deep).">
          Lensing & Optics
        </Label>
        <TextArea
          value={data.lensing}
          onChange={(v) => updateData('lensing', v)}
          placeholder="e.g., Anamorphic 2.0x lens, 85mm, shallow depth of field, creamy bokeh background."
        />
      </div>

      <div>
        <Label>Lighting & Atmosphere</Label>
        <TextArea
          value={data.lighting}
          onChange={(v) => updateData('lighting', v)}
          placeholder="e.g., Golden hour soft backlight, harsh neon cyberpunk green and pink, volumetric fog, high contrast chiaroscuro."
        />
      </div>
    </div>
  );
};

export const Step4Movement: React.FC<StepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 mb-6">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <Zap className="w-5 h-5 text-indigo-400" />
          Movement & Physics
        </h3>
        <p className="text-sm text-gray-400">Choreograph the subject and the camera.</p>
      </div>

      <div>
        <Label tooltip="Describe the primary action clearly. One shot = one main action.">
          Main Action (The Beat)
        </Label>
        <TextArea
          value={data.action}
          onChange={(v) => updateData('action', v)}
          placeholder="e.g., The mechanic wipes sweat from his forehead and looks up at the sky."
          rows={3}
        />
      </div>

      <div>
        <Label>Camera Movement</Label>
        <TextArea
          value={data.cameraMovement}
          onChange={(v) => updateData('cameraMovement', v)}
          placeholder="e.g., Slow push-in (dolly forward), Handheld shake, Steady tracking shot to the right."
        />
      </div>

      <div>
        <Label tooltip="Define laws of physics or consistency rules for this specific shot.">
          Continuity & Physics Rules
        </Label>
        <TextArea
          value={data.continuity}
          onChange={(v) => updateData('continuity', v)}
          placeholder="e.g., Hair moves naturally in the wind. Smoke rises vertically. No sudden morphing of background elements."
        />
      </div>
    </div>
  );
};