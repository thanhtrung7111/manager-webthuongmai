export type MenuItemObject = {
  [key: string]: any;
};

export type BreadcrumbItemObject = {
  [key: string]: any;
};

export type LoginObject = {
  APP_CODE: string;
  USERLGIN: string;
  PASSWORD: string;
  LGINTYPE: string;
  SYSTCHAR: string;
  INPTCHAR: string;
  PHONNAME: string;
  TKENDEVC: string;
};

export type LoginLocationObject = {
  COMPCODE: string;
  LCTNCODE: string;
};

export type LctnCodeObject = {
  LCTNCODE: string;
  LCTNNAME: string;
};

export type CompcodeObject = {
  COMPCODE: string;
  COMPNAME: string;
  IMGELIST: string[];
  LCTNLIST: LctnCodeObject[];
};

export type ProductObject = {
  ACCERGHT: number;
  COMPCODE: string;
  CURRCODE: string;
  CUSTCODE: string;
  CUSTNAME: string;
  DDDD: string;
  DSCNAMNT: number;
  DSCNRATE: number;
  EXCHQTTY: number;
  JSTFDATE: string;
  KKKK0000: string;
  PRCEDSCN: number;
  PRCESALE: number;
  PRDCBRIF: number;
  PRDCCODE: number;
  PRDCDESC: string;
  PRDCIMGE: string;
  PRDCNAME: string;
  QUOMCODE: number;
  QUOMNAME: string;
  SHOPCODE: string;
  SHOPNAME: string;
  STTEICON: number;
  STTENAME: string;
  STTESIGN: number;
  [key: string]: any;
};

export type ProductUpdateObject = {
  COMPCODE: string | null | undefined;
  PRDCCODE: string | null | undefined;
  LCTNCODE: string | null | undefined;
  MPRDCNME: string | null | undefined;
  SCTNCODE: string | null | undefined;
  GRPRCODE: string | null | undefined;
  BRNDCODE: string | null | undefined;
  COLRCODE: string | null | undefined;
  MDELPRDC: string | null | undefined;
  BRIFNAME: string | null | undefined;
  QUOMCODE: number | null | undefined;
  VAT_RATE: number | null | undefined;
  STDRQUOM: number | null | undefined;
  MNFRTYPE: number | null | undefined;
  PRDCPICT: string | null | undefined;
  CURRCODE: string | null | undefined;
  SORTCODE: number | null | undefined;
  GRP_MNFR: string | null | undefined;
  DCMNSBCD: string | null | undefined;
  DDDD: string | null | undefined;
  ACCERGHT: number | null | undefined;
  STTESIGN: number | null | undefined;
  STTENAME: string | null | undefined;
  QRC_DATA: string | null | undefined;
  KKKK0000: string | null | undefined;
  DETAIL: any[];
  DCMNFILE: DcmnFileObject[];
};

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type CommonObject = {
  [key: string]: any;
};

export type SearchObjectProduct = {
  key: string;
  name: string;
  type: "text" | "combobox";
  dataList?: CommonObject[];
  dataKey?: keyof CommonObject;
  dataName?: keyof CommonObject;
};

export type CategoryObject = {
  ITEMATTR: string;
  ITEMCODE: string;
  ITEMNAME: string;
  ITEMODER: string;
  ITEMSRCH: string;
  ITEMTREE: string;
  ITEM_KEY: string;
  KEY_CODE: string;
  LISTCODE: string;
};

export type DataExcelPatternObject = {
  header: string;
  id: string;
  type: "list" | "single";
  dataKey?: string;
  dataName?: string;
  dataDemo?: string | number;
  data?: any[];
};

export type DataExcelObject = {
  header: string;
  id: string;
};

export type AdvertisementObject = {
  COMPCODE: string;
  LCTNCODE: string;
  BANRCODE: string;
  BANRNAME: string;
  BANRTYPE: string;
  OBJCTYPE: string;
  OBJCCODE: string;
  BANR_RUN: number;
  DDDD: string;
  ACCERGHT: number;
  STTESIGN: number;
  STTENAME: string;
  KKKK0000: string;
  DCMNFILE: { [key: string]: any }[];
};

export type AdvertisementUpdateObject = {
  KKKK0000: string;
  COMPCODE: string;
  LCTNCODE: string;
  BANRCODE: string;
  BANRNAME: string;
  BANRTYPE: string;
  OBJCCODE: string;
  OBJCTYPE: string;
  BANR_RUN: number;
  IMAGE_BANR: string;
};

export type PostUpdateObject = {
  COMPCODE: string | undefined | null;
  LCTNCODE: string | undefined | null;
  POSTCODE: string | undefined | null;
  POSTTITL: string | undefined | null;
  POSTSLUG: string | undefined | null;
  POST_TAG: string | undefined | null;
  DDDD: string | undefined | null;
  ACCERGHT: number | undefined | null;
  STTESIGN: number | undefined | null;
  STTENAME: string | undefined | null;
  KKKK0000: string | undefined | null;
  DCMNFILE: DcmnFileObject[] | [];
};

export type DcmnFileObject = {
  DCMNCODE: string | undefined | null;
  KEY_CODE: string | undefined | null;
  FILECODE: string | undefined | null;
  FILE_GRP: number | undefined | null;
  FILE_SRC: number | undefined | null;
  FILETYPE: string | undefined | null;
  FILENAME: string | undefined | null;
  FILE_URL: string | undefined | null;
  FILEDATA: string | undefined | null;
  KKKK0001: string | undefined | null;
};
