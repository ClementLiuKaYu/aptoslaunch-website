import { NODE_URL, coins, tALT, ALT } from "../constants";
import {
  AptosAccount,
  AptosClient,
  HexString,
  TxnBuilderTypes,
  FaucetClient,
} from "aptos";
import store from "../redux/store";
import { updateWallet, updateBalanceStatus } from "../redux/applicationSlice";
import { sign } from "crypto";

const client = new AptosClient(NODE_URL);

type Wallet = {
  walletName: WalletName | null;
  address: string | null;
};

type WalletName =
  | "petra"
  | "martian"
  | "pontem"
  | "bitkeep"
  | "crypto"
  | "metamask";

const petraProvider = () => {
  if ("aptos" in window) {
    return window.aptos;
  }
  window.open("https://petra.app/", "_blank");
};

const martianProvider = () => {
  if ("martian" in window) {
    return window.martian;
  }
  window.open("https://www.martianwallet.xyz/", "_blank");
};

const pontemProvider = () => {
  if ("pontem" in window) {
    return window.pontem;
  }
  window.open("https://pontem.network/", "_blank");
};

const bitkeepProvider = () => {
  if ("bitkeep" in window) {
    return window.bitkeep;
  }
  window.open("https://bitkeep.com/download?type=2", "_blank");
};

const cryptoProvider = () => {
  if ("deficonnect" in window) {
    if ("aptos" in window.deficonnect) {
      return window.deficonnect.aptos;
    }
  }
  window.open("https://crypto.com/defi-wallet#wallet_extension", "_blank");
};

const metamaskProvider = () => {
  if ("ethereum" in window) {
    return window.ethereum;
  }
  window.open("https://metamask.io/", "_blank");
};

function getWallet(walletName: string) {
  switch (walletName) {
    case "petra":
      return petraProvider();
    case "martian":
      return martianProvider();
    case "pontem":
      return pontemProvider();
    case "bitkeep":
      return bitkeepProvider();
    case "crypto":
      return cryptoProvider();
    case "metamask":
      return metamaskProvider();
    default:
      return;
  }
}

const sleep = (seconds: number) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(null), seconds * 1000)
  );
};

async function connectWallet(walletName: WalletName, dispatch: any) {
  try {
    const res = await getWallet(walletName).connect();
    if (res) {
      await dispatch(
        updateWallet({ walletName: walletName, address: res.address as string })
      );
      await sleep(2);
      await checkAccountBalance();
    }
  } catch (e) {}
}

async function checkAccountBalance() {
  const address = store.getState().application.wallet.address;
  if (address != null) {
    const resources = await client.getAccountResources(address);
    const balanceList = coins.map((coin) => {
      const coinResource = resources.find(
        (resource) => resource.type === coin.coinStore
      );
      if (coinResource)
        return {
          coinStore: coinResource.type,
          amount: (coinResource.data as any)?.coin?.value / 10 ** 8 ?? 0,
        };
      return null;
    });
    store.dispatch(updateBalanceStatus(balanceList));
  }
}

async function registerCoin(token: string) {
  let regToken = token === "tALT" ? tALT : token === "ALT" ? ALT : [];
  let payload = {
    type: "entry_function_payload",
    function: "0x1::managed_coin::register",
    arguments: [],
    type_arguments: [regToken],
  };
  try {
    await signAndSubmitTransaction(payload);
  } finally {
    await checkAccountBalance();
  }
}

async function transferCoin(
  token: string,
  address: string,
  amount: number,
  callback?: Function
) {
  let payload = {
    function: "0x1::coin::transfer",
    type_arguments: [token],
    arguments: [address, amount * 10 ** 8],
  };
  try {
    const res = await signAndSubmitTransaction(payload);
    if (callback) {
      callback(res);
    }
    return res;
  } finally {
    await checkAccountBalance();
  }
}

async function signAndSubmitTransaction(payload: any) {
  const walletName = store.getState().application.wallet.walletName;
  switch (walletName) {
    case "martian":
      return signMartian(payload);
      break;
    case "petra":
      return signPetra(payload);
      break;
    case "pontem":
      return signPontem(payload);
      break;
    case "crypto":
      return signCrypto(payload);
      break;
    case "bitkeep":
      return signBitkeep(payload);
      break;
    default:
      break;
  }
}

async function signMartian(payload: any) {
  const wallet = getWallet("martian");
  const address = store.getState().application.wallet.address;
  try {
    let transaction = await wallet.generateTransaction(address, payload);
    let res = await wallet.signAndSubmitTransaction(transaction);
    if (res) {
      console.log("martian sign", res);
      //## add message?
      return res;
    }
  } catch (e) {
  } finally {
    await checkAccountBalance();
  }
}

async function signPetra(payload: any) {
  const wallet = getWallet("petra");
  try {
    let res = await wallet.signAndSubmitTransaction(payload);
    if (res) {
      console.log("petra sign", res);
      //## add message?
      return res.hash;
    }
  } catch (e) {
  } finally {
    await checkAccountBalance();
  }
}

async function signPontem(payload: any) {
  const wallet = getWallet("pontem");
  try {
    let res = await wallet.signAndSubmit(payload);
    if (res) {
      console.log("pontem sign", res);
      //## add message?
      return res.result.hash;
    }
  } catch (e) {
  } finally {
    await checkAccountBalance();
  }
}

async function signCrypto(payload: any) {
  const wallet = getWallet("crypto");
  try {
    let res = await wallet.signAndSubmitTransaction(payload);
    if (res) {
      console.log("crypto sign", res);
      //## add message?
      return res.hash;
    }
  } catch (e) {
  } finally {
    await checkAccountBalance();
  }
}

async function signBitkeep(payload: any) {
  const wallet = getWallet("bitkeep");
  try {
    let res = await wallet.signAndSubmitTransaction(payload);
    if (res) {
      console.log("bitkeep sign", res);
      //## add message?
      return res.hash;
    }
  } catch (e) {
  } finally {
    await checkAccountBalance();
  }
}

function parseAddress(str: string | null) {
  if (str == null) return "";
  if (str.length < 10) return str;
  return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
}

export {
  getWallet,
  connectWallet,
  checkAccountBalance,
  registerCoin,
  transferCoin,
  parseAddress,
};

export type { Wallet, WalletName };
