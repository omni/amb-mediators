# How to Deploy AMB mediators contracts

In order to deploy mediators contracts you must run `npm install` to install all dependencies. For more information, see the [project README](../README.md).

1. Compile the source contracts.
```
cd ..
npm run compile
```

2. Create a `.env` file.
```
cd deploy
cp env-examples/.env.amb-ens-mirroring .env
```

3. If necessary, deploy and configure a multi-sig wallet contract to manage the mediators contracts after deployment. We have not audited any wallets for security, but have used https://github.com/gnosis/MultiSigWallet/ with success.

4. Adjust the parameters in the `.env` file depending on the desired bridge mode. See below for comments related to each parameter.

5. Add funds to the deployment accounts in both the Home and Foreign networks.

6. Run `npm run deploy`.

## `AMB_ENS_MIRRORING` Bridge Mode Configuration Example.

This example of an `.env` file for the `AMB-ENS-MIRRORING` bridge mode includes comments describing each parameter.

```bash
# The type of bridge. Defines set of contracts to be deployed.
BRIDGE_MODE=AMB_ENS_MIRRORING

# The private key hex value of the account responsible for contracts
# deployments and initial configuration. The account's balance must contain
# funds from both networks.
DEPLOYMENT_ACCOUNT_PRIVATE_KEY=67..14
# Extra gas added to the estimated gas of a particular deployment/configuration transaction
# E.g. if estimated gas returns 100000 and the parameter is 0.2,
# the transaction gas limit will be (100000 + 100000 * 0.2) = 120000
DEPLOYMENT_GAS_LIMIT_EXTRA=0.2
# The "gasPrice" parameter set in every deployment/configuration transaction on
# Home network (in Wei).
HOME_DEPLOYMENT_GAS_PRICE=10000000000
# The "gasPrice" parameter set in every deployment/configuration transaction on
# Foreign network (in Wei).
FOREIGN_DEPLOYMENT_GAS_PRICE=10000000000
# The timeout limit to wait for receipt of the deployment/configuration
# transaction.
GET_RECEIPT_INTERVAL_IN_MILLISECONDS=3000

# The RPC channel to a Home node able to handle deployment/configuration
# transactions.
HOME_RPC_URL=https://core.poa.network
# Address on Home network with permissions to change parameters of the bridge contract.
# For extra security we recommended using a multi-sig wallet contract address here.
HOME_BRIDGE_OWNER=0x
# Address on Home network with permissions to upgrade the bridge contract
HOME_UPGRADEABLE_ADMIN=0x

# The RPC channel to a Foreign node able to handle deployment/configuration
# transactions.
FOREIGN_RPC_URL=https://mainnet.infura.io
# Address on Foreign network with permissions to change parameters of the bridge contract.
# For extra security we recommended using a multi-sig wallet contract address here.
FOREIGN_BRIDGE_OWNER=0x
# Address on Foreign network with permissions to upgrade the bridge contract and the
# bridge validator contract.
FOREIGN_UPGRADEABLE_ADMIN=0x

# The address of the existing AMB bridge in the Home network that will be used to pass messages
# to the Foreign network.
HOME_AMB_BRIDGE=0x
# The address of the existing AMB bridge in the Foreign network that will be used to pass messages
# to the Home network.
FOREIGN_AMB_BRIDGE=0x
# The gas limit that will be used in the execution of the message passed to the mediator contract
# in the Home network.
FOREIGN_MEDIATOR_REQUEST_GAS_LIMIT=2000000

# The address of the existing ENS registry contract in the Foreign network from where all ENS records will be synced.
FOREIGN_ENS_REGISTRY_ADDRESS=0x

# The api url of an explorer to verify all the deployed contracts in Home network. Supported explorers: Blockscout, Etherscan
#HOME_EXPLORER_URL=https://blockscout.com/poa/core/api
# The api key of the explorer api, if required, used to verify all the deployed contracts in Home network.
#HOME_EXPLORER_API_KEY=
# The api url of an explorer to verify all the deployed contracts in Foreign network. Supported explorers: Blockscout, Etherscan
#FOREIGN_EXPLORER_URL=https://api.etherscan.io/api
# The api key of the explorer api, if required, used to verify all the deployed contracts in Foreign network.
#FOREIGN_EXPLORER_API_KEY=
```
