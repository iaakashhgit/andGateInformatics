const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const claimsModel = require("../models/claims.model");
const moment = require("moment");

const createClaims = asyncHandler(async (req, res) => {
  try {
    const body = req.body;
    let claimsCreated = await claimsModel.storeClaimsDetails(body);
    return res
      .status(201)
      .json(new ApiResponse(201, claimsCreated, "create claims successfully!"));
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong");
  }
});

const getClaims = asyncHandler(async (req, res) => {
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
    if (body && body.claimNumber) {
      matchCondition["$match"]["$and"].push({
        claimNumber: body.claimNumber,
      });
    }
    if (body && body.insuredDOB) {
      matchCondition["$match"]["$and"].push({ insuredDOB: body.insuredDOB });
    }
    if (body && body.deathStartDate && body.deathEndDate) {
      matchCondition["$match"]["$and"].push({
        dateOfDeath: { $gte: new Date(body.deathStartDate) },
      });
      matchCondition["$match"]["$and"].push({
        dateOfDeath: { $lte: new Date(body.deathEndDate) },
      });
    }
    const responeData = await claimsModel.aggregate([
      matchCondition,
      { $skip: skip },
      { $limit: limit },
    ]);
    return res.status(200).json(new ApiResponse(201, responeData));
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong");
  }
});

const updateDODClaims = asyncHandler(async (req, res) => {
  try {
    const { dateOfDeath } = req.body;
    if (dateOfDeath) {
      const currentDate = moment().toDate();
      const oneYearAgo = moment().subtract(1, "year").toDate();

      await claimsModel.updateMany(
        { dateOfDeath: { $lt: oneYearAgo } },
        { $set: { dateOfDeath: currentDate } }
      );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "update documents successfully"));
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong");
  }
});

const updateClaims = asyncHandler(async (req, res) => {
  try {
    const { claimNumber, status, insuredFirstName, insuredFullName } = req.body;
    await claimsModel.updateOne(
      { claimNumber },
      { $set: { status, insuredFirstName, insuredFullName } }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, "update documents successfully"));
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong");
  }
});

const deleteClaimByDate = asyncHandler(async (req, res) => {
  try {
    const { claimDate } = req.body;
    if (claimDate) {
      const startOfDay = moment(claimDate).startOf("day").toDate();
      const endOfDay = moment(claimDate).endOf("day").toDate();

      const deletedClaim = await claimsModel.findOneAndDelete({
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      });

      if (deletedClaim) {
        return res
          .status(200)
          .json(new ApiResponse(200, "Deleted claim created on " + claimDate));
      } else {
        return res
          .status(404)
          .json(new ApiResponse(404, "Claim not found for " + claimDate));
      }
    } else {
      return res
        .status(400)
        .json(new ApiResponse(400, "Target date is required"));
    }
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong");
  }
});

module.exports = { createClaims, getClaims, updateDODClaims, updateClaims, deleteClaimByDate };
