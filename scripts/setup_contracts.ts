// eslint-disable-next-line node/no-unpublished-import
import { ethers, run } from "hardhat";
const fs = require("fs");
const constants = require("./constants");

function loadJsonFile() {
  const filePath = constants.stakingContractsFile;
  const data = fs.readFileSync(filePath);
  let jsonObject = JSON.parse(data);
  return jsonObject;
}


function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function setUserAdmin(userAddress: string) {
  const addressList = loadJsonFile();
  const stakingManager = await ethers.getContractAt(
    "WooStakingManager", addressList["WooStakingManager"]);
  const mpRewarder = await ethers.getContractAt(
    "MpRewarder", addressList["MpRewarder"]);
  const usdcRewarder = await ethers.getContractAt(
      "SimpleRewarder", addressList["UsdcRewarder"]);
  const wethRewarder = await ethers.getContractAt(
    "SimpleRewarder", addressList["WethRewarder"]);
  const booster = await ethers.getContractAt(
    "RewardBooster", addressList["RewardBooster"]);
  const wooStakingCompounder = await ethers.getContractAt(
    "WooStakingCompounder", addressList["WooStakingCompounder"]);
  const wooStakingController = await ethers.getContractAt(
      "WooStakingController", addressList["WooStakingController"]);
  const wooStakingProxy = await ethers.getContractAt(
        "WooStakingProxy", addressList["WooStakingProxy"]);

  await stakingManager.setAdmin(userAddress, true);
  await sleep(constants.sleepSeconds);
  console.log("stakingManager setAdmin: %s", userAddress);
  
  await mpRewarder.setAdmin(userAddress, true);
  await sleep(constants.sleepSeconds);
  console.log("mpRewarder setAdmin: %s", userAddress);
  
  await usdcRewarder.setAdmin(userAddress, true);
  await sleep(constants.sleepSeconds);
  console.log("usdcRewarder setAdmin: %s", userAddress);

  await wethRewarder.setAdmin(userAddress, true);
  await sleep(constants.sleepSeconds);
  console.log("wethRewarder setAdmin: %s", userAddress);

  await booster.setAdmin(userAddress, true);
  await sleep(constants.sleepSeconds);
  console.log("booster setAdmin: %s", userAddress);

  await wooStakingController.setAdmin(userAddress, true);
  await sleep(constants.sleepSeconds);
  console.log("wooStakingController setAdmin: %s", userAddress);

  await wooStakingCompounder.setAdmin(userAddress, true);
  await sleep(constants.sleepSeconds);
  console.log("wooStakingCompounder setAdmin: %s", userAddress);

  await wooStakingProxy.setAdmin(userAddress, true);
  await sleep(constants.sleepSeconds);
  console.log("wooStakingProxy setAdmin: %s", userAddress);
}

async function setupContracts() {
  const addressList = loadJsonFile();
  const stakingManager = await ethers.getContractAt(
    "WooStakingManager", addressList["WooStakingManager"]);
  const mpRewarder = await ethers.getContractAt(
    "MpRewarder", addressList["MpRewarder"]);
  const usdcRewarder = await ethers.getContractAt(
      "SimpleRewarder", addressList["UsdcRewarder"]);
  const wethRewarder = await ethers.getContractAt(
    "SimpleRewarder", addressList["WethRewarder"]);
  const booster = await ethers.getContractAt(
    "RewardBooster", addressList["RewardBooster"]);
  const wooStakingCompounder = await ethers.getContractAt(
    "WooStakingCompounder", addressList["WooStakingCompounder"]);
  const wooStakingController = await ethers.getContractAt(
      "WooStakingController", addressList["WooStakingController"]);
  const wooStakingProxy = await ethers.getContractAt(
    "WooStakingProxy", addressList["WooStakingProxy"]);

  await stakingManager.setStakingProxy(wooStakingProxy.address);
  await sleep(constants.sleepSeconds);
  console.log("setStakingProxy: %s", wooStakingProxy.address);

  await stakingManager.setMPRewarder(mpRewarder.address);
  await sleep(constants.sleepSeconds);
  console.log("setMPRewarder: %s", mpRewarder.address);

  await stakingManager.setCompounder(wooStakingCompounder.address);
  await sleep(constants.sleepSeconds);
  console.log("setCompounder: %s", wooStakingCompounder.address);

  await stakingManager.addRewarder(usdcRewarder.address);
  await sleep(constants.sleepSeconds);
  console.log("add usdc rewarder: %s", usdcRewarder.address);

  await stakingManager.addRewarder(wethRewarder.address);
  await sleep(constants.sleepSeconds);
  console.log("add weth rewarder: %s", wethRewarder.address);

  await stakingManager.setAdmin(wooStakingController.address, true);
  await sleep(constants.sleepSeconds);
  console.log("staking manager setAdmin: %s", wooStakingController.address);

  await mpRewarder.setBooster(booster.address);
  await sleep(constants.sleepSeconds);
  console.log("mprewarder setBooster: %s", booster.address);

  await mpRewarder.setAdmin(stakingManager.address, true);
  await sleep(constants.sleepSeconds);
  console.log("mprewarder setAdmin: %s", stakingManager.address);

  await usdcRewarder.setAdmin(stakingManager.address, true);
  await sleep(constants.sleepSeconds);
  console.log("usdc rewarder setAdmin: %s", stakingManager.address);

  await wethRewarder.setAdmin(stakingManager.address, true);
  await sleep(constants.sleepSeconds);
  console.log("weth rewarder setAdmin: %s", stakingManager.address);

}

async function main() {
  await setupContracts();
  await setUserAdmin(constants.user1);
  await setUserAdmin(constants.user2);
  await setUserAdmin(constants.user3);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



