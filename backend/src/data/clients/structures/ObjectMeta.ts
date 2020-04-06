export interface ObjectMeta {
  generateName: string
  generation: number
  labels: {
    [key: string]: any
  }
  name: string
  namespace: string
  resourceVersion: string
  selfLink: string
  uid: string
}
