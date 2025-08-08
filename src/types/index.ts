export interface PhotoshootType {
  photoshootTypeEnum: string;
  uniteDeJour: number;
  nbMaxParUniteDeJour: number;
  ratioStarMin: number[] | null;
  ratioStarMax: number[] | null;
  zoneValeurAdmise: string[] | null;
  rapprochementNewOk: boolean;
  photoshootRoot: {
    name: string | null;
    path: string;
    description: string;
  }[];
}

export interface PhotoShoot {
  name: string;
  path: string;
  description: string | null;
  metaDataFromPhotoshoot: any | null;
  groupOfPhoto: any | null;
}


export interface Photo {
  id: string;
  hash: string;
  path: string;
  relativeToPath: string;
  filename: string;
  extension: string;
  createdDate: string; // ISO date string (e.g., "2025-03-27 17:12:48")
  exifDate: string;    // ISO date string (e.g., "2021-08-31 15:17:47")
  createDate: string | null;
  rating: number;
  label: string | null;
  pick: number;
  keywords: string[];
}

export interface PhotoshootNameNewDTO {
  photoshootNameNew: string;
}

export interface PhotoMetadataDTO {
  rating: number;
  pick: number;
  label: string;
  keywords: string[];
}