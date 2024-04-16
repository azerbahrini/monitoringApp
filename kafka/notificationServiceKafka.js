const { Kafka } = require('kafkajs');
const logger = require('../config/logger');

const kafka = new Kafka({
    clientId: 'coreNotificationClient',
    brokers: [process.env.REMOTE_KAFKA_SERVER]
})

const producer = kafka.producer()

const TOPIC = "notif_topic"

exports.taskNotif = async ({ key = "Task", task }) => {
    if(task){
        try {
            await producer.connect()
            await producer.send({
                topic: 'notif_topic',
                messages: [
                    { key, value: JSON.stringify(task) },
                ],
            })
            console.log('Notif sent Successfully !')
        } catch (error) {
            console.log('Error while sending notif', error);
        }
    }
}

exports.ITOperationNotificationStatus = {
    CREATE: "created",
    UPDATE: "updated",
    FINISH: "finished",
    REMIND: "reminder",
    CANCEL: "canceled",
    POSTPONE: "postponed",
    EXTEND: "extended",
};

exports.ITOperationNotification = async ({
    status,
    ITOperationNotification,
}) => {
    if (ITOperationNotification) {
        try {
            await producer.connect();
            await producer.send({
                topic: TOPIC,
                messages: [
                    { key: "ITOperation", value: JSON.stringify(ITOperationNotification), headers: { "it-operation-type": status } },
                ],
            });

        } catch (error) {
            console.error(
                "Error on sending an `ITOperationNotification` notification %O",
                error
            );
            throw error;
        }
    } else {
        console.error(
            "IT operation notification is not provided. Please provide an `ITOperationNotification` object."
        );
    }
};

exports.systemNotification = async({key = "System", systemGlobalStatus}) => {
    try {
        await producer.connect()
            await producer.send({
                topic: 'notif_topic',
                messages: [
                    { key, value: JSON.stringify(systemGlobalStatus) },
                ],
            })
            console.log('Notif sent Successfully !')
    } catch (error) {
        console.log('Error while sending system notification', error);
    }
}

exports.teamLeaderNotif = async ({ key = 'TeamLeader', shift }) => {
    if(shift){
        try {
            await producer.connect()
            await producer.send({
                topic: 'notif_topic',
                messages: [
                    { key, value: JSON.stringify(shift) },
                ],
            })
            console.log('assign team leader Notif sent Successfully !')
        } catch (error) {
            console.log('Error while sending notif', error);
        }
    }
}

exports.remindUnassignedShiftNotif = async ({ key = 'ShiftUnassigned', shift }) => {
    if(shift){
        try {
            await producer.connect()
            await producer.send({
                topic: 'notif_topic',
                messages: [
                    { key, value: JSON.stringify(shift) },
                ],
            })
            console.log('Shift Unassigned Notif sent Successfully !')
        } catch (error) {
            console.log('Error while sending notif', error);
        }
    }
}

exports.commentNotif = async ({ key = 'Comment', data }) => {
    if (data){
        try {
            await producer.connect()
            await producer.send({
                topic: TOPIC,
                messages: [{ key, value: JSON.stringify(data) }]
            })
            logger.debug('Comment Notif sent Successfully !')
        } catch (error) {
            logger.error('Error while sending comment notification', error);
        }
    }
}

exports.newsFeedNotif = async ({ key = 'Newsfeed', data }) => {
    if (data){
        try {
            await producer.connect()
            await producer.send({
                topic: TOPIC,
                messages: [{ key, value: JSON.stringify(data) }]
            })
            logger.debug('Newsfeed Notif sent Successfully !')
        } catch (error) {
            logger.error('Error while sending Newsfeed notification', error);
        }
    }
}