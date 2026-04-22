import { expect } from "chai";
import { ethers } from "hardhat";
import { SovereignAccount } from "../typechain-types";
import { Signer } from "ethers";

describe("SovereignAccount", function () {
  let sovereignAccount: SovereignAccount;
  let owner: Signer;
  let guardian1: Signer;
  let guardian2: Signer;
  let guardian3: Signer;
  let guardian4: Signer;
  let guardian5: Signer;
  let stranger: Signer;
  
  let ownerAddress: string;
  let guardian1Address: string;
  let guardian2Address: string;
  let guardian3Address: string;
  let guardian4Address: string;
  let guardian5Address: string;
  let strangerAddress: string;

  // Mock EntryPoint address (for testing)
  const mockEntryPoint = "0x0000000000000000000000000000000000000001";

  beforeEach(async function () {
    [owner, guardian1, guardian2, guardian3, guardian4, guardian5, stranger] = await ethers.getSigners();
    
    ownerAddress = await owner.getAddress();
    guardian1Address = await guardian1.getAddress();
    guardian2Address = await guardian2.getAddress();
    guardian3Address = await guardian3.getAddress();
    guardian4Address = await guardian4.getAddress();
    guardian5Address = await guardian5.getAddress();
    strangerAddress = await stranger.getAddress();

    const guardians = [
      guardian1Address,
      guardian2Address,
      guardian3Address,
      guardian4Address,
      guardian5Address,
    ];

    const SovereignAccountFactory = await ethers.getContractFactory("SovereignAccount");
    sovereignAccount = await SovereignAccountFactory.deploy(
      ownerAddress,
      guardians,
      mockEntryPoint
    );
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await sovereignAccount.owner()).to.equal(ownerAddress);
    });

    it("Should set the right guardians", async function () {
      const guardians = await sovereignAccount.getGuardians();
      expect(guardians).to.have.lengthOf(5);
      expect(guardians[0]).to.equal(guardian1Address);
      expect(guardians[1]).to.equal(guardian2Address);
      expect(guardians[2]).to.equal(guardian3Address);
      expect(guardians[3]).to.equal(guardian4Address);
      expect(guardians[4]).to.equal(guardian5Address);
    });

    it("Should reject zero address owner", async function () {
      const SovereignAccountFactory = await ethers.getContractFactory("SovereignAccount");
      const guardians = [guardian1Address, guardian2Address, guardian3Address];
      
      await expect(
        SovereignAccountFactory.deploy(
          ethers.ZeroAddress,
          guardians,
          mockEntryPoint
        )
      ).to.be.revertedWith("SovereignAccount: owner cannot be zero");
    });

    it("Should reject invalid guardians count", async function () {
      const SovereignAccountFactory = await ethers.getContractFactory("SovereignAccount");
      
      // Too few guardians
      await expect(
        SovereignAccountFactory.deploy(
          ownerAddress,
          [guardian1Address, guardian2Address], // Only 2 guardians
          mockEntryPoint
        )
      ).to.be.revertedWith("SovereignAccount: invalid guardians count");
      
      // Too many guardians
      const tooManyGuardians = Array(11).fill(guardian1Address); // 11 guardians
      await expect(
        SovereignAccountFactory.deploy(
          ownerAddress,
          tooManyGuardians,
          mockEntryPoint
        )
      ).to.be.revertedWith("SovereignAccount: invalid guardians count");
    });

    it("Should reject duplicate guardians", async function () {
      const SovereignAccountFactory = await ethers.getContractFactory("SovereignAccount");
      const duplicateGuardians = [
        guardian1Address,
        guardian1Address, // Duplicate
        guardian2Address,
      ];
      
      await expect(
        SovereignAccountFactory.deploy(
          ownerAddress,
          duplicateGuardians,
          mockEntryPoint
        )
      ).to.be.revertedWith("SovereignAccount: duplicate guardian");
    });
  });

  describe("Guardian Management", function () {
    it("Should add a new guardian", async function () {
      const newGuardian = strangerAddress;
      
      await sovereignAccount.connect(owner).addGuardian(newGuardian);
      
      const guardians = await sovereignAccount.getGuardians();
      expect(guardians).to.have.lengthOf(6);
      expect(guardians[5]).to.equal(newGuardian);
      expect(await sovereignAccount.isGuardian(newGuardian)).to.be.true;
    });

    it("Should reject adding guardian by non-owner", async function () {
      await expect(
        sovereignAccount.connect(stranger).addGuardian(strangerAddress)
      ).to.be.revertedWith("SovereignAccount: only owner");
    });

    it("Should reject adding zero address guardian", async function () {
      await expect(
        sovereignAccount.connect(owner).addGuardian(ethers.ZeroAddress)
      ).to.be.revertedWith("SovereignAccount: guardian cannot be zero");
    });

    it("Should reject adding owner as guardian", async function () {
      await expect(
        sovereignAccount.connect(owner).addGuardian(ownerAddress)
      ).to.be.revertedWith("SovereignAccount: guardian cannot be owner");
    });

    it("Should reject adding duplicate guardian", async function () {
      await expect(
        sovereignAccount.connect(owner).addGuardian(guardian1Address)
      ).to.be.revertedWith("SovereignAccount: guardian already exists");
    });

    it("Should remove a guardian", async function () {
      // First add an extra guardian so we can remove one
      const extraGuardian = strangerAddress;
      await sovereignAccount.connect(owner).addGuardian(extraGuardian);
      
      // Now remove guardian1
      await sovereignAccount.connect(owner).removeGuardian(guardian1Address);
      
      const guardians = await sovereignAccount.getGuardians();
      expect(guardians).to.have.lengthOf(5);
      expect(await sovereignAccount.isGuardian(guardian1Address)).to.be.false;
      expect(await sovereignAccount.isGuardian(extraGuardian)).to.be.true;
    });

    it("Should reject removing guardian by non-owner", async function () {
      await expect(
        sovereignAccount.connect(stranger).removeGuardian(guardian1Address)
      ).to.be.revertedWith("SovereignAccount: only owner");
    });

    it("Should reject removing guardian below minimum", async function () {
      // We have 5 guardians, minimum is 3
      // Remove 3 guardians (leaving 2, which is below minimum)
      await sovereignAccount.connect(owner).removeGuardian(guardian1Address);
      await sovereignAccount.connect(owner).removeGuardian(guardian2Address);
      
      // Third removal should fail
      await expect(
        sovereignAccount.connect(owner).removeGuardian(guardian3Address)
      ).to.be.revertedWith("SovereignAccount: min guardians required");
    });
  });

  describe("Module Management", function () {
    it("Should install a module", async function () {
      const moduleAddress = strangerAddress;
      
      await sovereignAccount.connect(owner).installModule(moduleAddress);
      
      expect(await sovereignAccount.installedModules(moduleAddress)).to.be.true;
    });

    it("Should reject installing module by non-owner", async function () {
      await expect(
        sovereignAccount.connect(stranger).installModule(strangerAddress)
      ).to.be.revertedWith("SovereignAccount: only owner");
    });

    it("Should reject installing zero address module", async function () {
      await expect(
        sovereignAccount.connect(owner).installModule(ethers.ZeroAddress)
      ).to.be.revertedWith("SovereignAccount: module cannot be zero");
    });

    it("Should uninstall a module", async function () {
      const moduleAddress = strangerAddress;
      
      // First install
      await sovereignAccount.connect(owner).installModule(moduleAddress);
      expect(await sovereignAccount.installedModules(moduleAddress)).to.be.true;
      
      // Then uninstall
      await sovereignAccount.connect(owner).uninstallModule(moduleAddress);
      expect(await sovereignAccount.installedModules(moduleAddress)).to.be.false;
    });

    it("Should reject uninstalling non-existent module", async function () {
      await expect(
        sovereignAccount.connect(owner).uninstallModule(strangerAddress)
      ).to.be.revertedWith("SovereignAccount: module not installed");
    });
  });

  describe("Social Recovery", function () {
    it("Should request recovery", async function () {
      const newOwner = strangerAddress;
      
      await sovereignAccount.connect(guardian1).requestRecovery(newOwner);
      
      const request = await sovereignAccount.getRecoveryRequest(0);
      expect(request.newOwner).to.equal(newOwner);
      expect(request.approvalCount).to.equal(0);
      expect(request.executed).to.be.false;
    });

    it("Should reject recovery request by non-guardian", async function () {
      await expect(
        sovereignAccount.connect(stranger).requestRecovery(strangerAddress)
      ).to.be.revertedWith("SovereignAccount: only guardians");
    });

    it("Should approve recovery", async function () {
      const newOwner = strangerAddress;
      
      // Request recovery
      await sovereignAccount.connect(guardian1).requestRecovery(newOwner);
      
      // Approve by guardian1
      await sovereignAccount.connect(guardian1).approveRecovery(0);
      
      const hasApproved = await sovereignAccount.hasGuardianApproved(0, guardian1Address);
      expect(hasApproved).to.be.true;
      
      const request = await sovereignAccount.getRecoveryRequest(0);
      expect(request.approvalCount).to.equal(1);
    });

    it("Should execute recovery when enough approvals", async function () {
      const newOwner = strangerAddress;
      
      // Request recovery
      await sovereignAccount.connect(guardian1).requestRecovery(newOwner);
      
      // Approve by 3 guardians (minimum required)
      await sovereignAccount.connect(guardian1).approveRecovery(0);
      await sovereignAccount.connect(guardian2).approveRecovery(0);
      await sovereignAccount.connect(guardian3).approveRecovery(0);
      
      // Check that recovery was executed
      const request = await sovereignAccount.getRecoveryRequest(0);
      expect(request.executed).to.be.true;
      expect(await sovereignAccount.owner()).to.equal(newOwner);
    });

    it("Should reject approving same guardian twice", async function () {
      const newOwner = strangerAddress;
      
      await sovereignAccount.connect(guardian1).requestRecovery(newOwner);
      await sovereignAccount.connect(guardian1).approveRecovery(0);
      
      await expect(
        sovereignAccount.connect(guardian1).approveRecovery(0)
      ).to.be.revertedWith("SovereignAccount: already approved");
    });
  });

  describe("Transaction Execution", function () {
    it("Should execute a transaction", async function () {
      // Send some ETH to the contract first
      await owner.sendTransaction({
        to: await sovereignAccount.getAddress(),
        value: ethers.parseEther("1.0"),
      });
      
      const recipient = strangerAddress;
      const amount = ethers.parseEther("0.5");
      
      // Execute transaction
      await sovereignAccount.connect(owner).execute(
        recipient,
        amount,
        "0x"
      );
      
      // Check recipient balance increased
      const recipientBalance = await ethers.provider.getBalance(recipient);
      expect(recipientBalance).to.be.gt(0);
    });

    it("Should reject execution by non-owner", async function () {
      await expect(
        sovereignAccount.connect(stranger).execute(
          strangerAddress,
          0,
          "0x"
        )
      ).to.be.revertedWith("SovereignAccount: not authorized");
    });

    it("Should execute batch transactions", async function () {
      // Send some ETH to the contract first
      await owner.sendTransaction({
        to: await sovereignAccount.getAddress(),
        value: ethers.parseEther("1.0"),
      });
      
      const recipient1 = guardian1Address;
      const recipient2 = guardian2Address;
      const amount = ethers.parseEther("0.1");
      
      await sovereignAccount.connect(owner).executeBatch(
        [recipient1, recipient2],
        [amount, amount],
        ["0x", "0x"]
      );
      
      // Check balances increased
      const balance1 = await ethers.provider.getBalance(recipient1);
      const balance2 = await ethers.provider.getBalance(recipient2);
      expect(balance1).to.be.gt(0);
      expect(balance2).to.be.gt(0);
    });
  });

  describe("Withdraw", function () {
    it("Should withdraw ETH", async function () {
      const contractAddress = await sovereignAccount.getAddress();
      
      // Send some ETH to the contract
      const depositAmount = ethers.parseEther("1.0");
      await owner.sendTransaction({
        to: contractAddress,
        value: depositAmount,
      });
      
      // Check contract balance
      const contractBalanceBefore = await ethers.provider.getBalance(contractAddress);
      expect(contractBalanceBefore).to.equal(depositAmount);
      
      // Withdraw
      const withdrawAmount = ethers.parseEther("0.5");
      await sovereignAccount.connect(owner).withdraw(withdrawAmount);
      
      // Check contract balance decreased
      const contractBalanceAfter = await ethers.provider.getBalance(contractAddress);
      expect(contractBalanceAfter).to.equal(depositAmount - withdrawAmount);
    });

    it("Should reject withdraw by non-owner", async function () {
      await expect(
        sovereignAccount.connect(stranger).withdraw(1)
      ).to.be.revertedWith("SovereignAccount: only owner");
    });

    it("Should reject withdraw insufficient balance", async function () {
      await expect(
        sovereignAccount.connect(owner).withdraw(ethers.parseEther("1.0"))
      ).to.be.revertedWith("SovereignAccount: insufficient balance");
    });
  });
});