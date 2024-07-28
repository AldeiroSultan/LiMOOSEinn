

const mongoose = require('mongoose');

const vehiclesSchema = new mongoose.Schema({
  vehicle_name: {
    type: String,
    unique: true,
    required: [true, 'Vehicle name filed is required']
  },
  vehicle_brand: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, 'Vehicle brand filed is required']
  },
  vehicle_type: {
    type: String,
    enum: ['single', 'couple', 'family', 'presidential'],
    required: [true, 'Vehicle type filed is required']
  },
  vehicle_price: {
    type: Number,
    required: [true, 'Vehicle price filed is required']
  },
  vehicle_size: {
    type: Number,
    required: [true, 'Vehicle size filed is required']
  },
  vehicle_capacity: {
    type: Number,
    required: [true, 'Vehicle capacity filed is required']
  },
  allow_pets: {
    type: Boolean,
    default: false
  },
  provide_breakfast: {
    type: Boolean,
    default: false
  },
  featured_vehicle: {
    type: Boolean,
    default: false
  },
  vehicle_description: {
    type: String,
    required: [true, 'Vehicle description filed is required']
  },
  extra_facilities: [String],
  vehicle_images: [
    {
      url: {
        type: String,
        required: [true, 'Vehicle image filed is required']
      }
    }
  ],
  vehicle_status: {
    type: String,
    enum: ['available', 'unavailable', 'booked'],
    required: [true, 'Vehicle status filed is required'],
    default: 'available'
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, 'Vehicle created by is required field']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Replace spaces with dashes in room_slug before saving
vehiclesSchema.pre('save', function (next) {
  if (this.vehicle_brand) {
    this.vehicle_brand = this.vehicle_brand.replace(/\s/g, '-');
  }
  next();
});

module.exports = mongoose.model('Vehicles', vehiclesSchema);
