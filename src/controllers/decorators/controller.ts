import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { NextFunction, RequestHandler, Request, Response } from 'express';

function bodyValidators(props: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid Request');
      return;
    }

    for (let prop of props) {
      if (!req.body[prop]) {
        console.log('Help');
        res.status(422).send('Missing Email or Password Property');
        return;
      }

      next();
    }
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.router;
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requiredBodyProps);

      if (path && method == 'get') {
        router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
      } else {
        router[method](
          `${routePrefix}${path}`,
          validator,
          ...middlewares,
          routeHandler
        );
      }
    }
  };
}
