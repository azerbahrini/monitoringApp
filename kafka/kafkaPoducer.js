const { Kafka } = require('kafkajs');
const logger = require('../config/logger');

const kafka = new Kafka({
    clientId: 'coreProducerClient',
    brokers: [process.env.REMOTE_KAFKA_SERVER]
})

const producer = kafka.producer()

const sendMail = async (mailData) => {
    try {
        await producer.connect()
        await producer.send({
            topic: 'mailData',
            messages: [
                { value: JSON.stringify(mailData) },
            ],
        })
        console.log('send Mail Success !')
    } catch (error) {
        console.log('send Mail Error', error);
    }
}

const archiveNotification = async (notifReference) => {
    try {
        await producer.connect()
        await producer.send({
            topic: 'notification_archive',
            messages: [
                { value: JSON.stringify(notifReference) },
            ],
        })
        console.log('sending notification Reference Success !')
    } catch (error) {
        console.log('sending notification Reference Error', error);
    }
}

const sendInfo = async (infoData) => {
    try {
        logger.debug('Before sending inside the producer !')
        await producer.connect()
        await producer.send({
            topic: 'info',
            messages: [
                { value: JSON.stringify(infoData) },
            ],
        })
        console.log('send Info Success !')
    } catch (error) {
        console.log('send Info Error', error);
    }
}
module.exports = {
    sendMail,
    archiveNotification,
    sendInfo
}
