// File: models/area.js
const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  pincode: { type: String, required: true, unique: true },
  name: String,
  mla: {
    name: String,
    party: String,
    phone: String,
    office: String
  },
  mp: {
    name: String,
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
      contact: String,
      address: String,
      services: String
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
      phone: String
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
  education: [{
    name: String,
    type: String,
    address: String,
    phone: String,
    details: String
  }],
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
  }
});

module.exports = mongoose.model('Area', areaSchema);
