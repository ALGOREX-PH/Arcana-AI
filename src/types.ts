export interface TarotCard {
  id: string;
  name: string;
  description: string;
  upright: string[];
  reversed: string[];
  isReversed?: boolean;
}