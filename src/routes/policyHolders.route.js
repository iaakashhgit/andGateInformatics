const express = require("express");
const router = express.Router();
const {
  createPolicyHoldersRequestBody,
} = require("../middlewares/policyHolder.middleware");
const {
  createPolicyHolders,
  findPolicyHolder,
  deletePolicyHolder,
  updatePolicyHolder,
} = require("../controllers/policyHolder.controller");

router.post("/createPolicyHolder", createPolicyHolders);
router.post("/findPolicyHolder", findPolicyHolder);
router.post("/deletePolicyHolder", deletePolicyHolder);
router.put("/updatePolicyHolder", updatePolicyHolder
);

module.exports = router
