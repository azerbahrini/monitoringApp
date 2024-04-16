const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'mailsentClient',
  brokers: [process.env.REMOTE_KAFKA_SERVER]
})

const consumer = kafka.consumer({ groupId: 'core-consumer-group' })

const mailingServiceConsume = async() => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'sentMail' });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('Mail Sent !',message.value.toString());
      },
    })
  } catch (error) {
    console.log('mail sent consumer error', error)
  }
}

module.exports = {
    mailingServiceConsume
}