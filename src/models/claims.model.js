const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const uuid = require('uuid')

const claimsSchema = new Schema(
    {
        _id: {
            type: String,
            default: () => uuid.v4()    
        },
        claimNumber: {
            type: String,
            required: true,
            trim: true,
        },
        lineOfBusiness: {
            type: String,
            trim: true,
        },
        insuredFullName: {
            type: String,
            required: true,
            trim: true, 
        },
        insuredFirstName: {
            type: String,
            trim: true,
            required: true 
        },
        insuredLastName: {
            type: String,
            trim: true, 
        },
        insuredDOB: {
            type: String,
            required: true,
            trim: true, 
        },
        dateOfDeath: {
            type: String,
            required: true,
            trim: true, 
        },
        status: {
            type: String,
            trim: true, 
        },
        effectiveDate: {
            type: String,
            trim: true, 
        },
        insuredState: {
            type: String,
            trim: true, 
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

claimsSchema.statics.storeClaimsDetails = async function (qecData) {
    try {
        const data = new this(qecData);
        return data.save();
    } catch (error) {
        throw new Error(`Error saving message: ${error.message}`);
    }
}

claimsSchema.statics.findClaimsDetails = async function ({totalDocuments,limit,page}) {
    try {
        const skipCount = Math.max(0, totalDocuments - (page * limit));
        return this.find({}).sort({ createdAt: -1 }).skip(skipCount).limit(limit)
    } catch (error) {
        throw new Error(`Error finding messages: ${error.message}`);
    }
};

claimsSchema.statics.deleteClaims = async function (query) {
    try {
        return await this.deleteOne(query)
    } catch (error) {
        throw new Error(`Error finding messages: ${error.message}`);
    }
};

module.exports = mongoose.model('Claims', claimsSchema,  'Claims')