import rescue from 'express-rescue'
import { Request, Response, NextFunction } from 'express'
import { KubernetesService } from '../../../services/KubernetesService'

export default function (_service: KubernetesService) {
  return [

    rescue(async (_req: Request, res: Response) => {
      // const data = req.body
      // const entity = await service.someMethod(data)

      // res.status(202)
      //   .json(entity.toObject())
      res.json({ hello: 'world' })
    }),
    (err: any, _req: Request, _res: Response, next: NextFunction) => {
      next(err)
    }
  ]
}
