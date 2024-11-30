export type DraftSchema = {
  id: number;
  json: {
    schemaName: string;
    description: string;
  }[];
  status: string;
};
