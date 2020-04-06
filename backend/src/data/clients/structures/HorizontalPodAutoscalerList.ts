import { ListMeta } from './ListMeta'
import { ObjectMeta } from './ObjectMeta'

export interface HorizontalPodAutoscalerList {
  apiVersion: string
  items: HorizontalPodAutoscaler[]
  kind: 'HorizontalPodAutoscaler',
  metadata: ListMeta
}

export interface HorizontalPodAutoscalerStatus {
  currentCPUUtilizationPercentage: number
  currentReplicas: number
  desiredReplicas: number
  observedGeneration: number
}

export interface HorizontalPodAutoscalerSpec {
  maxReplicas: number
  minReplicas: number
  targetCPUUtilizationPercentage: number
}

export interface HorizontalPodAutoscaler {
  apiVersion: string
  kind: HorizontalPodAutoscalerList['kind']
  metadata: ObjectMeta
  spec: HorizontalPodAutoscalerSpec
  status: HorizontalPodAutoscalerStatus
}
