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
  validationResult: {
    currentFields: string[] | null;
    validFields: any | null;
    message: string;
    valid: boolean;
  };
}


export interface Photo {
  id: string;
  hash: string;
  path: string;
  relativeToPath: string;
  filename: string;
  extension: string;
  sizeMB: number;
  takenDate: string; // ISO date string (e.g., "2025-03-27 17:12:48")
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

export interface Tag {
  id: string;
  name: string;
  parentId: string | null;
}

export interface TagEditorProps {
  tags: Tag[];
  onClose: () => void;
  onUpdate: (
      action: 'create' | 'update' | 'delete',
      tag: Tag | Omit<Tag, 'id'>
  ) => void;
}


export interface TagTreeNode extends Tag {
  children: TagTreeNode[];
}

export interface PhotoShootOption {
  value: string;
  label: string;
  valid: boolean;
  message?: string;
}