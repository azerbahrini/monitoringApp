const ResultForm = require('./../../models/ResultForm');
module.exports = async (id, body ) => {
    try 
     { const resultFormDocument = await ResultForm.findOneAndUpdate(
        {
          _id: id,
        },
        body,
        { new: true }
      )
        .lean()
        .exec();
  
      if (!resultFormDocument) {
        return {
          err: { message: "form result not found." },
          status: "error",
          statusCode: 404,
        };
      }
      return { data: resultFormDocument, status: "success" };
    
      
    } catch (err) {
      return { err, status: "error" };
    }
  };