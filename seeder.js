// seeder.js file 
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const Area = require('./models/Area.js');

connectDB();

const areaData = [
  {
    name: 'Mansarovar',
    pincode: '302020',
    mla: {
      name: 'Bhajan Lal Sharma',
      party: 'Sanganer Assembly Constituency',
      phone: '+91 94140 23007',
      office: 'Flat No. 705, Balaji Tower‑III, Near EHCC Hospital, Jawahar Circle, Jaipur – 302004'
    },
    mp: {
      name: 'Manju Sharma',
      phone: '+91 98293 94789, +91 94991 00326',
      office: 'Unique Sanghi Apartments, Mahaveer Nagar, Durgapura, Jaipur – 302018'
    },
    utilities: {
      electricity: {
        name: 'Jaipur Vidyut Vitran Nigam Ltd. (JVVNL)',
        helpline: '1800-180-6507, 1912',
        address: 'Jaipur Nagar Nigam Campus, MI Road, Jaipur – 302001',
      },
      water: {
        name: 'PHED Mansarovar Sub-Division Office',
        helpline: '0141-2706624',
        address: 'Near Agarwal Farm, Rajat Path, Mansarovar, Jaipur – 302020'
      },
      gas: [
        {
          name: 'Rastogi HP Gas Agency',
          address: '91/45 Patel Marg, Sector 9, Mansarovar, Jaipur – 302020',
          phone: '0141-2395455'
        },
        {
          name: 'Mansarovar Indane Gas',
          address: 'Shop No 6C, Zone-48, Rajat Path, Mansarovar, Jaipur – 302020',
          phone: '0141-2653828'
        }
      ],
      waste: {
        department: 'Jaipur Municipal Corporation (Waste Management Division)',
        helpline: '0141-5110111',
        address: 'Sector 9, Mansarovar, Jaipur – 302020',
        email: 'jmc@rajasthan.gov.in',
        website: 'https://jaipurmcheritage.org'
      }
    },
    transportation: {
      bus: [
        {
          name: 'SFS Sector 6 Bus Stand',
          contact: '+91 96368 35798',
          address: 'Kabir Marg, Hans Vihar, Mansarovar',
          services: 'Low‑floor Bus Route 9A (Agarwal Farm ⇄ Dadi ka Phatak)'
        }
      ],
      metro: [
        {
          name: 'New Aatish Market Station',
          contact: '0141‑2385790'
        }
      ],
      railway: [
        {
          name: 'Durgapura Railway Station',
          contact: '139 / 1800 11 1139; Station Helpline: 0141‑2721787',
          address: 'Mahaveer Nagar, Jaipur – 302020',
          services: 'Major halt for express & superfast trains'
        }
      ]
    },
    emergency: {
      hospitals: [
        {
          name: 'Saket Multispeciality Hospital',
          address: 'Sector 10, Meera Marg, Agarwal Farm, Mansarovar, Jaipur – 302020',
          phone: '0141‑2785075 / +91 88750 02436'
        },
        {
          name: 'Purvi Nursing Home',
          address: '48/110 Rajat Path, Kiran Path, Sector 6, Mansarovar, Jaipur – 302020',
          phone: '0141‑4170591'
        }
      ],
      fireStations: [
        {
          name: 'Mansarovar Fire Station',
          address: 'Mansarovar, Jaipur',
          phone: '0141‑5178866'
        }
      ],
      police: {
        address: 'Sector 9, Rajat Path, Near Agarwal Farm, Mansarovar, Jaipur – 302020',
        phone: '0141-2391717',
        emergency: '112'
      }
    },
    education: [
      {
        name: 'Govt. Middle School',
        type: 'School',
        address: 'Sector 12, Near Community Park, Mansarovar, Jaipur – 302020',
        phone: '0141-2781524',
        details: 'Classes: 1st to 8th, Board: RBSE (Rajasthan Board)'
      },
      {
        name: 'Govt. Secondary School',
        type: 'School',
        address: 'Sector 22, Near Sector 23 Market, Mansarovar, Jaipur – 302020',
        phone: '0141-2781378',
        details: 'Classes: 1st to 10th, Board: RBSE (Rajasthan Board)'
      }
    ],
    publicFacilities: {
      libraries: [
        {
          name: 'Mansarovar Public Library',
          address: 'Sector 19, Near Community Park, Mansarovar, Jaipur – 302020',
          phone: '+91-9460299486',
          timings: '9:00 AM to 7:00 PM (Monday to Saturday)'
        }
      ],
      communityCenters: [
        {
          name: 'Sector 6 Community Hall',
          address: 'Sector 6, Near Central Park, Mansarovar, Jaipur – 302020',
          phone: '+91-141-2391540',
          facilities: 'Public gatherings, Social events, Indoor sports area, Marriage bookings (via Jaipur Nagar Nigam)'
        },
        {
          name: 'Sector 10 Senior Citizen Centre',
          address: 'Sector 10, Near Hanuman Mandir, Mansarovar, Jaipur – 302020',
          phone: '+91-141-2391540',
          facilities: 'Daytime recreational space, Health check-up camps, Yoga sessions, Cultural programs'
        }
      ],
      landRecords: {
        name: 'Tehsil Office, Sanganer',
        address: 'Sanganer, Jaipur',
        phone: '0141‑2796605'
      }
    }
  },
  {
    name: 'Sitapura Industrial Area',
    pincode: '302022', // Updated correct pincode from data
    mla: {
      name: 'Ashok Lahoti',
      party: '',
      phone: '+91-9829012555',
      office: '81/23, Patel Marg, Mansarovar, Jaipur'
    },
    mp: {
      name: 'Ramcharan Bohra',
      phone: '+91-9414040205',
      office: '22, Shastri Nagar, Jaipur'
    },
    utilities: {
      electricity: {
        name: 'Electricity (JVVNL) Sitapura Substation',
        helpline: '1800-180-6507, 1912',
        address: 'Near EPIP Zone, Sitapura, Jaipur – 302022',
        website: ''
      },
      water: {
        name: 'Water Supply (PHED Sitapura)',
        helpline: '0141-2706624',
        address: 'Near EPIP Gate, Sitapura Industrial Area, Jaipur'
      },
      gas: [
        {
          name: 'Indane Sitapura Gas Agency',
          address: '38-EPIP, Sitapura Industrial Area',
          phone: '0141-2771233'
        },
        {
          name: 'Mansarovar Indane Gas',
          address: 'Shop No 6C, Zone-48, Rajat Path, Mansarovar, Jaipur – 302020',
          phone: '0141-2653828'
        }
      ],
      waste: {
        department: 'Jaipur Municipal Corporation (Waste Management Division)',
        helpline: '0141-5110111',
        address: 'Sector 9, Mansarovar, Jaipur – 302020',
        email: 'jmc@rajasthan.gov.in',
        website: 'https://jaipurmcheritage.org'
      }
    },
    transportation: {
      bus: [
        {
          name: 'Sitapura Bus Stand',
          contact: '0141-2721921',
          address: 'Tonk Road, Near EPIP Gate, Sitapura',
          services: 'Local city buses (JCTSL), intercity RSRTC services'
        },
        {
          name: 'Narayan Singh Circle ISBT',
          contact: '0141-2376046',
          address: 'Narayan Singh Circle, Jaipur (12 km away)',
          services: 'Outstation bus services to Delhi, Kota, Ajmer, and other cities'
        }
      ],
      metro: [
        {
          name: 'Mansarovar Metro Station (Pink Line)',
          contact: '0141-2727000',
          address: 'New Sanganer Road, Mansarovar (10 km)',
          services: 'Rapid transit metro line to Chandpole, Civil Lines, Sindhi Camp, and city center'
        }
      ],
      railway: [
        {
          name: 'Durgapura Railway Station',
          contact: '139',
          address: 'Durgapura, Tonk Road, Jaipur (8.5 km)',
          services: 'Major halt for express & superfast trains'
        },
        {
          name: 'Jaipur Junction',
          contact: '0141-2200560',
          address: 'Hasanpura Road, Jaipur (15 km)',
          services: 'Central rail hub for all long-distance trains'
        }
      ]
    },
    emergency: {
      hospitals: [
        {
          name: 'Mahatma Gandhi Hospital',
          address: 'RIICO Institutional Area, Sitapura, Jaipur – 302022',
          phone: '0141-2771002'
        }
      ],
      fireStations: [
        {
          name: 'EPIP Gate, Sitapura Industrial Area',
          address: 'Sitapura, Jaipur',
          phone: '0141-2772002'
        }
      ],
      police: {
        address: 'RIICO Industrial Area, Sitapura, Jaipur – 302022',
        phone: '0141-2770151',
        emergency: '112'
      }
    },
    education: [
      {
        name: 'Govt. Polytechnic College',
        type: 'College',
        address: 'RIICO Industrial Area, Sitapura, Jaipur – 302022',
        phone: '0141-2771779',
        details: 'Diploma programs in Engineering, IT, Mechanical, Civil, Electronics'
      },
      {
        name: 'JECRC University',
        type: 'University',
        address: 'Plot No. IS-2036 to 2039, RIICO Industrial Area, Sitapura Extension, Jaipur – 302022',
        phone: '0141-6565605',
        details: 'B.Tech, M.Tech, MBA, Law, Management, Design, Pharmacy, and Ph.D. programs'
      },
      {
        name: 'Mahatma Gandhi Medical College & Hospital',
        type: 'Medical College',
        address: 'Sitapura Institutional Area, Tonk Road, Jaipur – 302022',
        phone: '0141-2771777',
        details: 'MBBS, MD/MS, Nursing, Para-medical courses, with 1200-bed hospital'
      }
    ],
    publicFacilities: {
      libraries: [],
      communityCenters: [
        {
          name: 'RIICO Industrial Community Center',
          address: 'Sitapura, Jaipur',
          phone: '0141-2770151',
          timings: '9:00 AM to 9:00 PM'
        }
      ],
      landRecords: {
        name: 'JDA Zonal Office – Sitapura',
        address: 'EPIP Gate, Sitapura, Jaipur',
        phone: '0141-2569696'
      }
    }
  },
  {
    name: 'Vaishali Nagar',
    pincode: '302021',
    mla: {
      name: 'Balmukundachary',
      party: 'BJP',
      phone: '',
      office: 'Constituency: Hawa Mahal (Jaipur)'
    },
    mp: {
      name: 'Jaipur Parliamentary Constituency',
      phone: '',
      office: 'Specific information not available'
    },
    utilities: {
      electricity: {
        name: 'Jaipur Vidyut Vitran Nigam Ltd. (JVVNL)',
        helpline: '1800-180-6507 / 1912',
        address: '',
        website: '',
        email: 'aena4jcc@jvvnl.org'
      },
      water: {
        name: 'Public Health Engineering Department (PHED), Rajasthan',
        helpline: '0141-2706624',
        address: ''
      },
      gas: [
        {
          name: 'Indane - Asal Durg Ent',
          address: 'No 203, Gandhi Path, Girnar Colony, Vaishali Nagar, Jaipur - 302021',
          phone: '+91 99295 55700',
          landmark: 'Near Honda Showroom'
        }
      ],
      waste: {
        department: '',
        helpline: '',
        address: '',
        email: '',
        website: ''
      }
    },
    transportation: {
      bus: [
        {
          name: 'Vaishali Nagar Bus Depot',
          contact: '0141-2373789',
          address: 'Vaishali Nagar, Jaipur',
          services: ''
        }
      ],
      metro: [
        {
          name: 'Mansarovar Metro Station',
          contact: '0141-2822151',
          address: '',
          services: '',
          customerCare: '0141-2822171',
          emergency: '0141-2812970',
          email: 'msor@jaipurmetrorail.in'
        }
      ],
      railway: [
        {
          name: 'Jaipur Junction Railway Station',
          contact: '139',
          address: 'Station Road, Near Sindhi Camp, Jaipur, Rajasthan 302006',
          services: ''
        }
      ]
    },
    emergency: {
      hospitals: [
        {
          name: 'Vaishali Hospital & Surgical Research Center',
          address: '69 Nand Vihar, Amrapali Marg, Vaishali Nagar, Jaipur, Rajasthan 302021',
          phone: '+91 87697 60077 / +91 70230 04355',
          email: 'vaishalihospital1999@gmail.com / info@vaishalihospital.com',
          website: 'vaishalihospital.com'
        }
      ],
      fireStations: [],
      police: {
        address: 'Vaishali Nagar, Jaipur, Rajasthan',
        phone: '0141-2352088',
        emergency: '',
        sho: {
          name: 'Ishawar Chand',
          phone: '+91 70145 81601 / +91 87648 68041'
        },
        acp: {
          name: 'Surendra Singh',
          phone: '0141-2358981',
          mobile: '+91 94143 21699 / +91 87648 67010'
        }
      }
    },
    education: [
      {
        name: 'Government Girls Senior Secondary School',
        type: 'School',
        address: 'Sector 4, Near Amrapali Circle, Vaishali Nagar, Jaipur – 302021',
        phone: '0141-2351440',
        details: 'Board: RBSE (Rajasthan Board), Classes: 6th to 12th'
      },
      {
        name: 'Government Boys Secondary School',
        type: 'School',
        address: 'Near Hanuman Mandir, Vaishali Nagar, Jaipur',
        phone: '0141-2351023',
        details: 'Board: RBSE, Classes: 6th to 10th'
      },
      {
        name: 'Tagore Public School',
        type: 'Private School',
        address: 'Shyam Nagar Extension, Vaishali Nagar, Jaipur',
        phone: '0141-2350200',
        details: 'Board: CBSE, Website: tagorepublicschool.in'
      },
      {
        name: 'Rukmani Birla Modern High School (RBMHS)',
        type: 'Private School',
        address: 'Near Gopalpura Bypass (close to Vaishali Nagar)',
        phone: '0141-2762130',
        details: 'Board: CBSE, Website: rbmhsjaipur.edu.in'
      }
    ],
    publicFacilities: {
      libraries: [
        {
          name: 'Public Library – Vaishali Nagar Community Library',
          address: 'Near Amrapali Circle, Vaishali Nagar, Jaipur',
          phone: '+91-98290 30300',
          timings: '10:00 AM to 6:00 PM',
          features: 'Reading room, local newspapers, student study material'
        },
        {
          name: 'Sarthi Library & Reading Room',
          address: 'Gandhi Path, Vaishali Nagar',
          phone: '',
          timings: '',
          features: 'AC halls, UPS, internet, competitive exam zone'
        }
      ],
      communityCenters: [
        {
          name: 'Vaishali Nagar Community Hall (JMC)',
          address: 'Sector 4, Near Amrapali Marg',
          phone: '0141-2740510',
          facilities: 'Marriage functions, public events, government awareness programs'
        },
        {
          name: 'Open Air Theaters & Public Gardens',
          address: 'Shiv Park, Shree Ram Vatika, Amrapali Park',
          phone: '',
          facilities: 'Senior citizen groups, yoga camps, children\'s play zones'
        }
      ],
      landRecords: {
        name: 'Sub-Registrar Office – Jaipur-VII (Vaishali Nagar)',
        address: 'Chitrakoot Stadium, Vaishali Nagar, Jaipur – 302021',
        phone: '',
        timings: 'Monday to Friday, 10:00 AM – 5:00 PM (excluding public holidays)',
        services: 'Property registration (sale, purchase, lease deeds), Will registration, Marriage registration, Power of Attorney documentation, Certified copies of registered documents'
      }
    }
  }
];

const importData = async () => {
  try {
    await Area.deleteMany();

    await Area.insertMany(areaData);
    
    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Area.deleteMany();
    
    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}