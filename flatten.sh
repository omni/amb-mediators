#!/usr/bin/env bash

if [ -d flats ]; then
  rm -rf flats
fi

mkdir -p flats/amb_ens_mirroring

FLATTENER=./node_modules/.bin/truffle-flattener

echo "Flattening contracts related to ENS mirroring on top of AMB bridge"
${FLATTENER} contracts/amb_ens_mirroring/HomeAMBENSMirror.sol > flats/amb_ens_mirroring/HomeAMBENSMirror_flat.sol
${FLATTENER} contracts/amb_ens_mirroring/ForeignAMBENSMirror.sol > flats/amb_ens_mirroring/ForeignAMBENSMirror_flat.sol
cp contracts/amb_ens_mirroring/PublicResolver.sol.flat flats/amb_ens_mirroring/PublicResolver_flat.sol
