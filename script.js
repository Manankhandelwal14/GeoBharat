
    const toggleButton1 = document.getElementById('nav-toggle');
    const navlinks1 = document.getElementById('nav-links');
    toggleButton1.addEventListener('click',()=>{
        navlinks.classList.toggle('active');
    });

    function redirectToResultPage() {
        let pincode = document.getElementById('pincode').value.trim();
        if (pincode) {
            window.location.href = `result.html?pincode=${pincode}`;
        }
    }

    document.getElementById("pincode").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            redirectToResultPage();
        }
    });

    // Enhanced geolocation with pincode lookup
    const geoButton = document.getElementById('get-location');
    const locationIcon = geoButton.querySelector('.fa-location-dot');
    const loadingSpinner = document.getElementById('location-loading');
    
    geoButton.addEventListener('click', async function() {
        if (navigator.geolocation) {
            try {
                // Show loading spinner
                locationIcon.style.display = 'none';
                loadingSpinner.style.display = 'inline-block';
                
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
                });
                
                const { latitude, longitude } = position.coords;
                
                // Call Nominatim API to get address details
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
                );
                
                const data = await response.json();
                
                // Extract pincode (known as "postcode" in OSM)
                const pincode = data.address?.postcode;
                
                if (pincode) {
                    document.getElementById('pincode').value = pincode;
                    alert(`Your detected pincode is: ${pincode}\n\nAddress: ${data.display_name}`);
                } else {
                    throw new Error('Pincode not found for this location');
                }
                
            } catch (error) {
                console.error('Error:', error);
                alert(`Could not determine pincode automatically. Please enter manually.\n\nError: ${error.message}`);
            } finally {
                // Hide loading spinner
                locationIcon.style.display = 'inline-block';
                loadingSpinner.style.display = 'none';
            }
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });

    document.querySelector('.search-icon').addEventListener('click', function() {
        redirectToResultPage();
    });




// Replace your existing JavaScript with this enhanced version
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const toggleButton = document.getElementById('nav-toggle');
    const navlinks = document.getElementById('nav-links');
    toggleButton.addEventListener('click', () => {
        navlinks.classList.toggle('active');
    });

    // Enhanced navigation with history management
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without adding to history
                if (history.replaceState) {
                    history.replaceState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });

    // Search functionality
    function redirectToResultPage() {
        let pincode = document.getElementById('pincode').value.trim();
        if (pincode) {
            window.location.href = `result.html?pincode=${pincode}`;
        }
    }

    document.getElementById("pincode").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            redirectToResultPage();
        }
    });

    document.querySelector('.search-icon').addEventListener('click', redirectToResultPage);

});
