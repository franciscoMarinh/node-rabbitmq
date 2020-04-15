import express from 'express'
import routes from './routes'

class AppController {
  public express: express.Application

  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private routes (): void{
    this.express.use(routes)
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: true }))
  }
}

export default new AppController().express
