export default interface Shipping {
  name: string;
  size: string;
  maxHeight: number;
  g: number;
  cost: number;
  isAnonymous: boolean;
  isAvailable4Mercari: boolean;
  isAvailable4Rakuma: boolean;
}
