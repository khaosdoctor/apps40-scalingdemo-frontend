import { ObjectMeta } from './ObjectMeta'

export interface Deployment {
  apiVersion: string
  kind: 'Deployment'
  metadata: ObjectMeta
  spec: DeploymentSpec
  status: DeploymentStatus
}

export interface DeploymentSpec {
  minReadySeconds: number
  paused: boolean
  progressDeadlineSeconds: number
  replicas: number
  revisionHistoryLimit: number
  strategy: DeploymentStrategy
  template: PodTemplateSpec
}

export interface PodTemplateSpec {
  metadata: ObjectMeta
  spec: PodSpec
}

export interface PodSpec {
  hostname: string
  nodeName: string
}

export interface DeploymentStrategy {
  type: 'Recreate' | 'RollingUpdate'
  rollingUpdate: {
    maxSurge: number
    maxUnavailable: number
  }
}

export interface DeploymentStatus {
  availableReplicas: number
  collisionCount: number
  readyReplicas: number
  replicas: number
  unavailableReplicas: number
  updatedReplicas: number
}
