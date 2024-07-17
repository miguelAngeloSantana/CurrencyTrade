export default class ModelApiCoin {
    id: string
    name: string
    symbol: string
    image: string
    current_price: number
    price_change_percentage_24h: number
  
    constructor(
      id: string,
      name: string,
      symbol: string,
      image: string,
      current_price: number,
      price_change_percentage_24h: number
    ) {
      this.id = id;
      this.name = name;
      this.symbol = symbol;
      this.image = image
      this.current_price = current_price;
      this.price_change_percentage_24h = price_change_percentage_24h;
    }
  };
  