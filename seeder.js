// seeder.js file 
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const Area = require('./models/area.js');

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
    pincode: '303905', 
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
  },
  {
  name: "Raja Park",
    pincode: "302004",
    mla: {
      name: "Rafeek Khan",
      party: "Indian National Congress",
      constituency: "Adarsh Nagar Constituency",
      contact: "Rajasthan Legislative Assembly"
    },
    mp: {
      name: "Ramcharan Bohra",
      party: "Bharatiya Janata Party",
      constituency: "Jaipur Parliamentary Constituency",
      contact: "Lok Sabha Members"
    },
    utilities: {
      electricity: {
        provider: "Jaipur Vidyut Vitran Nigam Limited (JVVNL)",
        helpline: "1800-180-6507",
        website: "JVVNL"
      },
      water: {
        provider: "PHED Headquarters – Jaipur",
        address: "Jal Bhawan, 2-Civil Lines, Jaipur – 302006",
        controlRoom: "0141-2222585",
        website: "phedwater.rajasthan.gov.in",
        billingPortal: "jaipurphed.in"
      },
      gas: [
        {
          name: "Indane Gas – Jaipur Gas Service",
          address: "No. 30 & 31B, Sethi Colony, Adarsh Nagar, Jaipur – 302004 (Behind Gurudwara)",
          phone: "+91 85598 18156",
          email: "jaipurgas@yahoo.co.in",
          hours: "Monday to Saturday, 9:00 AM – 6:00 PM; Closed on Sundays"
        },
        {
          name: "Anand Gas Agency (HP Gas)",
          address: "3, Commercial Complex, Govind Marg, Raja Park, Jaipur – 302004 (Near Adarsh Nagar)",
          phone: "0141-2610417, 0141-2617486, +91 94140 71919",
          hours: "Monday to Saturday, 9:00 AM – 7:00 PM; Closed on Sundays"
        },
        {
          name: "Ankit Agencies (Bharat Gas)",
          address: "Tonk Phatak, Jaipur – 302015",
          hours: "11:00 AM – 4:00 PM",
          services: "Authorized dealer of medical gases, industrial gases, and medical surgical items"
        },
        {
          name: "Vikram Krishna Indane",
          address: "No. 25/A/7, 1st Floor, Priha Plaza, Transport Nagar, Jaipur – 302003 (Opposite PNB Bank)",
          phone: "+91 75682 57727",
          hours: "Monday to Saturday, 10:00 AM – 7:00 PM; Closed on Sundays"
        }
      ]
    },
    transport: {
      busDepot: "Raja Park Bus Stand",
      metroStation: "Chandpole Metro Station",
      railwayStation: "Jaipur Junction"
    },
    municipal: {
      name: "Jaipur Municipal Corporation (JMC) – Heritage",
      address: "Nagar Nigam Jaipur Heritage, Behind Hawa Mahal, Manak Chowk, Badi Choupad, Jaipur, Rajasthan 302002",
      contacts: [
        {
          role: "Mayor",
          name: "Smt. Kusum Yadav"
        },
        {
          role: "Commissioner",
          name: "Shri Arun Kumar Hasija (I.A.S.)",
          phone: "0141-2949220",
          email: "commissioner.nnjh@rajasthan.gov.in"
        },
        {
          role: "Additional Commissioner",
          name: "Shri Surendra Singh Yadav (R.A.S.)",
          phone: "0141-2949222",
          email: "addcomm.lsg@rajasthan.gov.in"
        }
      ],
      helplines: {
        controlRoom: "0141-2602666",
        callCenter: ["0141-2607500", "8279179065"],
        timings: "08:00 AM to 10:00 PM"
      }
    },
    emergency: {
      hospitals: [
        {
          name: "NIMS Heart and Brain Hospital (NHBH)",
          address: "B28-29, Govind Marg, Near Geeta Bajaj Auditorium, Raja Park, Jaipur",
          specialties: ["Cardiology", "Neurology", "Emergency Care"],
          facilities: "50 beds, 5 ambulances, 24x7 services",
          website: "Practo - NHBH"
        },
        {
          name: "Evaa Superspeciality Hospital",
          address: "Raja Park Colony, Jaipur",
          specialties: ["Multi-specialty services"],
          consultationFees: "₹0 - ₹850",
          website: "Practo - Evaa Superspeciality Hospital"
        },
        {
          name: "Adinath ENT and General Hospital",
          address: "Raja Park Colony, Jaipur",
          specialties: ["ENT", "Gynecology"],
          consultationFees: "₹400",
          website: "Practo - Adinath ENT and General Hospital"
        },
        {
          name: "Mahatma Gandhi Hospital – City Center",
          address: "Govind Marg, Opposite Dashera Maidan, Near Ram Mandir, Raja Park, Jaipur",
          specialties: ["Multi-specialty services"],
          website: "MGH City Center"
        },
        {
          name: "Mangalam Hospital",
          address: "Adarsh Nagar, Jaipur",
          specialties: ["General Medicine", "Pediatrics"]
        }
      ],
      fireStation: "Raja Park, Jaipur, does not have a dedicated fire station",
      police: {
        address: "Near Baraf Khana Chauraha, Govind Marg, Adarsh Nagar, Jaipur – 302004",
        phone: "+91-141-2607500",
        emergency: "112",
        jurisdiction: ["Raja Park", "Janta Colony", "Gurunanakpura", "Saket Colony"]
      }
    },
    education: {
      schools: [
        {
          name: "Maheshwari Public School",
          address: "Sector 4, Jawahar Nagar, Jaipur",
          board: "CBSE",
          grades: "Class 1 – 12",
          type: "Boys' School",
          annualFee: "₹90,000",
          highlights: "Established in 1978, the school boasts advanced laboratories, computer labs with LAN connectivity, and facilities for fine arts, music, and theatre."
        },
        {
          name: "S V Public School",
          address: "Mira Bhawan, Geeta Bhawan Road, Adarsh Nagar, Jaipur",
          board: "CBSE",
          grades: "Nursery – 12",
          type: "Co-Educational",
          annualFee: "₹45,600",
          highlights: "The school features spacious, technology-enabled classrooms and specialized laboratories."
        },
        {
          name: "Seedling International Academy",
          address: "Park Lane, Sector 4, Jawahar Nagar, Jaipur",
          board: "CBSE & IGCSE",
          grades: "Nursery – 12",
          annualFee: "₹40,000",
          highlights: "Offers a unique learning approach with a focus on engaging content and sharing experiences."
        },
        {
          name: "Dolphins International School",
          address: "E7, Behind Big Boss Studio, Near Moti Dungri Thana, Anandpuri, Adarsh Nagar, Jaipur",
          board: "CBSE",
          grades: "Pre-Nursery – 8",
          highlights: "Pioneers in Rajasthan for organized kindergarten education with modern teaching aids and infrastructure."
        }
      ],
      libraries: [
        {
          name: "Rajasthan State Library",
          location: "Jaipur"
        },
        {
          name: "Jawahar Kala Kendra Library",
          location: "Jaipur"
        },
        {
          name: "University of Rajasthan Library",
          location: "Jaipur",
          access: "Accessible to students and researchers"
        }
      ]
    },
    community: {
      halls: [
        {
          name: "Bhatia Bhavan",
          address: "Ram Gali No. 3, Frontier Colony, Raja Park, Jaipur – 302004",
          capacity: "350–1200 guests",
          idealFor: "Weddings, receptions, and large community events",
          contact: "+91-2249449829",
          details: "A spacious venue suitable for grand celebrations."
        },
        {
          name: "Gulab Vatika",
          address: "Plot No. 19, Ram Gali No. 7, Raja Park, Jaipur – 302004",
          capacity: "150–250 guests",
          idealFor: "Mid-sized events like birthdays and community meetings",
          contact: "+91-8048048262",
          details: "Offers a pleasant ambiance for various functions."
        },
        {
          name: "SDC The Royal Treat Banquets – 2",
          address: "B-26, Govind Marg, Raja Park, Jaipur – 302017",
          capacity: "400–600 guests",
          idealFor: "Weddings, receptions, and large gatherings",
          contact: "+91-2249449847",
          details: "A lavish venue equipped for grand events"
        }
      ]
    },
    propertyRecords: {
      registrarOffices: [
        {
          name: "Sub-Registrar Office Jaipur-II",
          location: "Panjiyan Bhawan, Collectorate, Jaipur",
          services: ["Property registration", "document verification", "stamp duty processing"],
          proximity: "Approximately 4–5 km from Raja Park",
          note: "This office is commonly used for registrations in central Jaipur areas, including Raja Park."
        },
        {
          name: "Sub-Registrar Office Jaipur-IV",
          location: "Nagar Nigam Office, Lal Kothi, Jaipur",
          services: ["Similar to Jaipur-II, handling property-related registrations"],
          proximity: "Approximately 6 km from Raja Park",
          note: "Suitable for residents in the southern parts of Jaipur."
        },
        {
          name: "Sub-Registrar Office Jaipur-V",
          location: "Panjiyan Bhawan, Collectorate, Jaipur",
          services: ["Property registration", "document verification"],
          proximity: "Approximately 4–5 km from Raja Park",
          note: "Also serves areas in and around central Jaipur"
        }
      ]
    }
  },
  {
    name: "C SCHEME",
    pincode: "302001",
    mla: {
      name: "Shri Gopal Sharma",
      party: "Bharatiya Janata Party",
      constituency: "Civil Lines Constituency",
      contact: "Rajasthan Legislative Assembly Members"
    },
    mp: {
      name: "Shri Ramcharan Bohra",
      party: "Bharatiya Janata Party",
      constituency: "Jaipur Parliamentary Constituency",
      contact: "Lok Sabha Members"
    },
    utilities: {
      electricity: {
        provider: "Jaipur Vidyut Vitran Nigam Ltd",
        customerCare: "1800-180-6127",
        helpline: "1800-180-6507",
        website: "JVVNL Website",
        office: "Jaipur Vidyut Vitran Nigam Ltd, Jaipur"
      },
      water: {
        provider: "PHED",
        contactNumber: "1800-180-4190",
        website: "PHED Rajasthan",
        office: "Indira Gandhi Nahar Mandal, C-Scheme, Jaipur"
      },
      gas: [
        {
          name: "Indian Oil (Indane Gas)",
          contact: "+91-141-2223333",
          address: "3A, Kamla Nehru Nagar, Jaipur"
        },
        {
          name: "Bharat Gas",
          contact: "1800-22-4344",
          address: "23, Shastri Nagar, Jaipur"
        },
        {
          name: "HP Gas",
          contact: "1800-2333-555",
          address: "15, Moti Doongari Road, Jaipur"
        }
      ]
    },
    transport: {
      busDepot: {
        name: "Sindhi Camp Bus Stand",
        phone: "0141-2380977"
      },
      metroStation: {
        name: "Civil Lines Metro Station",
        contact: "1800-3000-0959"
      },
      railwayStation: {
        name: "Jaipur Junction",
        phone: "0141-2747075"
      }
    },
    municipal: {
      name: "Jaipur Municipal Corporation (JMC) – Greater Jaipur",
      address: "NMC Building, Indira Circle, C-Scheme, Jaipur – 302001, Rajasthan, India",
      phone: "0141-2747400",
      email: "Addcomm.jmc@Rajasthan.gov.in",
      website: "https://jaipurmc.org"
    },
    emergency: {
      hospitals: [
        {
          name: "SMS Hospital",
          type: "Government",
          address: "JLN Marg, C-Scheme, Jaipur - 302004",
          phone: "0141-2228050"
        },
        {
          name: "Fortis Escorts Hospital",
          type: "Private",
          address: "2, New Fatehpura, C-Scheme, Jaipur",
          phone: "0141-4047777"
        }
      ],
      ambulance: {
        emergency: "108",
        private: "9829040505"
      },
      fireStation: {
        name: "Ashok Nagar Fire Station",
        phone: "0141-2226722",
        address: "Ashok Nagar, C-Scheme, Jaipur"
      },
      police: {
        name: "Ashok Nagar Police Station",
        phone: "0141-2225650",
        address: "C-Scheme, Jaipur",
        emergency: "112"
      }
    },
    education: {
      schools: [
        {
          name: "St. Xavier's Senior Secondary School",
          address: "Bhagwan Das Road, C-Scheme, Jaipur",
          phone: "0141-2614913"
        },
        {
          name: "Saint Soldier College",
          address: "C-Scheme, Jaipur"
        }
      ],
      libraries: {
        name: "Rajasthan State Library",
        address: "Opposite Hawa Mahal, C-Scheme, Jaipur",
        phone: "0141-2224747"
      }
    },
    community: {
      halls: {
        name: "JDA Community Center",
        address: "Ram Kishor Vyas Bhawan, Indra Circle, Jawaharlal Nehru Marg, Jaipur – 302004, Rajasthan, India",
        phone: "0141-2569696",
        email: "jda@rajasthan.gov.in",
        website: "JDA Community Center Booking Portal"
      }
    },
    propertyRecords: {
      registrarOffices: {
        name: "Sub-Registrar Office",
        address: "Panjiyan Bhawan, Collectorate, Jaipur",
        phone: "0141-2565102",
        website: "epanjiyan.rajasthan.gov.in"
      },
      propertyTax: {
        department: "JMC Property Tax Department",
        address: "Jaipur Municipal Corporation, C-Scheme, Jaipur",
        phone: "0141-2560212"
      }
    }
},
  {
    name: "VIDYADHAR NAGAR",
    pincode: "302023",
    mla: {
      name: "Sitaram Agarwal",
      party: "INC",
      constituency: "Vidyadhar Nagar",
      contact: "Rajasthan Legislative Assembly"
    },
    utilities: {
      electricity: {
        provider: "Jaipur Vidyut Vitran Nigam Ltd. (JVVNL)",
        office: {
          address: "Office No. 109, 1st Floor, Tulip Tower, Vidhyadhar Nagar, Jaipur",
          helpline: "1912"
        }
      },
      water: {
        department: "Public Health Engineering Department (PHED)",
        phone: "+91-141-2706624",
        officials: [
          {
            name: "Sh. Gangaram Maurya",
            mobile: "9461013155"
          },
          {
            name: "Smt. Anju Chauhan",
            mobile: "8209882854"
          }
        ],
        website: "PHED Rajasthan"
      },
      gas: [
        {
          name: "Niranjan Gas Agency",
          address: "No 52 & 55, Vinayak Tower, Vidhyadhar Nagar, Sector 6, Jaipur - 302039",
          phone: "+91-9649694770"
        },
        {
          name: "Mangal Mukhi Gas Service",
          address: "Plot No 45, Krisha Colony, Nayakheda, Vidhyadhar Nagar, Jaipur - 302039",
          phone: "+91-9785592079"
        }
      ]
    },
    transport: {
      provider: "Jaipur City Transport Services Ltd. (JCTSL)",
      controlRoom: {
        phone: "+91-7726010937",
        email: "jctsl.bus@gmail.com"
      },
      todiDepot: {
        phone: "+91-7726010943",
        email: "jctsltodidepot@gmail.com"
      },
      website: "JCTSL Contact"
    },
    municipal: {
      department: "Jaipur Municipal Corporation (Greater)",
      zoneOffice: {
        phone: "+91-141-5130103",
        services: ["Sanitation", "waste management", "encroachment control", "street lighting"]
      }
    },
    emergency: {
      hospitals: [
        {
          name: "Manipal Hospital",
          address: "Sector 5, Main Sikar Road, Vidhyadhar Nagar, Jaipur - 302039",
          phone: "+91-91166 56540",
          website: "Manipal Hospital Jaipur"
        },
        {
          name: "Maharaja Agrasen Hospital",
          address: "Sector 7, Vidhyadhar Nagar, Jaipur - 302023",
          phone: "+91-9587895888",
          website: "Maharaja Agrasen Hospital"
        }
      ],
      fireStation: {
        name: "Vidyadhar Nagar Police Station",
        phone: "+91-141-2232900",
        email: "ps.vidhyadharnagar.north@rajasthan.gov.in",
        website: "Vidyadhar Nagar Police Station"
      },

      police: {
        name: "Vidhyadhar Nagar Police Station",
        address: "Near HP Petrol Pump, Sector 2 & 6, Vidhyadhar Nagar, Jaipur, Rajasthan 302023",
        phone: "+91-141-2232900, +91-141-2230100, +91-141-2619725",

        sho: {
          name: "Dilip Kumar Khdaav",
          mobile: "+91-9414531688",
          cugNumber: "+91-8764868062"
  }
}
    },
    education: {
      schools: [
        {
          name: "St. Xavier's Senior Secondary School",
          address: "Bhagwan Das Road, C-Scheme, Jaipur",
          phone: "+91-141-2614913"
        },
        {
          name: "Saint Soldier College",
          address: "C-Scheme, Jaipur"
        }
      ],
      libraries: [
        {
          name: "A2Z Study Point Library",
          address: "298/11, Sector-3, Vidhyadhar Nagar, Jaipur – 302039",
          hours: "7:00 AM – 9:00 PM",
          features: "Offers a comprehensive range of courses, including competitive exam coaching, tuitions for various classes, online mock test series, and Vedic maths tuitions. The library is equipped with modern facilities and resources to provide an optimal learning environment."
        },
        {
          name: "Aarna Library",
          address: "Vidhyadhar Nagar, Jaipur – 302039",
          features: "Provides a conducive environment for study with necessary amenities."
        }
      ]
    },
    community: {
      halls: {
        name: "JDA Community Center",
        address: "Ram Kishor Vyas Bhawan, Indra Circle, Jawaharlal Nehru Marg, Jaipur - 302004",
        phone: "+91-141-2569696",
        website: "JDA Community Center Booking"
      }
    },
    propertyRecords: {
      registrarOffices: [
        {
          name: "Sub-Registrar Office Jaipur-I",
          address: "Jaipur Development Authority (JDA) Main Building, JLN Marg, Jaipur, Rajasthan",
          services: ["Property registration", "document verification", "related services"]
        },
        {
          name: "Sub-Registrar Office Jaipur-II",
          address: "Panjiyan Bhawan, Collectorate Campus, Bani Park, Jaipur, Rajasthan",
          services: ["Handling property registrations", "maintaining land records"]
        }
      ]
    }
  },
   {
    name: "JAGATPURA",
    pincode: "302017",
    "mla": {
      "name": "Prashant Sharma",
      "party": "Indian National Congress",
      "address": "B/S-33, Central Spine Scheme, Jagatpura, Jaipur",
      "contact": "MyNeta"
    },
    "mp": {
      "name": "Harish Chandra Meena",
      "constituency": "Jaipur Constituency",
      "address": "4-ka-10, Jawahar Nagar, Jaipur, Rajasthan - 302004",
      "phone": "+91-141-2657799, +91-9929884441"
    },
    "utilities": {
      "electricity": {
        "provider": "Jaipur Vidyut Vitran Nigam Ltd. (JVVNL)",
        "localOffice": "Jagatpura Power House, Income Tax Colony, Jagatpura Getor, Jaipur - 302017",
        "phone": "+91-9413390585",
        "timings": "9:00 AM – 8:00 PM (All days)"
      },
      "water": {
        "department": "Public Health Engineering Department (PHED), Rajasthan",
        "controlRoom": "+91-141-2706624"
      },
      "gas": [
        {
          "name": "Indane – Om Gas Agency",
          "address": "No. 17 A, Usha Colony, Malviya Nagar, Jaipur - 302017",
          "phone": "+91-9414041692"
        },
        {
          "name": "Indane – Malviya Nagar",
          "address": "Shop No. 49, Model Town, Jagatpura, Malviya Nagar, Jaipur - 302015",
          "phone": "+91-9887027719"
        }
      ]
    },
    "transport": {
      "bus": [
        {
          "name": "Jaipur Low Floor Bus Route No. 8",
          "type": "Circular route"
        },
        {
          "name": "Jaipur Mini Bus Route No. 17",
          "route": "Connects Aakeda Road (VKI area) to Jagatpura"
        }
      ],
      "rail": {
        "name": "Getor Jagatpura Railway Station",
        "code": "GTJT",
        "location": "Jagatpura, Jaipur, Rajasthan",
        "facilities": ["Two platforms", "parking", "bicycle stands", "auto-rickshaw stand", "ticket vending machines", "RPF substation"],
        "majorTrains": ["Jaipur–Hisar Passenger", "Ajmer-Chandigarh Garib Rath Express", "Ajmer-Amritsar Express", "Agra Fort-Ajmer Intercity Express", "others"],
        "connectivity": "Offers direct train services to various destinations, enhancing Jagatpura's connectivity"
      },
      "other": [
        {
          "name": "Auto-Rickshaws & Cycle Rickshaws", 
          "description": "Widely available for short-distance travel within Jagatpura and nearby areas"
        },
        {
          "name": "App-Based Ride Services", 
          "description": "Services like Uber, Ola, and Rapido operate in Jagatpura, offering convenient options for commuting"
        },
        {
          "name": "Taxis", 
          "description": "Traditional taxi services are also accessible for longer distances or personalized travel needs"
        }
      ]
    },
    "municipal": {
      "corporation": "Jaipur Nagar Nigam (Greater)",
      "mayor": {
        "name": "Dr. Somya Gurjar",
        "phone": "+91-8764880001",
        "email": "drsomya.gurjar84@rajasthan.gov.in"
      },
      "commissioner": {
        "name": "Shri Babu Lal Goyal, I.A.S.",
        "phone": "+91-141-2740510",
        "email": "commissioner.jmc@rajasthan.gov.in"
      },
      "helpline": "+91-141-2747400"
    },
    "emergency": {
      "hospitals": [
        {
          "name": "JNU Hospital",
          "address": "Jagatpura, Jaipur, Rajasthan 302017",
          "contact": "+91-141-7199000",
          "website": "www.jnuhealthcare.com",
          "services": "Multispeciality hospital with departments like cardiology, neurology, oncology, and more"
        },
        {
          "name": "Rishab Multispeciality Hospital",
          "address": "NRI Choraha, Vishwa Vidhyalaya Nagar, Jagatpura, Jaipur, Rajasthan 302017",
          "contact": "+91-96943-96943",
          "website": "www.rishabhospital.com",
          "services": "Offers services in pediatrics, neurosurgery, pulmonology, cardiology, and more"
        },
        {
          "name": "Aarogyam Hospital",
          "address": "Jagatpura, Jaipur, Rajasthan",
          "contact": "+91-95295-49090",
          "website": "www.aarogyamhospitals.org",
          "services": "Provides gynecology, neurology, pediatrics, dental care, and 24/7 emergency services"
        },
        {
          "name": "Jeevan Rekha Superspeciality Hospital",
          "address": "Jagatpura, Jaipur, Rajasthan",
          "contact": "Details not specified",
          "services": "Superspeciality hospital services"
        }
      ],
      "fireStation": {
        "name": "Jaipur Airport Fire Station",
        "address": "H 1-2227, Ramchandrapura, Phase 4, Jagatpura Road, Sanganer, Jaipur - 303905"
      },
      "police": [
        {
          "name": "Jagatpura Police Chowki",
          "phone": "+91-141-2750508",
          "address": "Jagatpura, Jaipur"
        },
        {
          "name": "Malviya Nagar Police Station",
          "address": "A-235, Calgiri Marg, Jhalana Gram, Malviya Nagar, Jaipur - 302017",
          "phone": "+91-141-2523040"
        }
      ]
    },
    "education": {
      "colleges": [
        {
          "name": "Government College, Jagatpura",
          "address": "Jaipur",
          "phone": "+91-9530043700",
          "email": "gcjagatpura@gmail.com",
          "source": ["jaipurmcheritage.org", "Rajasthan HTE"]
        },
        {
          "name": "Jaipur National University",
          "address": "Jaipur-Agra Bypass, Near New RTO Office, Jagatpura, Jaipur - 302017",
          "phone": "+91-141-3127028",
          "tollFree": "1800-102-1900",
          "email": ["info@jnujaipur.ac.in", "admissions@jnujaipur.ac.in"],
          "website": "jnujaipur.ac.in"
        }
      ],
      "schools": [
        {
          "name": "Rajasthan Sadhana Public Senior Secondary School",
          "address": "B-45, Vishnu Vihar, Jagatpura, Jaipur - 302017",
          "phone": ["+91-141-2759607", "+91-9414335701", "+91-9024116926"],
          "email": "sadhana@rajasthanschool.com"
        }
      ],
      "libraries": [
        {
          "name": "Abhay Library",
          "address": "Jagatpura Road, Vivek Vihar, Jagatpura, Jaipur, Rajasthan 302017",
          "mapSource": "Mappls"
        },
        {
          "name": "Brilliant Library",
          "address": "Jagatpura, Jaipur, Rajasthan 302017",
          "contact": "+91-7733888077",
          "facilities": ["Fully air-conditioned", "Wi-Fi", "RO water", "Hindi & English newspapers", "current GK materials"],
          "socialMedia": "Facebook Page: Brilliant Library"
        },
        {
          "name": "Bhumika Library",
          "address": "Vivek Vihar Mod, Jagatpura, near Shiv Mandir, Jaipur, Rajasthan 302017",
          "details": "A local library offering a quiet study environment"
        }
      ]
    },
    "community": {
      "centers": [
        {
          "name": "Anand Vihar Community Center",
          "address": "D-Block, Anand Vihar, Railway Colony, Jagatpura, Jaipur - 302017",
          "contactPersons": [
            {
              "name": "Smt. Ruchi Kapoor",
              "phone": "+91-8209075747"
            },
            {
              "name": "Smt. Monica Joshi",
              "phone": "+91-9829059910"
            }
          ]
        },
        {
          "name": "JDA Community Center",
          "phone": "+91-141-2569696",
          "bookingPortal": "jda.rajasthan.gov.in"
        }
      ]
    },
    "propertyRecords": {
      "registrarOffices": [
        {
          "name": "Jaipur-I Sub-Registrar Office",
          "location": "JDA Main Building, JLN Marg, Jaipur"
        },
        {
          "name": "Jaipur-II Sub-Registrar Office",
          "location": "Panjiyan Bhawan, Collectorate Campus, Bani Park, Jaipur"
        }
      ]
    }
},

{
    name: "BAPU NAGAR",
    pincode: "302015",
    mla: {
      "constituency": "Malviya Nagar Assembly Constituency",
      "note": "For the most accurate and up-to-date information on the current MLA, please refer to the official Rajasthan Legislative Assembly website: assembly.rajasthan.gov.in"
    },
    "mp": {
      "note": "For the most accurate and up-to-date information on the current MP, please refer to the official Rajasthan Legislative Assembly website: assembly.rajasthan.gov.in"
    },
    "municipal": {
      "corporation": "Jaipur Nagar Nigam (Greater)",
      "mayor": {
        "name": "Dr. Somya Gurjar",
        "phone": "8764880001",
        "email": "drsomya.gurjar84@rajasthan.gov.in"
      },
      "commissioner": {
        "name": "Shri Babu Lal Goyal, I.A.S.",
        "phone": "0141-2740510",
        "email": "commissioner.jmc@rajasthan.gov.in"
      },
      "headOffice": {
        "address": "Pandit Deendayal Upadhyay Bhawan, Lal Kothi, Tonk Road, Jaipur, Rajasthan",
        "controlRoom": "0141-2742900",
        "helpline": "0141-2747400",
        "pbxNumbers": ["0141-2740510", "0141-2742404", "0141-2741061", "0141-2740167", "0141-2742054"],
        "website": "jaipurmc.org"
      },
      "zonalOffice": {
        "contact": "+91-141-2744697"
      },
      "wasteManagement": {
        "doorToDoorComplaint": "8447905965",
        "onlinePortal": "Samadhan Portal"
      }
    },
    "utilities": {
      "electricity": {
        "provider": "Jaipur Vidyut Vitran Nigam Ltd. (JVVNL)",
        "customerCare": ["1800-180-6507", "1912"],
        "website": "jvvnl.org"
      },
      "water": {
        "department": "Public Health Engineering Department (PHED)",
        "stateControlRoom": "0141-2222585",
        "website": "phedwater.rajasthan.gov.in"
      },
      "gas": [
        {
          "name": "Ashish Gas Jaipur",
          "address": "Shop No. 128, Mishra Market, Opposite Agarwal College, Agra Road, Jaipur",
          "contact": "+91-9414070868",
          "services": ["New connections", "cylinder refills", "emergency services"],
          "distributorCode": "41012215"
        },
        {
          "name": "Vasundhara HP Gas Agency",
          "address": "38A, Amrapali Road, Indraprastha Colony, B Block, Vaishali Nagar, Jaipur",
          "contact": "+91-9414070077",
          "services": ["Domestic LPG supply", "customer support"]
        }
      ]
    },
    "transport": {
      "metro": {
        "nearestStation": "Civil Lines Metro Station",
        "distance": "approximately 4 km away",
        "contact": "0141-2222470",
        "email": "cljp@jaipurmetrorail.in"
      },
      "rail": {
        "nearestStation": "Gandhi Nagar Jaipur Railway Station",
        "distance": "approximately 3 km away"
      },
      "website": "transport.rajasthan.gov.in"
    },
    "emergency": {
      "hospitals": [
        {
          "name": "Santokba Durlabhji Memorial Hospital (SDMH)",
          "address": "Bhagwan Das Road, Bapu Nagar, Jaipur",
          "contact": "0141-2566251",
          "website": "sdmh.in",
          "overview": "Established in 1971, SDMH is a 551-bed, multi-specialty, not-for-profit hospital offering comprehensive medical services, including one of the best blood banks in the country."
        },
        {
          "name": "KKS Urology & General Hospital",
          "address": "B-132A, Rajendra Marg, Bapu Nagar, Jaipur",
          "contact": ["0141-2711534", "0141-2710413"],
          "email": "info@kksurology.com",
          "website": "kksurology.com",
          "overview": "Specializes in urology, general surgery, orthopedics, gynecology, and more. Recognized as the Best Urology Hospital of Rajasthan at the Radio City Icon Awards 2018."
        }
      ],
      "fireStation": {
        "name": "Fire Station - Malviya Nagar",
        "address": "Omega Company, Malviya Nagar Industrial Area, Opposite, Jaipur, Rajasthan 302017",
        "phone": "+91-141-2755930",
        "overview": "This station is located approximately 3 km from Bapu Nagar and provides emergency fire services to the surrounding areas."
      },
      "police": [
        {
          "name": "Gandhi Nagar Police Station",
          "address": "University Marg, Bapu Nagar, Jaipur, Rajasthan 302015",
          "phone": "+91-141-2619725"
        }
      ]
    },
    "education": {
      "governmentSchools": [
        {
          "name": "Government Upper Primary School",
          "address": "University Marg, Bapu Nagar, Jaipur",
          "timings": "Monday–Saturday, 7:00 AM – 3:00 PM"
        },
        {
          "name": "Government Primary School, Surya Nagar",
          "address": "Ward No. 14, Surya Nagar, Jaipur",
          "overview": "Provides foundational education to children in the Surya Nagar area."
        }
      ],
      "privateSchools": [
        {
          "name": "Subodh Public School",
          "address": "Bhawani Singh Road, Rambagh Crossing, Jaipur",
          "board": "CBSE",
          "grades": "Nursery to 12",
          "fees": "Approximately ₹60,000 per annum",
          "overview": "Established in 1985, this co-educational institution emphasizes academic excellence and holistic development."
        },
        {
          "name": "Maharaja Sawai Man Singh Vidyalaya",
          "address": "Sawai Ram Singh Road, Rambagh, Jaipur",
          "board": ["CBSE", "IGCSE"],
          "grades": "Nursery to 12",
          "fees": "Approximately ₹1,37,500 per annum",
          "overview": "Founded in 1984, the school offers a blend of traditional and modern education frameworks."
        },
        {
          "name": "Maheshwari Public School International",
          "address": "Bhabha Marg, Tilak Nagar, Jaipur",
          "board": "CBSE",
          "grades": "Class 1 to 12",
          "fees": "Approximately ₹1,00,000 per annum",
          "overview": "Run under the Maheshwari Samaj, the school focuses on high-quality education within a safe environment."
        }
      ],
      "libraries": "NOT AVAILABLE"
    },
    "community": {
      "centers": [
        {
          "name": "Brahma Kumaris Rajyoga Meditation Center",
          "address": "D-82A, Prabhu Kunj Bhawan, First Floor, Krishna Marg, Bapu Nagar, Jaipur – 302015",
          "contact": {
            "phone": "0141-2708462",
            "mobile": "+91-9950167468",
            "email": "bapunagar.jpr@bkivv.org"
          },
          "overview": "This center offers meditation sessions, spiritual classes, and community programs."
        },
        {
          "name": "JDA Community Center",
          "bookingPortal": "Jaipur Development Authority",
          "overview": "The Jaipur Development Authority (JDA) provides community centers across Jaipur for public events. Residents can book these centers online through the JDA portal."
        }
      ]
    },
    "propertyRecords": {
      "registrarOffices": [
        {
          "name": "Sub-Registrar Office Jaipur-IV",
          "address": "Nagar Nigam Office, Lal Kothi, Jaipur, Rajasthan",
          "overview": "This office handles property registrations, marriage registrations, and other legal documentation for the Bapu Nagar area."
        }
      ]
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