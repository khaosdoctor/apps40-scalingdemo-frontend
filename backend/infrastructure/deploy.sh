#!/bin/bash
CURRENT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
PARENT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd )
PACKAGE_VERSION=$(node -pe "require('$PARENT_DIR/package.json').version")
IMAGE_TAG=${2:-v$PACKAGE_VERSION}
NAMESPACE=${1:-staging}
PACKAGE_NAME=$(node -pe "require('$PARENT_DIR/package.json').name")

read -p "Deploying $IMAGE_TAG to $NAMESPACE. Press [enter] to continue..."

set -x

helm upgrade --install --atomic ${PACKAGE_NAME}-${NAMESPACE} \
  --set "env=$NAMESPACE" \
  --set "image.tag=$IMAGE_TAG" \
  --set "ingress.hostname=$INGRESS_HOSTNAME" \
  --namespace $NAMESPACE \
  $CURRENT_DIR/${PACKAGE_NAME}
