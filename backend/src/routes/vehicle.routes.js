

const router = require('express').Router();
const vehicleImageUpload = require('../middleware/vehicle.image.upload');
const { isAuthenticatedUser, isAdmin } = require('../middleware/app.authentication');

const {
  createVehicle, getVehiclesList, getVehicleByIdOrSlugName, editVehicleByAdmin, deleteVehicleById, getFeaturedVehiclesList
} = require('../controllers/vehicle.controllers');

// route for create new room
router.route('/create-vehicle').post(isAuthenticatedUser, isAdmin, vehicleImageUpload.array('vehicle_images', 5), createVehicle);

// routes for get all, single and featured rooms list
router.route('/all-vehicles-list').get(getVehiclesList);
router.route('/get-vehicles-by-id-or-brand-name/:id').get(getVehicleByIdOrSlugName);
router.route('/featured-vehicles-list').get(getFeaturedVehiclesList);

// routes for edit and delete room by admin
router.route('/edit-vehicle/:id').put(isAuthenticatedUser, isAdmin, vehicleImageUpload.array('vehicle_images', 5), editVehicleByAdmin);
router.route('/delete-vehicle/:id').delete(isAuthenticatedUser, isAdmin, deleteVehicleById);

module.exports = router;
