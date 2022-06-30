import express from 'express';

// Creating an singleton for one router
export class AppRouter {
  private static instance: express.Router;

  static get router(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
}
