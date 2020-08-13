/* eslint import/no-dynamic-require: 0 */

const buildPath = 'contracts'

module.exports = {
  EternalStorageProxy: require(`../../build/${buildPath}/EternalStorageProxy.json`),
  ForeignAMBENSMirror: require(`../../build/${buildPath}/ForeignAMBENSMirror.json`),
  HomeAMBENSMirror: require(`../../build/${buildPath}/HomeAMBENSMirror.json`),
  PublicResolver: require(`../../build/${buildPath}/PublicResolver.json`)
}
