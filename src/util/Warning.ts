export interface Warning {
  warningType: string;
  warningLevel: number;
  extraInfo: string[];
  isCritical: boolean;
}