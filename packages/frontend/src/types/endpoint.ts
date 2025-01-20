export type Endpoint = {
  name: string;
  routeName?: string;
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
  applicationSchemaId?: string;
};
