const fs = require('fs')
const path = require('path')
const { BRIDGE_MODE } = require('./src/loadEnv')

const deployResultsPath = path.join(__dirname, './bridgeDeploymentResults.json')

function writeDeploymentResults(data) {
  fs.writeFileSync(deployResultsPath, JSON.stringify(data, null, 4))
  console.log('Contracts Deployment have been saved to `bridgeDeploymentResults.json`')
}

async function deployAMBEnsMirroring() {
  const preDeploy = require('./src/amb_ens_mirroring/preDeploy')
  const deployHome = require('./src/amb_ens_mirroring/home')
  const deployForeign = require('./src/amb_ens_mirroring/foreign')
  const initializeHome = require('./src/amb_ens_mirroring/initializeHome')
  const initializeForeign = require('./src/amb_ens_mirroring/initializeForeign')
  await preDeploy()
  const { homeBridgeMediator, publicResolver } = await deployHome()
  const { foreignBridgeMediator } = await deployForeign()

  await initializeHome({
    homeBridge: homeBridgeMediator.address,
    foreignBridge: foreignBridgeMediator.address,
    publicResolver: publicResolver.address
  })
  await initializeForeign({
    foreignBridge: foreignBridgeMediator.address,
    homeBridge: homeBridgeMediator.address
  })

  console.log('\nDeployment has been completed.\n\n')
  console.log(`[   Home  ] Bridge Mediator: ${homeBridgeMediator.address}`)
  console.log(`[ Foreign ] Bridge Mediator: ${foreignBridgeMediator.address}`)
  writeDeploymentResults({
    homeBridge: {
      homeBridgeMediator,
      publicResolver
    },
    foreignBridge: {
      foreignBridgeMediator
    }
  })
}

async function main() {
  console.log(`Bridge mode: ${BRIDGE_MODE}`)
  switch (BRIDGE_MODE) {
    case 'AMB_ENS_MIRRORING':
      await deployAMBEnsMirroring()
      break
    default:
      throw new Error('Invalid BRIDGE_MODE. Please specify on of [AMB_ENS_MIRRORING]')
  }
}

main().catch(e => console.log('Error:', e))
