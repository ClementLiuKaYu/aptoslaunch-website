import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getWallet, Wallet } from "../helper/wallet";
import { coins } from "../constants";

interface ApplicationState {
  network: string;
  wallet: Wallet;
  balance: {
    tokenName: string;
    coinStore: string;
    isReg: boolean;
    amount: number;
  }[];
  whitelist: {
    tokenName: string;
    amount: number;
  }[];
}

const initialState: ApplicationState = {
  network: "aptos",
  wallet: {
    walletName: null,
    address: null,
  },
  balance: coins.map((coin) => {
    return {
      tokenName: coin.name,
      coinStore: coin.coinStore,
      amount: 0,
      isReg: false,
    };
  }),
  whitelist: [],
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    updateWallet: (state: ApplicationState, action: PayloadAction<Wallet>) => {
      state.wallet = action.payload;
    },
    disconnectWallet: (state: ApplicationState) => {
      if (state.wallet.walletName != null) {
        getWallet(state.wallet.walletName).disconnect();
      }
      state.wallet = { walletName: null, address: null };
      state.balance = coins.map((coin) => {
        return {
          tokenName: coin.name,
          coinStore: coin.coinStore,
          amount: 0,
          isReg: false,
        };
      });
      state.whitelist = [];
    },
    updateBalanceStatus: (
      state: ApplicationState,
      action: PayloadAction<
        ({
          coinStore: string;
          amount: number;
        } | null)[]
      >
    ) => {
      action.payload.forEach((token) => {
        let stateToken = state.balance.find(
          (e) => e.coinStore === token?.coinStore
        );
        if (stateToken) {
          stateToken.amount = token?.amount!;
          stateToken.isReg = true;
        }
      });
    },
  },
});

/**
 *  exports
 */

export const { updateWallet, disconnectWallet, updateBalanceStatus } =
  applicationSlice.actions;

export default applicationSlice.reducer;
