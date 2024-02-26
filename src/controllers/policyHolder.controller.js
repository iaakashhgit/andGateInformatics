const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const policyHolderModel = require("../models/policyHolders.model");

const createPolicyHolders = asyncHandler(async (req, res) => {
  try {
    const body = req.body;
    let policyHolderCreated = await policyHolderModel.storeHolders(body);
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          policyHolderCreated,
          "create holders successfully!"
        )
      );
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong");
  }
});

const findPolicyHolder = asyncHandler(async (req, res) => {
  try {
    let body = req.body;

    // pagination
    const pageNumber = body.pageNumber || 1;
    const limit = body.limit || 10;
    const skip = (pageNumber - 1) * limit;

    // query
    let matchCondition = {
      $match: {
        $and: [],
      },
    };
    if (body && body.insuredFirstName) {
      matchCondition["$match"]["$and"].push({
        insuredFirstName: body.insuredFirstName,
      });
    }
    if (body && body.status) {
      matchCondition["$match"]["$and"].push({ status: body.status });
    }
    if (body && body.start_date && body.end_date) {
      matchCondition["$match"]["$and"].push({
        createdAt: { $gte: new Date(body.start_date) },
      });
      matchCondition["$match"]["$and"].push({
        createdAt: { $lte: new Date(body.end_date) },
      });
    }
    const responeData = await policyHolderModel.aggregate([
      matchCondition,
      { $skip: skip },
      { $limit: limit },
    ]);
    return res.status(200).json(new ApiResponse(200, responeData));
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong");
  }
});

const deletePolicyHolder = asyncHandler(async (req, res) => {
  try {
    const { insuredFirstName, age } = req.body;
    if (age && age <= 80) {
        throw new ApiError(400, "Age is less than 80")
    }
    if (insuredFirstName.toLowerCase().startsWith("a")) {
      await policyHolderModel.deleteMany({
        insuredFirstName: { $regex: "^a", $options: "i" },
      });
    }
    if (age > 80) {
        await policyHolderModel.deleteMany({
            age: { $gt: 80 }
          });
    }
    return res
    .status(200)
    .json(new ApiResponse(200, "delete holders successfully!"));
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong");
  }
});

const updatePolicyHolder = asyncHandler(async (req, res) => {
  try {
    const { age, state, mobile, status, insuredFirstName, insuredLastName } =
      req.body;
    if (age && age > 25) {
      await policyHolderModel.updateMany(
        { age },
        { $set: { relationship: "Married" } }
      );
    }
    if (mobile) {
      await policyHolderModel.updateMany(
        { mobile },
        { $set: { status, state, insuredFirstName, insuredLastName } }
      );
    }
    return res
    .status(200)
    .json(new ApiResponse(200, "update Documents successfully!"));
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong");
  }
});

module.exports = { createPolicyHolders, findPolicyHolder, deletePolicyHolder, updatePolicyHolder };
