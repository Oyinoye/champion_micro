export interface IPlatform {
  id?: number;
  code?: string | null;
  description?: string | null;
}

export const defaultValue: Readonly<IPlatform> = {};
