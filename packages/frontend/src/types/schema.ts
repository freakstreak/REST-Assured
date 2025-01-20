export type Schema = {
  id: string;
  name: string;
  json: {
    attributes: { name: string; type: string }[];
  };
};
