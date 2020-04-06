import rescue from 'express-rescue'
import { boom } from '@expresso/errors'
import { Request, Response, NextFunction } from 'express'
import { KubernetesService } from '../../../services/KubernetesService'
import { KubernetesAPIError } from '../../../errors/KubernetesAPIError'

export default function (service: KubernetesService) {
  return [
    rescue(async (req: Request, res: Response) => {
      const params = req.query
      const entity = await service.getHPAList(params)

      res.status(200)
        .json(entity)
    }),
    (err: any, _req: Request, _res: Response, next: NextFunction) => {
      if (err instanceof KubernetesAPIError) next(boom.badGateway(err.message, { code: 'kubernetes_api_error', errorObject: err.errorObject }))
      next(err)
    }
  ]
}
