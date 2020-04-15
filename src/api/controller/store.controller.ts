import { Request, Response, NextFunction } from 'express'
import channelInstace from '../../libs/rabbitmq'

const queue = 'test'

class StoreController {
  public async store (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { error, message } = req.body
      const channel = await channelInstace
      await channel.assertQueue(queue, { durable: true, messageTtl: 20 })
      channel.sendToQueue(queue, Buffer.from(JSON.stringify({ error, message })))
      return res.json({ message: 'success!' })
    } catch (error) {
      return res.send(500).json({ error: error.message })
    }
  }
}

export default new StoreController()
