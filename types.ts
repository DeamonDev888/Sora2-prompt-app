export enum QualityModel {
  Sora2 = 'Sora 2',
  Sora2Pro = 'Sora 2 Pro'
}

export enum Duration {
  Sec4 = '4s',
  Sec8 = '8s',
  Sec12 = '12s'
}

export interface WizardData {
  // Step 1
  style: string;
  duration: Duration;
  quality: QualityModel;
  
  // Step 2
  characterBible: string;
  props: string;
  
  // Step 3
  framing: string;
  lensing: string;
  lighting: string;
  
  // Step 4
  action: string;
  cameraMovement: string;
  continuity: string;
}

export interface GeneratedPrompts {
  french: string;
  english: string;
  charCountFr: number;
  charCountEn: number;
}