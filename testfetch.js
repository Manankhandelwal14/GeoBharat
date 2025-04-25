require('dotenv').config();
const mongoose = require('mongoose');
const Area = require('./models/Area');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const areas = await Area.find({});
    console.log("All Areas:", JSON.stringify(areas, null, 2));

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
})();
