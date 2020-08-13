[![Join the chat at https://gitter.im/poanetwork/poa-bridge](https://badges.gitter.im/poanetwork/poa-bridge.svg)](https://gitter.im/poanetwork/poa-bridge?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://github.com/poanetwork/amb-mediators/workflows/amb-mediators/badge.svg?branch=master)](https://github.com/poanetwork/amb-mediators/workflows/amb-mediators/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/poanetwork/amb-mediators/badge.svg?branch=master)](https://coveralls.io/github/poanetwork/amb-mediators?branch=master)

# AMB Mediators Smart Contracts
These contracts provide the functionality for mediators intended to work on top of the AMB bridge. 

## Usage

There are two ways to deploy contracts:
* install and use NodeJS
* use Docker to deploy

### Deployment with NodeJS

#### Install Dependencies
```bash
npm install
```
#### Deploy
Please read the [README.md](deploy/README.md) in the `deploy` folder for instructions and .env file configuration

#### Test
```bash
npm test
```

#### Run coverage tests
```bash
npm run coverage
```

The results can be found in the `coverage` directory.

#### Flatten
Fattened contracts can be used to verify the contract code in a block explorer like BlockScout or Etherscan.
The following command will prepare flattened version of the contracts:

```bash
npm run flatten
```
The flattened contracts can be found in the `flats` directory.

### Deployment in the Docker environment
[Docker](https://www.docker.com/community-edition) and [Docker Compose](https://docs.docker.com/compose/install/) can be used to deploy contracts without NodeJS installed on the system.
If you are on Linux, we recommend you [create a docker group and add your user to it](https://docs.docker.com/install/linux/linux-postinstall/), so that you can use the CLI without `sudo`.

#### Prepare the docker container
```bash
docker-compose up --build
```
_Note: The container must be rebuilt every time the code in a contract or deployment script is changed._

#### Deploy the contracts
1. Create the `.env` file in the `deploy` directory as described in the deployment [README.md](deploy/README.md).
2. Run deployment process:
   ```bash
   docker-compose run amb-mediators deploy.sh
   ```
   or with Linux:
   ```bash
   ./deploy.sh
   ```

#### Copy flatten sources (if needed)
1. Discover the container name:
   ```bash
   docker-compose images amb-mediators
   ```
2. In the following command, use the container name to copy the flattened contracts code to the current working directory. The contracts will be located in the `flats` directory.
   ```bash
   docker cp name-of-your-container:/contracts/flats ./
   ```

#### Test contract and run coverage (if needed)
```bash
$ docker-compose run dev bash
$ npm test
$ npm run coverage
```

#### Shutdown the container
If the container is no longer needed, it can be shutdown:
```bash
docker-compose down
```

## Contributing

See the [CONTRIBUTING](CONTRIBUTING.md) document for contribution, testing and pull request protocol.

## License

[![License: GPL v3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.
