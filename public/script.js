// NAVIGATION TOGGLE
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== "#") {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            if (history.replaceState) {
                history.replaceState(null, null, targetId);
            } else {
                window.location.hash = targetId;
            }

            if (navLinks?.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// MAIN FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function () {
    const pincodeInput = document.getElementById('pincode');
    const searchIcon = document.querySelector('.search-icon');
    const getLocationBtn = document.getElementById('get-location');
    const locationLoading = document.getElementById('location-loading');

    // Search by pincode
    function handleSearch() {
        const pincode = pincodeInput?.value.trim();
        if (/^\d{6}$/.test(pincode)) {
            window.location.href = `result.html?pincode=${pincode}`;
        } else {
            alert('Please enter a valid 6-digit pincode');
        }
    }

    searchIcon?.addEventListener('click', handleSearch);
    pincodeInput?.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') handleSearch();
    });

    // Get location and detect pincode
    if (getLocationBtn) {
        const locationIcon = getLocationBtn.querySelector('.fa-location-dot');
        const GOOGLE_API_KEY = "AIzaSyDPSf_xBWfBKPkyk9ah-BlVQyjzUEBf4Mk";

        getLocationBtn.addEventListener('click', function () {
            if (!navigator.geolocation) {
                alert('Geolocation is not supported by your browser.');
                return;
            }

            locationIcon.style.display = 'none';
            locationLoading.style.display = 'inline-block';
            getLocationBtn.classList.add('loading');

            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
                    const googleRes = await fetch(geocodeUrl);
                    const googleData = await googleRes.json();

                    let address = "Not available";
                    if (googleData.status === "OK" && googleData.results.length) {
                        address = googleData.results[0].formatted_address || "Not available";
                    }

                    const indianPincode = googleData.results
                        .flatMap(r => r.address_components)
                        .find(c => c.types.includes("postal_code"))?.long_name || "";

                    if (/^\d{6}$/.test(indianPincode)) {
                        pincodeInput.value = indianPincode;
                        alert(`✅ Pincode: ${indianPincode}\n📍 Address: ${address}`);
                    } else {
                        const manual = prompt(`Could not detect pincode.\nAddress: ${address}\nEnter your 6-digit pincode:`);
                        if (manual && /^\d{6}$/.test(manual)) {
                            pincodeInput.value = manual;
                        }
                    }
                } catch (error) {
                    console.error("Location fetch error:", error);
                    alert("Something went wrong. Please try again.");
                } finally {
                    locationIcon.style.display = 'inline-block';
                    locationLoading.style.display = 'none';
                    getLocationBtn.classList.remove('loading');
                }
            }, (error) => {
                console.error('Geolocation error:', error);
                alert('Please allow location access or enter pincode manually.');
            }, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            });
        });
    }

    // Utility service buttons
    const utilityButtons = document.querySelectorAll('.utility-button');
    utilityButtons?.forEach(button => {
        button.addEventListener('click', function () {
            const serviceType = this.getAttribute('data-service');
            const pincode = pincodeInput?.value.trim();
            if (!/^\d{6}$/.test(pincode)) {
                alert('Please enter a valid 6-digit pincode first');
                return;
            }
            window.location.href = `utility-result.html?pincode=${pincode}&service=${serviceType}`;
        });
    });
});

// Utilities
function getURLParameter(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function showError(message) {
    document.getElementById('loading').style.display = 'none';
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Function to fetch area information for result page
async function fetchAreaInfo() {
    const pincode = getURLParameter('pincode');
    if (!pincode) {
        showError('No pincode provided. Please try again.');
        return;
    }
    
    try {
        // Make API request
        const backendURL = 'http://192.168.109.128:5001';
        const response = await fetch(`${backendURL}/api/area/pincode/${pincode}`);

        if (!response.ok) {
            if (response.status === 404) {
                showError('Area not found. Please check the pincode and try again.');
            } else {
                showError('Error fetching area information. Please try again later.');
            }
            return;
        }
        
        // Process response
        const responseData = await response.json();
        let areaData;
        
        if (responseData.data) {
            areaData = responseData.data;
        } else {
            areaData = responseData;
        }
        
        displayAreaInfo(areaData);
        
    } catch (error) {
        console.error('Error:', error);
        showError('Error connecting to the server. Please try again later.');
    }
}

// Helper function to safely get nested properties
function getSafe(obj, path) {
    if (!obj) return null;
    const keys = path.split('.');
    return keys.reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Helper function to check if a value exists and is meaningful
function safe(val) {
    return (val && val !== "null" && val !== "") ? val : "N/A";
}

// Helper function to find the first valid value from multiple possible paths
function getFirstValid(...paths) {
    return (obj) => {
        for (const path of paths) {
            const value = getSafe(obj, path);
            if (value && value !== "null" && value !== "") {
                return value;
            }
        }
        return null;
    };
}

function displayAreaInfo(area) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('area-details').style.display = 'block';
    
    // Set area title with pincode
    document.querySelector('.area-title').textContent = `${area.name} (${area.pincode})`;

    // MLA Information
    document.getElementById('mla-name').textContent = safe(getSafe(area, 'mla.name'));
    document.getElementById('mla-party').textContent = safe(getSafe(area, 'mla.party'));
    document.getElementById('mla-phone').textContent = safe(getSafe(area, 'mla.contact') || getSafe(area, 'mla.phone'));
    document.getElementById('mla-office').textContent = safe(getSafe(area, 'mla.constituency') || getSafe(area, 'mla.office'));

    // MP Information
    document.getElementById('mp-name').textContent = safe(getSafe(area, 'mp.name'));
    document.getElementById('mp-party').textContent = safe(getSafe(area, 'mp.party'));
    document.getElementById('mp-phone').textContent = safe(getSafe(area, 'mp.phone') || getSafe(area, 'mp.contact'));
    document.getElementById('mp-office').textContent = safe(getSafe(area, 'mp.constituency') || getSafe(area, 'mp.office'));

    // Utilities: Electricity
    document.getElementById('electricity-name').textContent = safe(getSafe(area, 'utilities.electricity.provider') || getSafe(area, 'utilities.electricity.name'));
    document.getElementById('electricity-helpline').textContent = safe(getSafe(area, 'utilities.electricity.helpline') || getSafe(area, 'utilities.electricity.office.helpline'));
    document.getElementById('electricity-address').textContent = safe(getSafe(area, 'utilities.electricity.address') || getSafe(area, 'utilities.electricity.office.address'));

    // Utilities: Water
    document.getElementById('water-name').textContent = safe(getSafe(area, 'utilities.water.department') || getSafe(area, 'utilities.water.name'));
    document.getElementById('water-helpline').textContent = safe(getSafe(area, 'utilities.water.helpline') || getSafe(area, 'utilities.water.phone'));
    document.getElementById('water-address').textContent = safe(getSafe(area, 'utilities.water.address'));

    // Gas Agencies
    const gasContainer = document.getElementById('gas-agencies');
    gasContainer.innerHTML = "";
    const gasAgencies = getSafe(area, 'utilities.gas') || [];
    if (gasAgencies.length === 0) {
        gasContainer.innerHTML = `<p>No gas agency information available</p>`;
    } else {
        gasAgencies.forEach(gas => {
            gasContainer.innerHTML += `
                <p>
                    <strong>Name:</strong> ${safe(gas.name)}<br>
                    <strong>Address:</strong> ${safe(gas.address)}<br>
                    <strong>Phone:</strong> ${safe(gas.phone)}
                </p>`;
        });
    }

    // Waste Management
    document.getElementById('waste-dept').textContent = safe(getSafe(area, 'utilities.waste.department'));
    document.getElementById('waste-helpline').textContent = safe(getSafe(area, 'utilities.waste.helpline'));
    document.getElementById('waste-address').textContent = safe(getSafe(area, 'utilities.waste.address'));
    document.getElementById('waste-email').textContent = safe(getSafe(area, 'utilities.waste.email'));

    // Emergency - Hospitals
    const hospitalContainer = document.getElementById('hospital-list');
    hospitalContainer.innerHTML = "";
    const hospitals = getSafe(area, 'emergency.hospitals') || [];
    if (hospitals.length === 0) {
        hospitalContainer.innerHTML = `<p>No hospital information available</p>`;
    } else {
        hospitals.forEach(h => {
            hospitalContainer.innerHTML += `
                <p>
                    <strong>Name:</strong> ${safe(h.name)}<br>
                    <strong>Address:</strong> ${safe(h.address)}<br>
                    <strong>Phone:</strong> ${safe(h.phone)}
                </p>`;
        });
    }

    // Emergency - Fire
    const fireStation = getSafe(area, 'emergency.fireStation') || getSafe(area, 'emergency.fireStations') || [];
    let fireStationInfo;
    
    if (Array.isArray(fireStation)) {
        fireStationInfo = fireStation[0] || {};
    } else {
        fireStationInfo = fireStation;
    }
    
    document.getElementById('fire-name').textContent = safe(fireStationInfo.name);
    document.getElementById('fire-phone').textContent = safe(fireStationInfo.phone);
    document.getElementById('fire-email').textContent = safe(fireStationInfo.email);

    // Emergency - Police
    document.getElementById('police-name').textContent = safe(getSafe(area, 'emergency.police.name'));
    document.getElementById('police-address').textContent = safe(getSafe(area, 'emergency.police.address'));
    document.getElementById('police-phone').textContent = safe(getSafe(area, 'emergency.police.phone') || getSafe(area, 'emergency.police.emergency'));
    document.getElementById('police-sho-name').textContent = safe(getSafe(area, 'emergency.police.sho.name'));
    document.getElementById('police-sho-mobile').textContent = safe(getSafe(area, 'emergency.police.sho.mobile') || getSafe(area, 'emergency.police.sho.phone'));
    document.getElementById('police-sho-cug').textContent = safe(getSafe(area, 'emergency.police.sho.cugNumber'));

    // Transport - Buses
    const busContainer = document.getElementById('bus-list');
    busContainer.innerHTML = "";
    const buses = getSafe(area, 'transportation.bus') || getSafe(area, 'transport.buses') || [];
    if (buses.length === 0) {
        busContainer.innerHTML = `<p>No bus information available</p>`;
    } else {
        buses.forEach(bus => {
            busContainer.innerHTML += `
                <p>
                    <strong>Route:</strong> ${safe(bus.route)}<br>
                    <strong>Start:</strong> ${safe(bus.start)}<br>
                    <strong>End:</strong> ${safe(bus.end)}
                </p>`;
        });
    }

    // Transport - Metro
    const metroContainer = document.getElementById('metro-list');
    metroContainer.innerHTML = "";
    const metro = getSafe(area, 'transportation.metro') || getSafe(area, 'transport.metro') || [];
    if (metro.length === 0) {
        metroContainer.innerHTML = `<p>No metro information available</p>`;
    } else {
        metro.forEach(m => {
            metroContainer.innerHTML += `
                <p>
                    <strong>Line:</strong> ${safe(m.line)}<br>
                    <strong>Station:</strong> ${safe(m.station)}
                </p>`;
        });
    }

    // Transport - Railway
    const railwayContainer = document.getElementById('railway-list');
    railwayContainer.innerHTML = "";
    const railways = getSafe(area, 'transportation.railway') || getSafe(area, 'transport.railway') || [];
    if (railways.length === 0) {
        railwayContainer.innerHTML = `<p>No railway information available</p>`;
    } else {
        railways.forEach(r => {
            railwayContainer.innerHTML += `
                <p>
                    <strong>Station:</strong> ${safe(r.station)}<br>
                    <strong>Code:</strong> ${safe(r.code)}<br>
                    <strong>Address:</strong> ${safe(r.address)}
                </p>`;
        });
    }

    // Education - Schools
    const schoolContainer = document.getElementById('school-list');
    schoolContainer.innerHTML = "";
    const schools = getSafe(area, 'education.schools') || getSafe(area, 'education') || [];
    if (!schools || schools.length === 0) {
        schoolContainer.innerHTML = `<p>No school information available</p>`;
    } else {
        const schoolList = Array.isArray(schools) ? schools : [schools];
        schoolList.forEach(school => {
            if (school && typeof school === 'object') {
                schoolContainer.innerHTML += `
                    <p>
                        <strong>Name:</strong> ${safe(school.name)}<br>
                        <strong>Address:</strong> ${safe(school.address)}<br>
                        <strong>Phone:</strong> ${safe(school.phone)}
                    </p>`;
            }
        });
    }

    // Education - Libraries
    const libraryContainer = document.getElementById('library-list');
    libraryContainer.innerHTML = "";
    const libraries = getSafe(area, 'education.libraries') || 
                    getSafe(area, 'publicFacilities.libraries') || [];
    if (libraries.length === 0) {
        libraryContainer.innerHTML = `<p>No library information available</p>`;
    } else {
        libraries.forEach(lib => {
            libraryContainer.innerHTML += `
                <p>
                    <strong>Name:</strong> ${safe(lib.name)}<br>
                    <strong>Address:</strong> ${safe(lib.address)}<br>
                    <strong>Hours:</strong> ${safe(lib.hours)}<br>
                    <strong>Features:</strong> ${safe(lib.features)}
                </p>`;
        });
    }

    // Community Centers
    const commContainer = document.getElementById('community-list');
    commContainer.innerHTML = '';
    const halls = getSafe(area, 'community.halls') || 
                 getSafe(area, 'publicFacilities.communityCenters') || [];
    if (halls.length === 0) {
        commContainer.innerHTML = `<p>No community hall information available</p>`;
    } else {
        halls.forEach(comm => {
            commContainer.innerHTML += `
                <p>
                    <strong>Name:</strong> ${safe(comm.name)}<br>
                    <strong>Address:</strong> ${safe(comm.address)}<br>
                    <strong>Phone:</strong> ${safe(comm.phone)}<br>
                    <strong>Website:</strong> ${safe(comm.website)}
                </p>`;
        });
    }

    // Land Records
    const landContainer = document.getElementById('land-records');
    landContainer.innerHTML = "";
    const registrars = getSafe(area, 'propertyRecords.registrarOffices') || 
                      getSafe(area, 'publicFacilities.landRecords') || [];
    
    if (Array.isArray(registrars) && registrars.length === 0) {
        landContainer.innerHTML = `<p>No land record information available</p>`;
    } else {
        // Handle both array and single object cases
        const offices = Array.isArray(registrars) ? registrars : [registrars];
        offices.forEach(office => {
            if (office && typeof office === 'object') {
                const services = office.services && Array.isArray(office.services) ? 
                                office.services.join(", ") : "N/A";
                landContainer.innerHTML += `
                    <p>
                        <strong>Name:</strong> ${safe(office.name)}<br>
                        <strong>Address:</strong> ${safe(office.address)}<br>
                        <strong>Phone:</strong> ${safe(office.phone)}<br>
                        ${office.services ? `<strong>Services:</strong> ${services}` : ''}
                    </p>`;
            }
        });
    }
}

// Call the fetchAreaInfo function when on result page
if (window.location.pathname.includes('result.html')) {
    document.addEventListener('DOMContentLoaded', fetchAreaInfo);
}

// Function for the back button
function goBack() {
    window.history.back();
}

// NEW CODE: Utility Service Buttons Functionality
const utilityButtons = document.querySelectorAll('.utility-button');
if (utilityButtons) {
    utilityButtons.forEach(button => {
        button.addEventListener('click', function () {
            const serviceType = this.getAttribute('data-service');
            const pincodeInput = document.getElementById('pincode');
            const pincode = pincodeInput ? pincodeInput.value.trim() : '';

            if (!pincode || !/^[0-9]{6}$/.test(pincode)) {
                alert('Please enter a valid 6-digit pincode first');
                return;
            }

            // Redirect to new utility result page
            window.location.href = `utility-result.html?pincode=${pincode}&service=${serviceType}`;
        });
    });
}

// Helpers for backend usage
window.validateAreaData = function (data) {
    try {
        if (!data.pincode || !data.name) {
            return { valid: false, error: 'Missing required fields: pincode or area name' };
        }
        return { valid: true };
    } catch (error) {
        console.error('Validation error:', error);
        return { valid: false, error: error.message };
    }
};

window.getEmptyAreaData = function () {
    return {
        pincode: '', name: '',
        mla: { name: '', party: '', phone: '', office: '', constituency: '', contact: '' },
        mp: { name: '', party: '', phone: '', office: '', constituency: '', address: '' },
        utilities: {
            electricity: { name: '', helpline: '', address: '', provider: '', office: { address: '', helpline: '' }, website: '' },
            water: { name: '', helpline: '', address: '', department: '', phone: '', officials: [], website: '' },
            gas: [],
            waste: { department: '', helpline: '', address: '', email: '', website: '' }
        },
        transportation: { bus: [], metro: [], railway: [] },
        transport: { provider: '', controlRoom: { phone: '', email: '' }, todiDepot: { phone: '', email: '' }, website: '' },
        emergency: {
            hospitals: [], fireStations: [],
            police: { name: '', address: '', phone: '', emergency: '', sho: { name: '', mobile: '', cugNumber: '' } }
        },
        education: [],
        publicFacilities: {
            libraries: [], communityCenters: [],
            landRecords: { name: '', address: '', phone: '' }
        }
    };
};