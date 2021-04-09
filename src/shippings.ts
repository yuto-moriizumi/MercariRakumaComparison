export interface Shipping {
  name: string;
  size: string;
  maxHeight: number;
  g: number;
  cost: number;
  isAnonymous: boolean;
  isAvailable4Mercari: boolean;
  isAvailable4Rakuma: boolean;
}

export const shippings: Shipping[] = [
  {
    name: 'ミニレター',
    size: '郵便書簡',
    maxHeight: 1,
    g: 25,
    cost: 62,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: '定型郵便',
    size: '縦23.5×横12',
    maxHeight: 1,
    g: 25,
    cost: 82,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: '定型郵便',
    size: '縦23.5×横12',
    maxHeight: 1,
    g: 50,
    cost: 92,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: '定型外郵便：規格内',
    size: '縦34×横25',
    maxHeight: 3,
    g: 50,
    cost: 120,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: '定型外郵便：規格内',
    size: '縦34×横25',
    maxHeight: 3,
    g: 100,
    cost: 140,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'らくらくメルカリ便 ネコポス',
    size: '31.2×22.8cm以内',
    maxHeight: 3,
    g: 1000,
    cost: 175,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: false,
  },
  {
    name: 'かんたんラクマパック ゆうパケット',
    size: '長辺34cm以内',
    maxHeight: 3,
    g: 1000,
    cost: 179,
    isAnonymous: true,
    isAvailable4Mercari: false,
    isAvailable4Rakuma: true,
  },
  {
    name: 'ゆうメール',
    size: '34×25cm以内',
    maxHeight: 3,
    g: 150,
    cost: 180,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'クリックポスト',
    size: '34×25cm以内',
    maxHeight: 3,
    g: 1000,
    cost: 198,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'かんたんラクマパック ネコポス',
    size: '31.2×22.8cm以内',
    maxHeight: 3,
    g: 1000,
    cost: 200,
    isAnonymous: false,
    isAvailable4Mercari: false,
    isAvailable4Rakuma: true,
  },
  {
    name: 'ゆうゆうメルカリ便 ゆうパケット',
    size: '3辺合計 60cm以内 長辺34cm',
    maxHeight: 3,
    g: 1000,
    cost: 200,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: false,
  },
  {
    name: '定型外郵便：規格外',
    size: '３辺合計90㎝以内・長辺60cm以内',
    maxHeight: 60,
    g: 50,
    cost: 200,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: '定型外郵便：規格内',
    size: '縦34×横25',
    maxHeight: 3,
    g: 150,
    cost: 205,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'ゆうメール',
    size: '34×25cm以内',
    maxHeight: 3,
    g: 250,
    cost: 215,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: '定型外郵便：規格外',
    size: '３辺合計90㎝以内',
    maxHeight: 60,
    g: 100,
    cost: 220,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'ゆうパケット',
    size: '３辺合計60cm以内',
    maxHeight: 1,
    g: 1000,
    cost: 250,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: '定型外郵便：規格内',
    size: '縦34×横25',
    maxHeight: 3,
    g: 250,
    cost: 250,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'ゆうゆうメルカリ便 ゆうパケットポスト',
    size: '縦32.5cm x 横22.5cm',
    maxHeight: 3,
    g: 2000,
    cost: 265,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: false,
  },
  {
    name: '定型外郵便：規格外',
    size: '３辺合計90㎝以内',
    maxHeight: 60,
    g: 150,
    cost: 290,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'ゆうメール',
    size: '34×25cm以内',
    maxHeight: 3,
    g: 500,
    cost: 300,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'ゆうパケット',
    size: '３辺合計60cm以内',
    maxHeight: 2,
    g: 1000,
    cost: 310,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: '定型外郵便：規格外',
    size: '３辺合計90㎝以内',
    maxHeight: 60,
    g: 250,
    cost: 340,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'ゆうメール',
    size: '34×25cm以内',
    maxHeight: 3,
    g: 1000,
    cost: 350,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'ゆうパケット',
    size: '３辺合計60cm以内',
    maxHeight: 3,
    g: 1000,
    cost: 360,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'レターパックライト',
    size: '34×24.8cm',
    maxHeight: 3,
    g: 4000,
    cost: 370,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: '定型外郵便：規格内',
    size: '縦34×横25',
    maxHeight: 3,
    g: 500,
    cost: 380,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'ゆうゆうメルカリ便 ゆうパケットプラス',
    size: '24×17cm以内',
    maxHeight: 7,
    g: 2000,
    cost: 440,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: false,
  },
  {
    name: 'らくらくメルカリ便 宅急便コンパクト',
    size: '縦25×横20',
    maxHeight: 5,
    g: 9999,
    cost: 450,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: false,
  },
  {
    name: '定型外郵便：規格外',
    size: '３辺合計90㎝以内',
    maxHeight: 60,
    g: 500,
    cost: 500,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'レターパックプラス',
    size: '34×24.8cm・厚さは入ればOK',
    maxHeight: 12,
    g: 4000,
    cost: 520,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: true,
  },
  {
    name: 'かんたんラクマパック 宅急便コンパクト',
    size: '縦25×横20',
    maxHeight: 5,
    g: 99999,
    cost: 600,
    isAnonymous: false,
    isAvailable4Mercari: false,
    isAvailable4Rakuma: true,
  },
  {
    name: 'ゆうゆうメルカリ便 ゆうパック 60サイズ',
    size: '3辺合計60cm以内',
    maxHeight: 60,
    g: 25000,
    cost: 700,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: false,
  },
  {
    name: 'らくらくメルカリ便 宅急便 60サイズ',
    size: '3辺合計60cm以内',
    maxHeight: 60,
    g: 2000,
    cost: 700,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: false,
  },
  {
    name: 'かんたんラクマパック ゆうパック 60サイズ',
    size: '3辺合計60cm以内',
    maxHeight: 60,
    g: 25000,
    cost: 700,
    isAnonymous: true,
    isAvailable4Mercari: false,
    isAvailable4Rakuma: true,
  },
  {
    name: 'ゆうゆうメルカリ便 ゆうパック 80サイズ',
    size: '3辺合計80cm以内',
    maxHeight: 80,
    g: 25000,
    cost: 800,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: false,
  },
  {
    name: 'らくらくメルカリ便 宅急便 80サイズ',
    size: '3辺合計80cm以内',
    maxHeight: 80,
    g: 5000,
    cost: 800,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: false,
  },
  {
    name: 'かんたんラクマパック 宅急便 60サイズ',
    size: '3辺合計60cm以内',
    maxHeight: 60,
    g: 2000,
    cost: 800,
    isAnonymous: false,
    isAvailable4Mercari: false,
    isAvailable4Rakuma: true,
  },
  {
    name: 'かんたんラクマパック 宅急便 80サイズ',
    size: '3辺合計80cm以内',
    maxHeight: 80,
    g: 5000,
    cost: 900,
    isAnonymous: false,
    isAvailable4Mercari: false,
    isAvailable4Rakuma: true,
  },
  {
    name: 'かんたんラクマパック ゆうパック 80サイズ',
    size: '3辺合計80cm以内',
    maxHeight: 80,
    g: 25000,
    cost: 900,
    isAnonymous: true,
    isAvailable4Mercari: false,
    isAvailable4Rakuma: true,
  },
  {
    name: 'ゆうゆうメルカリ便 ゆうパック 100サイズ',
    size: '3辺合計100cm以内',
    maxHeight: 100,
    g: 25000,
    cost: 1000,
    isAnonymous: true,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: false,
  },
  {
    name: 'らくらくメルカリ便 宅急便 100サイズ',
    size: '3辺合計100cm以内',
    maxHeight: 100,
    g: 10000,
    cost: 1000,
    isAnonymous: false,
    isAvailable4Mercari: true,
    isAvailable4Rakuma: false,
  },
];

// export default shippings;
