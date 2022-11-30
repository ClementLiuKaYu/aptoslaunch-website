// import logo from "src/assets/images/logo.png";

// export const NODE_URL = "https://fullnode.mainnet.aptoslabs.com"; // prod
// export const FAUCET_URL = "https://faucet.mainnet.aptoslabs.com"; // prod
export const NODE_URL = "https://fullnode.testnet.aptoslabs.com"; // aptos testnet
export const FAUCET_URL = "https://faucet.testnet.aptoslabs.com"; // aptos testnet
// /** 20221006 */export const SLC_OWNER_ADDRESS = "0xcab35668194b7d3e8d8afaac99ef186e2e70b6a4f43a5b572e6371bf87b10c95";
/** 20221007 */ export const OWNER_ADDRESS =
  "0xc2551e38e8d2aaf71b6f8b69458e6ebe5d649d4014fb90e546c95a394ca1f2f7";
export const TO_ADDRESS =
  "0xc2551e38e8d2aaf71b6f8b69458e6ebe5d649d4014fb90e546c95a394ca1f2f7";
export const APT_COIN_STORE =
  "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>";
export const ALT = `${OWNER_ADDRESS}::fake_alt::FakeALT`;
export const ALT_COIN_STORE = `0x1::coin::CoinStore<${OWNER_ADDRESS}::fake_alt::FakeALT>`;
export const tALT = `${OWNER_ADDRESS}::fake_coin::FakeCoin`;
export const tALT_COIN_STORE = `0x1::coin::CoinStore<${OWNER_ADDRESS}::fake_coin::FakeCoin>`;

export const coins = [
  { name: "ALT", type: ALT, coinStore: ALT_COIN_STORE },
  { name: "tALT", type: tALT, coinStore: tALT_COIN_STORE },
];

export const externalLinks = {
  twitter: "https://twitter.com/AptoslaunchIO",
  discord: "https://discord.gg/cC33ryfSx8",
  linktree: "https://linktr.ee/aptoslaunch",
  doc: "https://doc.aptoslaunch.io/",
  ido: "https://docs.google.com/forms/d/e/1FAIpQLSdRSu_Clbw7yWWZqM6QLKIbgyUwC875ZjljypG5NMRpOmfJoQ/viewform",
  pvtWhitelist:
    "https://docs.google.com/forms/d/e/1FAIpQLScJKmd_-3BzNs6fV8Zw4EOhffW5cLUrz99zB0XN95rPmO-UcQ/viewform?usp=sf_link",
  questTask: "https://aptoslaunch.crew3.xyz/questboard",
};

// export const discoverItems = [
//   {
//     image: logo,
//     header: "Aptos Launchpad",
//     content:
//       "Access AptosLaunch incubation, top tier projects before they hit the market",
//     url: "#",
//   },
//   {
//     image: logo,
//     header: "Stake Aptos",
//     content: "Get high staking yield & access staker benefits",
//     url: "#",
//   },
//   {
//     image: logo,
//     header: "And more...",
//     content: "We will keep expanding our prodcuts ecosystem",
//     url: null,
//   },
// ];

export const messages = {
  please_connect:
    "Please connect your wallet to the Smart Chain network to use.",
  please_connect_wallet: "Please connect your wallet.",
  before_minting: "Before minting, enter a value.",
  existing_mint:
    "You have an existing mint. Minting will reset your vesting period and forfeit any pending claimable rewards. We recommend claiming rewards first or using a fresh wallet. Do you still wish to proceed?",
  before_stake: "Before staking, enter a value.",
  before_unstake: "Before un staking, enter a value.",
  tx_successfully_send: "Your transaction was successful",
  balance_updated: "Your balance was successfully updated",
  nothing_to_claim: "You have nothing to claim",
  something_wrong: "Something went wrong",
  switch_to_fantom: "Switch to the Smart Chain network?",
  slippage_too_small: "Slippage too small",
  slippage_too_big: "Slippage too big",
  balance_update_soon: "Your balance will be updated soon",
};
