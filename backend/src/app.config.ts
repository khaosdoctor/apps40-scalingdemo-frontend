import { IExpressoConfigOptions } from '@expresso/app'

export interface IAppConfig extends IExpressoConfigOptions {
  port: number,
  env: string,
  kubernetes: {
    kubernetesServiceHost: string | null
    kubernetesServicePortHttps: number
    serviceAccountTokenPath: string
    serviceAccountNamespacePath: string
    serviceAccountCertificatePath: string
  }
}

export default {
  name: 'apps40',
  port: +(process.env.PORT || 3000),
  env: process.env.NODE_ENV || 'dev',
  kubernetes: {
    kubernetesServiceHost: process.env.KUBERNETES_SERVICE_HOST || null,
    kubernetesServicePortHttps: +(process.env.KUBERNETES_SERVICE_PORT_HTTPS || 443),
    serviceAccountTokenPath: process.env.KUBERNETES_SERVICEACCOUNT_TOKEN_PATH || '/var/run/secrets/kubernetes.io/serviceaccount/token',
    serviceAccountNamespacePath: process.env.KUBERNETES_SERVICEACCOUNT_NAMESPACE_PATH || '/var/run/secrets/kubernetes.io/serviceaccount/namespace',
    serviceAccountCertificatePath: process.env.KUBERNETES_SERVICEACCOUNT_NAMESPACE_PATH || '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt'
  }
} as IAppConfig
