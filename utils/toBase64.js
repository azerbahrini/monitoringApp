const fs = require('fs');

// Function to encode file data to base64 encoded string
module.exports = (file) => {
    try {
    // Read binary data
    const bitmap = fs.readFileSync(file);
    // Convert binary data to base64 encoded string
    const file64= bitmap.toString('base64');
    return {status: 'success', data: file64};

    } catch (err){
        return { err: err, status: 'error' };
    }
}

// To display
//<img src={`data:image/jpeg;base64,${data}`} />