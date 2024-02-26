const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const uuid = require('uuid')

const policyHolderSchema = new Schema(
    {
        _id: {
            type: String,
            default: () => uuid.v4()    
        },
        insuredFirstName: {
            type: String,
            required: true,
            trim: true,
        },
        insuredLastName: {
            type: String,
            required: true,
            trim: true,
        },
        age: {
            type: Number,
            required: true,
            trim: true, 
        },
        dateOfBirth: {
            type: String,
            trim: true,
            required: true 
        },
        state: {
            type: String,
            trim: true, 
        },
        email: {
            type: String,
            required: true,
            trim: true, 
        },
        mobile: {
            type: String,
            required: true,
            trim: true, 
        },
        status: {
            type: String,
            trim: true, 
        },
        beneficiaries: {
            type: String,
            trim: true, 
        },
        relationship: {
            type: String,
            trim: true, 
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

policyHolderSchema.statics.storeHolders = async function (qecData) {
    try {
        const data = new this(qecData);
        return data.save();
    } catch (error) {
        throw new Error(`Error saving message: ${error.message}`);
    }
}

policyHolderSchema.statics.findHoldersDetails = async function ({totalDocuments,limit,page}) {
    try {
        const skipCount = Math.max(0, totalDocuments - (page * limit));
        return this.find({}).sort({ createdAt: -1 }).skip(skipCount).limit(limit)
    } catch (error) {
        throw new Error(`Error finding messages: ${error.message}`);
    }
};

policyHolderSchema.statics.deleteHoldersDetails = async function (query) {
    try {
        return await this.deleteOne(query)
    } catch (error) {
        throw new Error(`Error finding messages: ${error.message}`);
    }
};

module.exports = mongoose.model('PolicyHolders', policyHolderSchema,  'PolicyHolders')