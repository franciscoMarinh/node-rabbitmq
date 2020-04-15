import amqp from 'amqplib'

class Amqplib {
  public async getChannel (): Promise<amqp.Channel> {
    const connection = await amqp.connect(process.env.AMQP_URI || '')
    return connection.createChannel()
  }
}

export default new Amqplib().getChannel()
