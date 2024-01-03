import { TransactionMethod, TransactionType } from '../consts';

export interface Transaction {
  id: string;
  currency: string;
  amount: string;
  creditAmount: string;
  type: string;
  method: string;
  status: string;
  payload?: {
    transferProof: string;
  };
}

interface CreateTransactionBasic {
  method: TransactionMethod;
  transactionType: TransactionType;
  wallet: string;
  amount: number;
  isCredit?: boolean;
}

export interface CreateDepositTransaction extends CreateTransactionBasic {
  payload: {
    transferProof: string;
  };
}

export interface CreateWithdrawalTransaction extends CreateTransactionBasic {
  payload: {
    transferTo: string;
  };
}
