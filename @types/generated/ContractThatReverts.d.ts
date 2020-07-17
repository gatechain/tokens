/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface ContractThatRevertsContract
  extends Truffle.Contract<ContractThatRevertsInstance> {
  "new"(
    meta?: Truffle.TransactionDetails
  ): Promise<ContractThatRevertsInstance>;
}

type AllEvents = never;

export interface ContractThatRevertsInstance extends Truffle.ContractInstance {
  setReason: {
    (reason: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(reason: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      reason: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      reason: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  reason(txDetails?: Truffle.TransactionDetails): Promise<string>;

  revertNoReason(txDetails?: Truffle.TransactionDetails): Promise<void>;

  revertWithReason(
    reasonMsg: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<void>;

  methods: {
    setReason: {
      (reason: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        reason: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        reason: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        reason: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    reason(txDetails?: Truffle.TransactionDetails): Promise<string>;

    revertNoReason(txDetails?: Truffle.TransactionDetails): Promise<void>;

    revertWithReason(
      reasonMsg: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}