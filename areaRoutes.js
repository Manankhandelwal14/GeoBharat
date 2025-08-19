// areaRoutes.js 
const express = require('express');
const router = express.Router();
const Area = require('./models/area.js'); 

router.get('/', async (req, res) => {
  try {

    if (req.query.pincode) {

      const pincodeQuery = req.query.pincode.toString();
      console.log(`Searching for pincode: "${pincodeQuery}"`);
      
      const area = await Area.findOne({ pincode: pincodeQuery });
      
      if (!area) {
        console.log(`No area found with pincode: ${pincodeQuery}`);
        return res.status(404).json({ message: 'Area not found' });
      }
      
      console.log(`Found area: ${area.name}`);
      return res.json(area);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const areas = await Area.find()
      .skip(skip)
      .limit(limit);
      
    const total = await Area.countDocuments();
    
    console.log(`Found ${areas.length} areas (page ${page}/${Math.ceil(total/limit)})`);
    
    res.json({
      areas,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalItems: total
    });
  } catch (err) {
    console.error('Error getting areas:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/pincode/:pincode', async (req, res) => {
  try {
    const pincode = req.params.pincode.toString().trim();
    console.log(`Looking up area by pincode path param: ${pincode}`);

    if (!pincode || pincode.length < 5) {
      return res.status(400).json({ message: 'Invalid pincode format' });
    }
    
    const area = await Area.findOne({ pincode: pincode });
    if (!area) {
      console.log(`No area found with pincode: ${pincode}`);
      return res.status(404).json({ message: 'Area not found' });
    }
    
    console.log(`Found area: ${area.name}`);
    res.json(area);
  } catch (err) {
    console.error('Error getting area by pincode:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/name/:name', async (req, res) => {
  try {
    const name = req.params.name.trim();
    console.log(`Searching for areas with name containing: ${name}`);

    if (!name || name.length < 2) {
      return res.status(400).json({ message: 'Search term too short' });
    }
    
    const areas = await Area.find({ 
      name: { $regex: new RegExp(name, 'i') } 
    });
    
    console.log(`Found ${areas.length} areas matching "${name}"`);
    
    if (areas.length === 0) {
      return res.status(404).json({ message: 'No areas found matching that name' });
    }
    res.json(areas);
  } catch (err) {
    console.error('Error getting area by name:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/debug/all', async (req, res) => {
  try {
    console.log('DEBUG: Listing all areas in database');
    const areas = await Area.find({}, { name: 1, pincode: 1 }); 
    
    res.json({
      count: areas.length,
      areas: areas
    });
  } catch (err) {
    console.error('Error in debug route:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  } 
});

router.post('/', async (req, res) => {
  try {
    console.log('Creating new area:', req.body.name);

    if (!req.body.name || !req.body.pincode) {
      return res.status(400).json({ message: 'Name and pincode are required' });
    }

    const existingArea = await Area.findOne({ pincode: req.body.pincode });
    if (existingArea) {
      return res.status(409).json({ message: 'Area with this pincode already exists' });
    }
    
    const newArea = new Area(req.body);
    const savedArea = await newArea.save();
    console.log(`Created new area: ${savedArea.name} with pincode ${savedArea.pincode}`);
    res.status(201).json(savedArea);
  } catch (err) {
    console.error('Error adding area:', err);
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    console.log(`Updating area with ID: ${req.params.id}`);
    
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const updatedArea = await Area.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedArea) {
      return res.status(404).json({ message: 'Area not found' });
    }
    
    console.log(`Updated area: ${updatedArea.name}`);
    res.json(updatedArea);
  } catch (err) {
    console.error('Error updating area:', err);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    console.log(`Deleting area with ID: ${req.params.id}`);
    
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const deletedArea = await Area.findByIdAndDelete(req.params.id);
    if (!deletedArea) {
      return res.status(404).json({ message: 'Area not found' });
    }
    
    console.log(`Deleted area: ${deletedArea.name}`);
    res.json({ message: 'Area deleted successfully' });
  } catch (err) {
    console.error('Error deleting area:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;