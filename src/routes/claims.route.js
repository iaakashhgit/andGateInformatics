const express = require("express");
const {
  validateClaimsRequestBody,
} = require("../middlewares/claims.middleware");
const {
  createClaims,
  getClaims,
  updateDODClaims,
  updateClaims,
  deleteClaimByDate
} = require("../controllers/claims.controller");
const router = express.Router();

router.post("/createClaims", createClaims);
router.post("/getClaims", getClaims);
router.post("/updateDODClaims", updateDODClaims)
router.post("/updateClaims", updateClaims)
router.delete("/deleteClaimByDate",deleteClaimByDate)

module.exports = router
