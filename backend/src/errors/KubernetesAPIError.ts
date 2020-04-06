import { format } from 'util'

export class KubernetesAPIError extends Error {
  constructor (message: string) {
    super(format(`KUBERNETES API ERROR: ${message}`))
  }
}
