export type CoinCode =
  | "BTC"
  | "USDT"
  | "TRX"
  | "LTC"
  | "ETH"
  | "TON"
  | "NOT"
  | "SOL"
  | "DOGE";

export type NetworkCode =
  | "BTC"
  | "TRC20"
  | "BEP20"
  | "TRX"
  | "LTC"
  | "ERC20"
  | "TON"
  | "SOL"
  | "DOGE";

export type Coin = {
  code: CoinCode;
  name: string;
  networks: Array<{
    network: NetworkCode;
    label: string;
    depositAddress: string; // public address (placeholder)
    memoLabel?: string;     // e.g., "Memo/Comment"
    note?: string;
  }>;
};

export const COINS: Coin[] = [
  {
    code: "BTC",
    name: "Bitcoin",
    networks: [
      { network: "BTC", label: "Bitcoin", depositAddress: "bc1qREPLACE_WITH_YOUR_BTC_ADDRESS" }
    ]
  },
  {
    code: "USDT",
    name: "Tether",
    networks: [
      { network: "TRC20", label: "TRC20 (Tron)", depositAddress: "T_REPLACE_WITH_USDT_TRC20_ADDRESS", note: "Низкая комиссия сети" },
      { network: "BEP20", label: "BEP20 (BSC)", depositAddress: "0xREPLACE_WITH_USDT_BEP20_ADDRESS", note: "Убедись, что отправляешь в сети BSC" }
    ]
  },
  {
    code: "TRX",
    name: "Tron",
    networks: [
      { network: "TRX", label: "Tron", depositAddress: "T_REPLACE_WITH_TRX_ADDRESS" }
    ]
  },
  {
    code: "LTC",
    name: "Litecoin",
    networks: [
      { network: "LTC", label: "Litecoin", depositAddress: "ltc1qREPLACE_WITH_LTC_ADDRESS" }
    ]
  },
  {
    code: "ETH",
    name: "Ethereum",
    networks: [
      { network: "ERC20", label: "Ethereum (ERC20)", depositAddress: "0xREPLACE_WITH_ETH_ADDRESS", note: "Комиссия сети может быть высокой" }
    ]
  },
  {
    code: "TON",
    name: "Toncoin",
    networks: [
      { network: "TON", label: "TON", depositAddress: "EQREPLACE_WITH_TON_ADDRESS", memoLabel: "Comment", note: "Если используешь биржу — может понадобиться comment" }
    ]
  },
  {
    code: "NOT",
    name: "Notcoin",
    networks: [
      { network: "TON", label: "TON", depositAddress: "EQREPLACE_WITH_NOT_ADDRESS", memoLabel: "Comment", note: "NOT в сети TON" }
    ]
  },
  {
    code: "SOL",
    name: "Solana",
    networks: [
      { network: "SOL", label: "Solana", depositAddress: "SoLREPLACE_WITH_SOL_ADDRESS", memoLabel: "Memo", note: "Иногда нужен memo, если адрес биржевой" }
    ]
  },
  {
    code: "DOGE",
    name: "Dogecoin",
    networks: [
      { network: "DOGE", label: "Dogecoin", depositAddress: "DREPLACE_WITH_DOGE_ADDRESS" }
    ]
  }
];

export const COIN_CODES = COINS.map(c => c.code);
