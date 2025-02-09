/*

Coded by Danielle Bagaforo Meer
Lets Connect : https://www.linkedin.com/in/algorexph

*/
export interface TarotCard {
  id: string;
  name: string;
  description: string;
  upright: string[];
  reversed: string[];
  isReversed?: boolean;
  image: string;
}