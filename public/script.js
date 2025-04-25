document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const toggleButton = document.getElementById('nav-toggle');
    const navlinks = document.getElementById('nav-links');
    if (toggleButton && navlinks) {
        toggleButton.addEventListener('click', () => {
            navlinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for internal links
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

                if (navlinks && navlinks.classList.contains('active')) {
                    navlinks.classList.remove('active');
                }
            }
        });
    });

    // Redirect to result page with pincode
    function redirectToResultPage() {
        const pincode = document.getElementById('pincode')?.value.trim();
        const pincodeRegex = /^\d{6}$/;

        if (pincode && pincodeRegex.test(pincode)) {
            window.location.href = `result.html?pincode=${pincode}`;
        } else {
            alert('Please enter a valid 6-digit pincode');
        }
    }

    // Search events
    const pincodeInput = document.getElementById('pincode');
    if (pincodeInput) {
        pincodeInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                redirectToResultPage();
            }
        });
    }

    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', redirectToResultPage);
    }

    // Geolocation with Nominatim
    const geoButton = document.getElementById('get-location');
    if (geoButton) {
        const locationIcon = geoButton.querySelector('.fa-location-dot');
        const loadingSpinner = document.getElementById('location-loading');

        geoButton.addEventListener('click', async function () {
            if (!navigator.geolocation) {
                alert('Geolocation is not supported by this browser.');
                return;
            }

            try {
                locationIcon.style.display = 'none';
                loadingSpinner.style.display = 'inline-block';

                const position = await new Promise((resolve, reject) =>
                    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 })
                );

                const { latitude, longitude } = position.coords;
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
                );

                const data = await response.json();
                const pincode = data.address?.postcode;

                if (pincode) {
                    document.getElementById('pincode').value = pincode;
                    alert(`Your detected pincode is: ${pincode}\n\nAddress: ${data.display_name}`);
                } else {
                    throw new Error('Pincode not found for this location');
                }
            } catch (error) {
                console.error('Geolocation error:', error);
                alert(`Could not determine pincode automatically. Please enter manually.\n\nError: ${error.message}`);
            } finally {
                locationIcon.style.display = 'inline-block';
                loadingSpinner.style.display = 'none';
            }
        });
    }

    // Validate area schema
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

    // Return empty area data schema
    window.getEmptyAreaData = function () {
        return {
            pincode: '',
            name: '',
            mla: { name: '', party: '', phone: '', office: '' },
            mp: { name: '', phone: '', office: '' },
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
});

// Section for result.html page
if (window.location.pathname.includes('result.html')) {
    document.addEventListener('DOMContentLoaded', async () => {
        const output = document.getElementById('output');
        const params = new URLSearchParams(window.location.search);
        const pincode = params.get('pincode');

        if (!output) return;

        if (!pincode) {
            output.innerHTML = '<p style="color:red;">No pincode specified.</p>';
            return;
        }

        try {
            const response = await fetch(`/api/area/${pincode}`);
            if (!response.ok) throw new Error('Area not found');

            const data = await response.json();

            output.innerHTML = `
                <h2>${data.name} (${data.pincode})</h2>
                <section>
                    <h3>MLA</h3>
                    <p><strong>Name:</strong> ${data.mla?.name || 'N/A'}</p>
                    <p><strong>Party:</strong> ${data.mla?.party || 'N/A'}</p>
                    <p><strong>Phone:</strong> ${data.mla?.phone || 'N/A'}</p>
                    <p><strong>Office:</strong> ${data.mla?.office || 'N/A'}</p>
                </section>
                <section>
                    <h3>MP</h3>
                    <p><strong>Name:</strong> ${data.mp?.name || 'N/A'}</p>
                    <p><strong>Phone:</strong> ${data.mp?.phone || 'N/A'}</p>
                    <p><strong>Office:</strong> ${data.mp?.office || 'N/A'}</p>
                </section>
                <section>
                    <h3>Utilities</h3>
                    <p><strong>Electricity:</strong> ${data.utilities?.electricity?.name || 'N/A'} - ${data.utilities?.electricity?.helpline || 'N/A'}</p>
                    <p><strong>Water:</strong> ${data.utilities?.water?.name || 'N/A'} - ${data.utilities?.water?.helpline || 'N/A'}</p>
                </section>
                <section>
                    <h3>Emergency</h3>
                    <p><strong>Hospital:</strong> ${data.emergency?.hospitals?.[0]?.name || 'N/A'}</p>
                    <p><strong>Police:</strong> ${data.emergency?.police?.phone || 'N/A'}</p>
                </section>
            `;
        } catch (err) {
            output.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
        }
    });

    // Back button support
    window.goBack = function () {
        window.location.href = '/';
    };
}
