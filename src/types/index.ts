export interface SeanceType {
  id: string;
  name: string;
  uniteDeJour: number;
  nbMaxParUniteDeJour: number;
  ratioStarMax: number[] | null;
  zoneValeurAdmise: string[] | null;
}

export interface SeanceRepertoire {
  id: string;
  path: string;
  name?: string;
}

export interface Photo {
  id: string;
  url: string;
  path: string;
  thumbnail: string | null;
  flagged: boolean;
  flagType?: 'pick' | 'reject';
  starred: number;
  date_taken: string;
}
