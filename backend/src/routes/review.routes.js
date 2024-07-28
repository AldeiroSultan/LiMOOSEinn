

const router = require('express').Router();
const { isAuthenticatedUser, isBlocked } = require('../middleware/app.authentication');
const { vehicleReviewAdd, getVehicleReviewsList, editSelfVehicleReview } = require('../controllers/review.controllers');

// route for add user room review
router.route('/vehicle-review-add/:id').post(isAuthenticatedUser, isBlocked, vehicleReviewAdd);

// route for get a room review list
router.route('/get-vehicle-reviews-list/:vehicle_id').get(getVehicleReviewsList);

// route for edit self room review
router.route('/edit-vehicle-review/:review_id').put(isAuthenticatedUser, isBlocked, editSelfVehicleReview);

module.exports = router;
