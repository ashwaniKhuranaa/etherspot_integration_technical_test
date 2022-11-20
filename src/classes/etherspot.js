import {ethers} from 'ethers';
import {
  Sdk as EtherspotSdk,
  NetworkNames,
  EnvNames,
  randomPrivateKey,
} from 'etherspot';

import {addPk, addAddress, updateBalance} from '../redux/Actions/wallet';

class EtherspotService {
  sdk = EtherspotSdk;

  async init(dispatch) {
    let newPk = randomPrivateKey();
    dispatch(addPk(newPk)); // Add the PK to redux
    this.sdk = new EtherspotSdk(newPk, {
      env: EnvNames.TestNets,
      networkName: NetworkNames.Goerli,
    }); // Generate Etherspot SDK
    await this.sdk.createSession();
    await this.sdk.computeContractAccount();
    const accountDetails = await this.sdk.syncAccount();
    const balanceDetails = await this.sdk.getAccountBalances(); // Get account balance using etherspot
    const balances = ethers.utils.formatEther(
      balanceDetails.items[0].balance.toString(),
    );
    dispatch(addAddress(accountDetails.address)); // Save address, sdk and balance with redux
    dispatch(updateBalance(balances));
    return;
  }

  async updateBalance(dispatch) {
    const balanceDetails = await this.sdk.getAccountBalances();
    const balances = ethers.utils.formatEther(
      balanceDetails.items[0].balance.toString(),
    );
    dispatch(updateBalance(balances));
  }

  async sendEther({currentPk, receiverAdr, amount, dispatch}) {
    const provider = new ethers.providers.InfuraProvider(
      NetworkNames.Goerli,
      '3ace0856e77d44389f96842c212aab72',
    );
    const gasPrice = await provider.getGasPrice(); // Get gas from provider
    const signer = new ethers.Wallet(currentPk, provider); // Definition of the signer with PK and provider
    const tx = {
      from: signer.address,
      to: receiverAdr,
      value: ethers.BigNumber.from(ethers.utils.parseUnits(amount, 'ether')),
      gasPrice: gasPrice,
      gasLimit: ethers.utils.hexlify(21000), // 21 gwei
      nonce: await provider.getTransactionCount(signer.address, 'latest'),
    };
    const txObj = await signer.sendTransaction(tx);
    await this.updateBalances(dispatch);
    return txObj;
  }

  async recoverWallet(newPk, dispatch) {
    dispatch(addPk(newPk));
    // Get address and balances. Initialises SDK. Saves everything in redux store
    this.sdk = new EtherspotSdk(newPk, {
      env: EnvNames.TestNets,
      networkName: NetworkNames.Goerli,
    });
    await this.sdk.createSession();
    await this.sdk.computeContractAccount();
    const output = await this.sdk.syncAccount();
    const output2 = await this.sdk.getAccountBalances();
    const balances = ethers.utils.formatEther(
      output2.items[0].balance.toNumber(),
    );
    dispatch(addAddress(output.address));
    dispatch(updateBalance(balances));
  }
}

const etherspot = new EtherspotService();

export default etherspot;
