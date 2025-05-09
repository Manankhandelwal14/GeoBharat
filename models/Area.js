// area.js 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationItemSchema = new Schema({
  name: String,
  type: String,
  address: String,
  phone: String,
  details: String
});

const AreaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
    index: true // Add index for faster queries
  },
  district: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  mla: {
    name: String,
    party: String,
    phone: String,
    office: String
  },
  mp: {
    name: String,
    party: String, // Added party field for consistency with MLA
    phone: String,
    office: String
  },
  utilities: {
    electricity: {
      name: String,
      helpline: String,
      address: String,
      website: String
    },
    water: {
      name: String,
      helpline: String,
      address: String
    },
    gas: [{
      name: String,
      address: String,
      phone: String
    }],
    waste: {
      department: String,
      helpline: String,
      address: String,
      email: String,
      website: String
    }
  },
  transportation: {
    bus: [{
      name: String,
      contact: String,
      address: String,
      services: String
    }],
    metro: [{
      name: String,
      contact: String
    }],
    railway: [{
      name: String,
      contact: String,
      address: String,
      services: String
    }]
  },
  emergency: {
    hospitals: [{
      name: String,
      address: String,
      phone: String,
      emergency: String // Added emergency contact
    }],
    fireStations: [{
      name: String,
      address: String,
      phone: String
    }],
    police: {
      address: String,
      phone: String,
      emergency: String
    }
  },
  education: [EducationItemSchema],
  publicFacilities: {
    libraries: [{
      name: String,
      address: String,
      phone: String,
      timings: String
    }],
    communityCenters: [{
      name: String,
      address: String,
      phone: String,
      facilities: String
    }],
    landRecords: {
      name: String,
      address: String,
      phone: String
    }
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Add a compound index for faster searches
AreaSchema.index({ name: 1, pincode: 1 });

mongoose.set('strictQuery', true);

module.exports = mongoose.model('Area', AreaSchema);