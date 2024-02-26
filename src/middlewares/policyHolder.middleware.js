const ApiError = require("../utils/ApiError")

const policyHoldersRequestBody = (req,res,next) => {
    const body = req.body
    const validationRules = [
        { field: 'insuredFirstName', type: 'string' },
        { field: 'insuredLastName', type: 'string' },
        { field: 'age', type: 'string' },
        { field: 'dateOfBirth', type: 'string' },
        { field: 'state', type: 'string' },
        { field: 'email', type: 'string' },
        { field: 'mobile', type: 'string' },
        { field: 'beneficiaries', type: 'string' },
        { field: 'relationship', type: 'string' },
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

module.exports = { policyHoldersRequestBody }