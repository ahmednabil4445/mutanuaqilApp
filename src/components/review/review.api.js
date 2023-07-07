
const { protectedRoutesfordriver } = require("../driver/deiver.services");
const { protectedRoutes} = require("../user/user.service");
const { createReview, getReviews, getReview, updateReview, deleteReview, getReviewsfordriver } = require("./review.service");

  const router = require("express").Router();
  
  router.route("/").post(protectedRoutes,createReview).get(getReviews);
  router.route("/driverReview").get(protectedRoutesfordriver,getReviewsfordriver)
  router
    .route("/:id").get(getReview).put(protectedRoutes,updateReview)
    .delete(protectedRoutes,deleteReview);
  
  module.exports = router;
  