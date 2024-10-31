import { FuturesBalanceResponse } from "./types";

export function createFuturesClient(
  tradeRoot: string,
  headers: any,
  fetch = globalThis.fetch
) {
  // exchange client endpoints
  const getBalance = async () => {
    return fetch(`${tradeRoot}/futures/balance`, {
      headers,
    }).then((res) => res.json()) as Promise<FuturesBalanceResponse>;
  };

  const getLedger = async (key: string) => {
    return fetch(`${tradeRoot}/futures/ledger?key=${key}`, {
      headers,
    }).then((res) => res.json()) as Promise<unknown>;
  };

  const queryHistoricalOrders = async (key: string) => {
    return fetch(`${tradeRoot}/futures/historical-orders?key=${key}`, {
      headers,
    }).then((res) => res.json()) as Promise<unknown>;
  };

  const placeOrder = async ({
    key,
    positionSide,
    quantity,
    side,
    symbol,
    type,
  }: {
    key: string;
    positionSide: string;
    quantity: number;
    side: string;
    symbol: string;
    type: string;
  }) => {
    return fetch(`${tradeRoot}/futures/place-order?key=${key}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ positionSide, quantity, side, symbol, type }),
    }).then((res) => res.json()) as Promise<unknown>;
  };

  const cancelOrder = async ({
    key,
    orderId,
    symbol,
  }: {
    key: string;
    orderId: number;
    symbol: string;
  }) => {
    return fetch(
      `${tradeRoot}/futures/cancel-order?key=${key}&orderId=${orderId}&symbol=${symbol}`,
      {
        method: "DELETE",
        headers,
      }
    ).then((res) => res.json()) as Promise<unknown>;
  };

  return {
    getBalance,
    getLedger,
    queryHistoricalOrders,
    placeOrder,
    cancelOrder,
  };
}
