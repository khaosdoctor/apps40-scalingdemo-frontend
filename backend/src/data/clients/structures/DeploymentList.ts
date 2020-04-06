import { Deployment } from './Deployment'
import { ListMeta } from './ListMeta'

export interface DeploymentList {
  apiVersion: string
  items: Deployment[]
  kind: 'Deployment'
  metadata: ListMeta
}
