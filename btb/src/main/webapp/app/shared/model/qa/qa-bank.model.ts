export const enum Category {
  SERVICE = 'SERVICE',
  CONTROLLER = 'CONTROLLER',
  SECURITY = 'SECURITY'
}

export interface IQABank {
  id?: number;
  idQABank?: string;
  title?: string;
  contents?: string;
  gitUrl?: string;
  category?: Category;
}

export const defaultValue: Readonly<IQABank> = {};
