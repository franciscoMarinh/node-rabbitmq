import channelInstace from './libs/rabbitmq'
const queue = 'test'
let count = 0
const main = async (): Promise<void> => {
  try {
    const channel = await channelInstace
    await channel.assertQueue(queue, { durable: true, messageTtl: 20 })
    channel.consume(queue, (message) => {
      const data = JSON.parse(message.content.toString())
      console.log(data.message, ++count)
      if (data.error) {
        return channel.nack(message, false, true)
        // return channel.reject(message, true)
      }
      return channel.ack(message)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
