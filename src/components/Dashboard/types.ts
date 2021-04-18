export type TypeSite = {
  id: number;
  url: string;
};

export type TypeTest = {
  id: number;
  name: string;
  type: string;
  status: string;
  siteId: number;
};

export type TypeCard = {
  id: number;
  url: string;
  name: string;
  type: string;
  status: string;
  siteId: number;
};

export type TypeCardInfo = {
  id: number;
  name: string;
  phase: string;
};

export type TypeFieldNames = {
  fieldName: string;
  className: string;
};
