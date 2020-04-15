import { Router } from 'express'
import storeController from './api/controller/store.controller'
const routes = Router()

routes.post('/', storeController.store)

export default routes
