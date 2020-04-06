import rescue from 'express-rescue'
import { Request, Response, NextFunction } from 'express'
import { KubernetesService } from '../../../services/KubernetesService'

export default function (service: KubernetesService) {
  return [
    rescue(async (req: Request, res: Response) => {
      const params = req.query
      const entity = await service.getDeploymentList(params)

      res.status(200)
        .json(entity)
    }),
    (err: any, _req: Request, _res: Response, next: NextFunction) => {
      next(err)
    }
  ]
}
