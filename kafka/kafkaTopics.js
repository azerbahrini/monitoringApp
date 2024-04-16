// const kafka = require('kafka-node');
// require('dotenv').config();

// const kafkaServer = process.env.KAFKA_SERVER;
// const client = new kafka.KafkaClient({ kafkaHost: kafkaServer });

// const topicToCreate = [{
//     topic: 'notif_topic',
//     partitions: 1,
//     replicationFactor: 1
// }
// ];

// exports.topicCreation = async () => {
//     try {
//         client.createTopics(topicToCreate, (error, result) => {
//             // result is an array of any errors if a given topic could not be created
//             console.log(result, 'topic created successfully');
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
