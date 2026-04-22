import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("🚀 Deploying Sovereign Wallet contracts...");

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);
  console.log(`Deployer balance: ${ethers.formatEther(await ethers.provider.getBalance(deployer.address))} ETH`);

  // Get EntryPoint address (using a testnet mock for now)
  // In production, use the official EntryPoint: 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789
  const entryPointAddress = process.env.ENTRY_POINT_ADDRESS || "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
  console.log(`EntryPoint address: ${entryPointAddress}`);

  // Example guardians (for testing)
  const guardians = [
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Hardhat account #1
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", // Hardhat account #2
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906", // Hardhat account #3
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", // Hardhat account #4
    "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", // Hardhat account #5
  ];

  // Deploy SovereignAccount
  console.log("\n📦 Deploying SovereignAccount...");
  const SovereignAccount = await ethers.getContractFactory("SovereignAccount");
  const sovereignAccount = await SovereignAccount.deploy(
    deployer.address, // owner
    guardians,        // guardians
    entryPointAddress // entry point
  );
  
  await sovereignAccount.waitForDeployment();
  const sovereignAccountAddress = await sovereignAccount.getAddress();
  console.log(`✅ SovereignAccount deployed to: ${sovereignAccountAddress}`);

  // Deploy AaveLendingModule
  console.log("\n📦 Deploying AaveLendingModule...");
  const AaveLendingModule = await ethers.getContractFactory("AaveLendingModule");
  const aaveModule = await AaveLendingModule.deploy(sovereignAccountAddress);
  
  await aaveModule.waitForDeployment();
  const aaveModuleAddress = await aaveModule.getAddress();
  console.log(`✅ AaveLendingModule deployed to: ${aaveModuleAddress}`);

  // Install module in SovereignAccount
  console.log("\n🔧 Installing Aave module in SovereignAccount...");
  const installTx = await sovereignAccount.installModule(aaveModuleAddress);
  await installTx.wait();
  console.log("✅ Aave module installed");

  // Verify contracts (if on supported network)
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("\n🔍 Verifying contracts on Etherscan...");
    
    // Wait for block confirmation
    console.log("Waiting for block confirmations...");
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    try {
      await hre.run("verify:verify", {
        address: sovereignAccountAddress,
        constructorArguments: [
          deployer.address,
          guardians,
          entryPointAddress
        ],
      });
      console.log("✅ SovereignAccount verified");
    } catch (error) {
      console.log("⚠️ SovereignAccount verification failed:", error);
    }

    try {
      await hre.run("verify:verify", {
        address: aaveModuleAddress,
        constructorArguments: [sovereignAccountAddress],
      });
      console.log("✅ AaveLendingModule verified");
    } catch (error) {
      console.log("⚠️ AaveLendingModule verification failed:", error);
    }
  }

  // Print deployment summary
  console.log("\n🎉 Deployment Summary:");
  console.log("=====================");
  console.log(`Network: ${hre.network.name}`);
  console.log(`SovereignAccount: ${sovereignAccountAddress}`);
  console.log(`AaveLendingModule: ${aaveModuleAddress}`);
  console.log(`Owner: ${deployer.address}`);
  console.log(`Guardians: ${guardians.length} addresses`);
  console.log(`EntryPoint: ${entryPointAddress}`);
  
  // Save deployment info to file
  const deploymentInfo = {
    network: hre.network.name,
    timestamp: new Date().toISOString(),
    contracts: {
      sovereignAccount: sovereignAccountAddress,
      aaveLendingModule: aaveModuleAddress,
    },
    owner: deployer.address,
    guardians: guardians,
    entryPoint: entryPointAddress,
  };

  const fs = require("fs");
  const deploymentsDir = "./deployments";
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }
  
  const networkName = hre.network.name;
  fs.writeFileSync(
    `${deploymentsDir}/deployment-${networkName}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log(`\n📄 Deployment info saved to: deployments/deployment-${networkName}.json`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});