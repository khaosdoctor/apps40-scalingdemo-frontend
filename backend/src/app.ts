import { Express } from 'express'
import errors from '@expresso/errors'
import { app } from '@expresso/app'
import config, { IAppConfig } from './app.config'
import hpaRouteFactory from './presentation/routes/kubernetes/hpa'
import deploymentsRouteFactory from './presentation/routes/kubernetes/deployments'
import { KubernetesService } from './services/KubernetesService'
import { KubernetesClient } from './data/clients/KubernetesClient'

const apiFactory = app((app: Express, config: IAppConfig, environment: string) => {
  const kubernetesClient = new KubernetesClient(config.kubernetes)
  const kubernetesService = new KubernetesService(kubernetesClient)

  app.get('/hpas', hpaRouteFactory(kubernetesService))
  app.get('/deployments', deploymentsRouteFactory(kubernetesService))

  app.use(errors(environment))
})

apiFactory(config, config.env)
  .then((app: Express) => app.listen(config.port, () => console.log(`Listening on ${config.port}`)))
