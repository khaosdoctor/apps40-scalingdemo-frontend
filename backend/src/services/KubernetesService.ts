import { KubernetesClient, IKubernetesRequestOptions } from '../data/clients/KubernetesClient'

export class KubernetesService {
  constructor (private readonly client: KubernetesClient) { }

  async getDeploymentList (options: IKubernetesRequestOptions) {
    return this.client.getDeploymentList(options)
  }

  async getHPAList (options: IKubernetesRequestOptions) {
    return this.client.getHPAList(options)
  }
}
