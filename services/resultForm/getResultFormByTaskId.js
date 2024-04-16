const Task = require('../../models/Task');
const mongoose = require("mongoose");

module.exports = async (taskId) => {
    try {
        const ResultFormData = await Task.aggregate([
            {
                '$match': {
                    '_id': mongoose.Types.ObjectId(taskId)
                }
            }, {
                '$lookup': {
                    'from': 'maps',
                    'localField': 'map',
                    'foreignField': '_id',
                    'as': 'retrievedmap'
                }
            }, {
                '$set': {
                    'MAID': {
                        '$arrayElemAt': [
                            '$retrievedmap.monitoringAct', 0
                        ]
                    }
                }
            }, {
                '$lookup': {
                    'from': 'resultforms',
                    'localField': 'MAID',
                    'foreignField': 'monitoringActivity',
                    'as': 'formResultArray'
                }
            }, {
                '$set': {
                    'resultFormConfig': {
                        '$arrayElemAt': [
                            '$formResultArray', 0
                        ]
                    }
                }
            }, {
                '$project': {
                    'resultFormConfig': 1,
                    'title': 1,
                    'state': 1,
                    'type': 1
                }
            }
        ])

        if (ResultFormData.length === 0) {
            return {
                // This message will not be passed for the controller, if you want to show it, change the return code
                error: { message: "No data can be found." },
                code: 204,
                status: "success"
            };
        }
        return {
            data: ResultFormData[0],
            status: "success",
            code: 200
        };

    } catch (error) {
        return { error, status: "error", code: 400 };
    }
}