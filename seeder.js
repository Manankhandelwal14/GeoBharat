require('dotenv').config();
const mongoose = require('mongoose');
const Area = require('./models/area.js');
const areaData = require('./data/areaData'); // no .js needed if using node

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected for seeding'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

const seedData = async () => {
  try {
    await Area.deleteMany({});
    console.log('🧹 Existing data cleared');

    await Area.insertMany(areaData);
    console.log('✅ Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
