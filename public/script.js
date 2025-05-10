// script.js
// Navigation toggle functionality
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            if (history.replaceState) {
                history.replaceState(null, null, targetId);
            } else {
                window.location.hash = targetId;
            }

            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Pincode search functionality
document.addEventListener('DOMContentLoaded', function() {
    const pincodeInput = document.getElementById('pincode');
    const searchIcon = document.querySelector('.search-icon');
    const getLocationBtn = document.getElementById('get-location');
    const locationLoading = document.getElementById('location-loading');
    
    // Function to handle search with validation
    function handleSearch() {
        const pincode = pincodeInput?.value.trim();
        const pincodeRegex = /^\d{6}$/;

        if (pincode && pincodeRegex.test(pincode)) {
            // Redirect to result page with pincode parameter
            window.location.href = `result.html?pincode=${pincode}`;
        } else {
            alert('Please enter a valid 6-digit pincode');
        }
    }
    
    // Search when the search icon is clicked
    if (searchIcon) {
        searchIcon.addEventListener('click', handleSearch);
    }
    
    // Search when Enter key is pressed
    if (pincodeInput) {
        pincodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
// Get location button functionality
if (getLocationBtn) {
    const locationIcon = getLocationBtn.querySelector('.fa-location-dot');
   const GOOGLE_API_KEY = "AIzaSyDPSf_xBWfBKPkyk9ah-BlVQyjzUEBf4Mk"; // Replace with your real API key

getLocationBtn.addEventListener('click', function () {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
    }

    if (locationIcon) locationIcon.style.display = 'none';
    if (locationLoading) locationLoading.style.display = 'inline-block';
    getLocationBtn.classList.add('loading');

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Lat: ${latitude}, Lon: ${longitude}`);

        try {
            // Step 1: Google API to get full address
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
            const googleRes = await fetch(geocodeUrl);
            const googleData = await googleRes.json();

            let address = "Not available";
            if (googleData.status === "OK" && googleData.results.length) {
                address = googleData.results[0].formatted_address || "Not available";
            }

            // Step 2: Use India-specific postalpincode.in API to get correct PIN
            const pincodeUrl = `https://api.postalpincode.in/pincode/${latitude},${longitude}`;
            const coordsToPincodeUrl = `https://api.postalpincode.in/postoffice/${latitude},${longitude}`; // fallback if needed

            // This API actually doesn't take lat/lon — so we fallback to Google's result
            const indianPincode = googleData.results
                .flatMap(r => r.address_components)
                .find(c => c.types.includes("postal_code"))?.long_name || "";

            if (indianPincode.match(/^\d{6}$/)) {
                if (pincodeInput) pincodeInput.value = indianPincode;
                alert(`✅ Pincode: ${indianPincode}\n📍 Address: ${address}`);
            } else {
                const manual = prompt(`We couldn't detect the exact pincode.\n\nAddress found: ${address}\n\nPlease enter your 6-digit pincode manually:`);
                if (manual && /^\d{6}$/.test(manual)) {
                    pincodeInput.value = manual;
                }
            }
        } catch (error) {
            console.error("Location error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            if (locationIcon) locationIcon.style.display = 'inline-block';
            if (locationLoading) locationLoading.style.display = 'none';
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

    // Helper functions for area data validation
    window.validateAreaData = function(data) {
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

    window.getEmptyAreaData = function() {
        return {
            pincode: '',
            name: '',
            mla: { name: '', party: '', phone: '', office: '' },
            mp: { name: '', party: '', phone: '', office: '' },
            utilities: {
                electricity: { name: '', helpline: '', address: '', website: '' },
                water: { name: '', helpline: '', address: '' },
                gas: [],
                waste: { department: '', helpline: '', address: '', email: '', website: '' }
            },
            transportation: { bus: [], metro: [], railway: [] },
            emergency: {
                hospitals: [],
                fireStations: [],
                police: { address: '', phone: '', emergency: '' }
            },
            education: [],
            publicFacilities: {
                libraries: [],
                communityCenters: [],
                landRecords: { name: '', address: '', phone: '' }
            }
        };
    };
    
    // NEW CODE: Utility Service Buttons Functionality
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
});

// Function to get URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
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
        const response = await fetch(`http://localhost:5001/api/area/pincode/${pincode}`);
        
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

// Function to display error message
function showError(message) {
    document.getElementById('loading').style.display = 'none';
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Function to display area information
function displayAreaInfo(area) {
    document.getElementById('loading').style.display = 'none';
    
    const areaDetailsElement = document.getElementById('area-details');
    areaDetailsElement.style.display = 'block';
    
    document.querySelector('.area-title').textContent = `${area.name} (${area.pincode})`;
    
    // Create the HTML content for area details
    let html = `
        <div class="area-section">
            <h2>Local Representatives</h2>
            <div class="card">
                <h3>MLA</h3>
                <p><strong>Name:</strong> ${area.mla?.name || 'N/A'}</p>
                <p><strong>Party:</strong> ${area.mla?.party || 'N/A'}</p>
                <p><strong>Phone:</strong> ${area.mla?.phone || 'N/A'}</p>
                <p><strong>Office:</strong> ${area.mla?.office || 'N/A'}</p>
            </div>
            
            <div class="card">
                <h3>MP</h3>
                <p><strong>Name:</strong> ${area.mp?.name || 'N/A'}</p>
                <p><strong>Party:</strong> ${area.mp?.party || 'N/A'}</p>
                <p><strong>Phone:</strong> ${area.mp?.phone || 'N/A'}</p>
                <p><strong>Office:</strong> ${area.mp?.office || 'N/A'}</p>
            </div>
        </div>
        
        <div class="area-section">
            <h2>Utilities</h2>
            
            <div class="card">
                <h3>Electricity</h3>
                <p><strong>Name:</strong> ${area.utilities?.electricity?.name || 'N/A'}</p>
                <p><strong>Helpline:</strong> ${area.utilities?.electricity?.helpline || 'N/A'}</p>
                <p><strong>Address:</strong> ${area.utilities?.electricity?.address || 'N/A'}</p>
                ${area.utilities?.electricity?.website ? `<p><strong>Website:</strong> <a href="${area.utilities.electricity.website}" target="_blank">${area.utilities.electricity.website}</a></p>` : ''}
            </div>
            
            <div class="card">
                <h3>Water</h3>
                <p><strong>Name:</strong> ${area.utilities?.water?.name || 'N/A'}</p>
                <p><strong>Helpline:</strong> ${area.utilities?.water?.helpline || 'N/A'}</p>
                <p><strong>Address:</strong> ${area.utilities?.water?.address || 'N/A'}</p>
            </div>
            
            <h3>Gas Agencies</h3>
            <div class="cards-container">
                ${area.utilities?.gas?.map(gas => `
                    <div class="card">
                        <p><strong>Name:</strong> ${gas.name || 'N/A'}</p>
                        <p><strong>Address:</strong> ${gas.address || 'N/A'}</p>
                        <p><strong>Phone:</strong> ${gas.phone || 'N/A'}</p>
                    </div>
                `).join('') || '<p>No gas agencies available</p>'}
            </div>
            
            <div class="card">
                <h3>Waste Management</h3>
                <p><strong>Department:</strong> ${area.utilities?.waste?.department || 'N/A'}</p>
                <p><strong>Helpline:</strong> ${area.utilities?.waste?.helpline || 'N/A'}</p>
                <p><strong>Address:</strong> ${area.utilities?.waste?.address || 'N/A'}</p>
                <p><strong>Email:</strong> ${area.utilities?.waste?.email || 'N/A'}</p>
                ${area.utilities?.waste?.website ? `<p><strong>Website:</strong> <a href="${area.utilities.waste.website}" target="_blank">${area.utilities.waste.website}</a></p>` : ''}
            </div>
        </div>
        
        <div class="area-section">
            <h2>Emergency Services</h2>
            
            <h3>Hospitals</h3>
            <div class="cards-container">
                ${area.emergency?.hospitals?.map(hospital => `
                    <div class="card">
                        <p><strong>Name:</strong> ${hospital.name || 'N/A'}</p>
                        <p><strong>Address:</strong> ${hospital.address || 'N/A'}</p>
                        <p><strong>Phone:</strong> ${hospital.phone || 'N/A'}</p>
                    </div>
                `).join('') || '<p>No hospital information available</p>'}
            </div>
            
            <h3>Fire Stations</h3>
            <div class="cards-container">
                ${area.emergency?.fireStations?.map(station => `
                    <div class="card">
                        <p><strong>Name:</strong> ${station.name || 'N/A'}</p>
                        <p><strong>Address:</strong> ${station.address || 'N/A'}</p>
                        <p><strong>Phone:</strong> ${station.phone || 'N/A'}</p>
                    </div>
                `).join('') || '<p>No fire station information available</p>'}
            </div>
            
            <div class="card">
                <h3>Police</h3>
                <p><strong>Address:</strong> ${area.emergency?.police?.address || 'N/A'}</p>
                <p><strong>Phone:</strong> ${area.emergency?.police?.phone || 'N/A'}</p>
                <p><strong>Emergency:</strong> ${area.emergency?.police?.emergency || 'N/A'}</p>
            </div>
        </div>
        
        <div class="area-section">
            <h2>Transportation</h2>
            
            <h3>Bus Services</h3>
            <div class="cards-container">
                ${area.transportation?.bus?.map(bus => `
                    <div class="card">
                        <p><strong>Name:</strong> ${bus.name || 'N/A'}</p>
                        <p><strong>Contact:</strong> ${bus.contact || 'N/A'}</p>
                        <p><strong>Address:</strong> ${bus.address || 'N/A'}</p>
                        <p><strong>Services:</strong> ${bus.services || 'N/A'}</p>
                    </div>
                `).join('') || '<p>No bus service information available</p>'}
            </div>
            
            <h3>Metro</h3>
            <div class="cards-container">
                ${area.transportation?.metro?.map(metro => `
                    <div class="card">
                        <p><strong>Name:</strong> ${metro.name || 'N/A'}</p>
                        <p><strong>Contact:</strong> ${metro.contact || 'N/A'}</p>
                    </div>
                `).join('') || '<p>No metro information available</p>'}
            </div>
            
            <h3>Railway</h3>
            <div class="cards-container">
                ${area.transportation?.railway?.map(railway => `
                    <div class="card">
                        <p><strong>Name:</strong> ${railway.name || 'N/A'}</p>
                        <p><strong>Contact:</strong> ${railway.contact || 'N/A'}</p>
                        <p><strong>Address:</strong> ${railway.address || 'N/A'}</p>
                        <p><strong>Services:</strong> ${railway.services || 'N/A'}</p>
                    </div>
                `).join('') || '<p>No railway information available</p>'}
            </div>
        </div>
        
        <div class="area-section">
            <h2>Education</h2>
            <div class="cards-container">
                ${area.education?.map(edu => `
                    <div class="card">
                        <p><strong>Name:</strong> ${edu.name || 'N/A'}</p>
                        <p><strong>Type:</strong> ${edu.type || 'N/A'}</p>
                        <p><strong>Address:</strong> ${edu.address || 'N/A'}</p>
                        <p><strong>Phone:</strong> ${edu.phone || 'N/A'}</p>
                        <p><strong>Details:</strong> ${edu.details || 'N/A'}</p>
                    </div>
                `).join('') || '<p>No education information available</p>'}
            </div>
        </div>
        
        <div class="area-section">
            <h2>Public Facilities</h2>
            
            <h3>Libraries</h3>
            <div class="cards-container">
                ${area.publicFacilities?.libraries?.map(lib => `
                    <div class="card">
                        <p><strong>Name:</strong> ${lib.name || 'N/A'}</p>
                        <p><strong>Address:</strong> ${lib.address || 'N/A'}</p>
                        <p><strong>Phone:</strong> ${lib.phone || 'N/A'}</p>
                        <p><strong>Timings:</strong> ${lib.timings || 'N/A'}</p>
                    </div>
                `).join('') || '<p>No library information available</p>'}
            </div>
            
            <h3>Community Centers</h3>
            <div class="cards-container">
                ${area.publicFacilities?.communityCenters?.map(center => `
                    <div class="card">
                        <p><strong>Name:</strong> ${center.name || 'N/A'}</p>
                        <p><strong>Address:</strong> ${center.address || 'N/A'}</p>
                        <p><strong>Phone:</strong> ${center.phone || 'N/A'}</p>
                        <p><strong>Facilities:</strong> ${center.facilities || 'N/A'}</p>
                    </div>
                `).join('') || '<p>No community center information available</p>'}
            </div>
            
            <div class="card">
                <h3>Land Records</h3>
                <p><strong>Name:</strong> ${area.publicFacilities?.landRecords?.name || 'N/A'}</p>
                <p><strong>Address:</strong> ${area.publicFacilities?.landRecords?.address || 'N/A'}</p>
                <p><strong>Phone:</strong> ${area.publicFacilities?.landRecords?.phone || 'N/A'}</p>
            </div>
        </div>
    `;
    
    areaDetailsElement.innerHTML = html;
}

// Call the fetchAreaInfo function when on result page
if (window.location.pathname.includes('result.html')) {
    document.addEventListener('DOMContentLoaded', fetchAreaInfo);
}

// Function for the back button
function goBack() {
    window.history.back();
}

