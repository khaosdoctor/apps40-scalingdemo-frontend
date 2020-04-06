import fs from 'fs'
import axios, { AxiosInstance } from 'axios'
import { IAppConfig } from '../../app.config'
import { DeploymentList } from './structures/DeploymentList'
import { KubernetesAPIError } from '../../errors/KubernetesAPIError'
import { HorizontalPodAutoscalerList } from './structures/HorizontalPodAutoscalerList'
import https from 'https'

export interface IKubernetesRequestOptions {
  watch: boolean
  limit: number
  includeUninitialized: boolean
  fieldSelector: string
}

export class KubernetesClient {
  private accountToken: string
  private accountNamespace: string
  private k8sHost: string | null
  private k8sPort: number
  private readonly client: AxiosInstance

  constructor (clientConfig: IAppConfig['kubernetes']) {
    this.accountToken = fs.readFileSync(clientConfig.serviceAccountTokenPath).toString('utf-8')
    this.accountNamespace = fs.readFileSync(clientConfig.serviceAccountNamespacePath).toString('utf-8')
    this.k8sHost = clientConfig.kubernetesServiceHost
    this.k8sPort = clientConfig.kubernetesServicePortHttps

    const agent = new https.Agent({
      ca: fs.readFileSync(clientConfig.serviceAccountCertificatePath)
    })
    this.client = axios.create({
      baseURL: `https://${this.k8sHost}:${this.k8sPort}/apis`,
      headers: { Authorization: `Bearer ${this.accountToken}` },
      httpsAgent: agent
    })
  }

  async getDeploymentList (options: IKubernetesRequestOptions): Promise<DeploymentList> {
    try {
      const { data } = await this.client.get<DeploymentList>(`/v1/namespaces/${this.accountNamespace}/deployments`, { params: options })
      return data
    } catch (error) {
      throw new KubernetesAPIError(error?.response?.data ?? error.message)
    }
  }

  async getHPAList (options: IKubernetesRequestOptions): Promise<HorizontalPodAutoscalerList> {
    try {
      const { data } = await this.client.get<HorizontalPodAutoscalerList>(`/v1/namespaces/${this.accountNamespace}/horizontalpodautoscalers`, { params: options })
      return data
    } catch (error) {
      throw new KubernetesAPIError(error?.response?.data ?? error.message)
    }
  }
}
