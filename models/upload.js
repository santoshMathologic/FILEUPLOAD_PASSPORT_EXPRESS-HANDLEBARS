var mongoose = require('mongoose');
var uploadSchema = new mongoose.Schema({
    data: { type: String, default: null },
    fileType: String,
    originalFileName: String,
    uploadedBy: String,
    isProcessed: { type: Boolean, default: false },
    status: { type: String, default: null },
    message: String,
    uploadFileType: { type: String, default: "td" },
    markDelete: { type: Boolean, default: false },
    uploadDateTime: { type: Date, default: Date.now }
});
module.exports = mongoose.model('upload', uploadSchema);