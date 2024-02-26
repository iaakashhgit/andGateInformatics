const ApiError = require("../utils/ApiError.js")

const claimsRequestBody = (req,res,next) => {
    const body = req.body
    const validationRules = [
        { field: 'claimNumber', type: 'string' },
        { field: 'lineOfBusiness', type: 'string' },
        { field: 'insuredFullName', type: 'string' },
        { field: 'insuredFirstName', type: 'string' },
        { field: 'insuredLastName', type: 'string' },
        { field: 'insuredDOB', type: 'string' },
        { field: 'dateOfDeath', type: 'date' },
        { field: 'status', type: 'string' },
        { field: 'effectiveDate', type: 'date' },
        { field: 'insuredState', type: 'string' },
    ];
    let error = []
    for (const rule of validationRules) {
        const { field, type, values, optional } = rule;

        if (body[field] === undefined) {
            if (!optional) {
                error.push(`Missing required field: ${field}`);
            }
        } else {
            if (type === 'enum' && values && !values.includes(body[field])) {
                error.push(`Missing required field: ${field}`);
            } else if (typeof body[field] !== type && type !== 'enum') {
                error.push(`Missing required field: ${field}`);
            }
        }
    }
    if(error.length) {
        throw new ApiError(500, "Something went wrong")
    }else {
        next()
    }
    return error
}

module.exports = { claimsRequestBody }