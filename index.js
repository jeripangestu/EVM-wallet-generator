import chalk from 'chalk';
import { Wallet, ethers } from 'ethers';
import { appendFileSync } from 'fs';
import moment from 'moment';
import readlineSync from 'readline-sync';

// Function to create a new Ethereum account with only the private key (without the 0x prefix)
function createAccountETH() {
  const wallet = ethers.Wallet.createRandom();
  const privateKey = wallet.privateKey.slice(2); // Remove the '0x' prefix
  const address = wallet.address; // Get the wallet address

  return { privateKey, address };
}

// Main function using async IIFE (Immediately Invoked Function Expression)
(async () => {
  try {
    // Get the total number of wallets to create from user input
    const totalWallet = readlineSync.question(
      chalk.yellow('Input how much the wallet you want: ')
    );

    let count = 1;

    // If the user entered a valid number greater than 1, set the count
    if (totalWallet > 1) {
      count = totalWallet;
    }

    // Create the specified number of wallets
    while (count > 0) {
      const createWalletResult = createAccountETH();

      if (createWalletResult) {
        // Append private key to pk.txt (without the 0x prefix)
        appendFileSync(
          './pk.txt',
          `${createWalletResult.privateKey}\n`
        );

        // Append address to address.txt
        appendFileSync(
          './address.txt',
          `${createWalletResult.address}\n`
        );

        // Display success message with the private key and address
        console.log(
          chalk.green(
            `[${moment().format('HH:mm:ss')}] => Wallet created! Private key: ${createWalletResult.privateKey} Address: ${createWalletResult.address}`
          )
        );
      }

      count--;
    }

    // Display final message after creating all wallets
    setTimeout(() => {
      console.log(
        chalk.green(
          'All wallets have been created. Check pk.txt for private keys and address.txt for addresses.'
        )
      );
    }, 3000);
    return;
  } catch (error) {
    // Display error message if an error occurs
    console.log(chalk.red('Your program encountered an error! Message: ' + error));
  }
})();
