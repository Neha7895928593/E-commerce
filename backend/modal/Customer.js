const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true, 
    },
    LastName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Phone: {
        type: Number, 
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema); 
