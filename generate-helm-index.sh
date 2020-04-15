#!/bin/bash

helm package ./frontend/infrastructure/visualization-frontend -d ./helm
helm package ./backend/infrastructure/visualization-backend -d ./helm
cd helm
helm repo index . --url https://lsantos.dev/apps40-scalingdemo-frontend/helm --merge ./helm/index.yaml
