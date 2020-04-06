import { format } from 'util'

export class KubernetesAPIError extends Error {
  errorObject: any
  constructor (message: string) {
    super(format(`KUBERNETES API ERROR: ${message}`))
    this.errorObject = message
  }
}
