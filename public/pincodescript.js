document.addEventListener('DOMContentLoaded', function() {
    // Parse URL parameters to get pincode
    const urlParams = new URLSearchParams(window.location.search);
    const pincode = urlParams.get('pincode');
    const outputDiv = document.getElementById('output');
    
    if (!pincode) {
        outputDiv.innerHTML = '<p class="error">No pincode provided</p>';
        return;
    }
    
    // Show loading message
    outputDiv.innerHTML = '<p>Loading information for pincode ' + pincode + '...</p>';
    
    // Fetch area information based on pincode
    fetch(`/api/area/${pincode}`)
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                outputDiv.innerHTML = `<p class="error">${data.message}</p>`;
                return;
            }
            
            // Display area information
            const area = data.data;
            let html = `
                <div class="area-details">
                    <h3>${area.name} (${area.pincode})</h3>
                    
                    <div class="section">
                        <h4>Government Representatives</h4>
                        <div class="subsection">
                            <p><strong>MLA:</strong> ${area.mla.name || 'N/A'}</p>
                            <p><strong>Party:</strong> ${area.mla.party || 'N/A'}</p>
                            <p><strong>Contact:</strong> ${area.mla.phone || 'N/A'}</p>
                            <p><strong>Office:</strong> ${area.mla.office || 'N/A'}</p>
                        </div>
                        <div class="subsection">
                            <p><strong>MP:</strong> ${area.mp.name || 'N/A'}</p>
                            <p><strong>Contact:</strong> ${area.mp.phone || 'N/A'}</p>
                            <p><strong>Office:</strong> ${area.mp.office || 'N/A'}</p>
                        </div>
                    </div>
                    
                    <div class="section">
                        <h4>Emergency Services</h4>
                        <div class="subsection">
                            <p><strong>Police:</strong> ${area.emergency.police.phone || 'N/A'} (Emergency: ${area.emergency.police.emergency || '112'})</p>
                            <p><strong>Address:</strong> ${area.emergency.police.address || 'N/A'}</p>
                        </div>
                        ${renderList(area.emergency.hospitals, 'Hospitals')}
                        ${renderList(area.emergency.fireStations, 'Fire Stations')}
                    </div>
                    
                    <div class="section">
                        <h4>Utilities</h4>
                        <div class="subsection">
                            <h5>Electricity</h5>
                            <p><strong>Provider:</strong> ${area.utilities.electricity.name || 'N/A'}</p>
                            <p><strong>Helpline:</strong> ${area.utilities.electricity.helpline || 'N/A'}</p>
                            <p><strong>Address:</strong> ${area.utilities.electricity.address || 'N/A'}</p>
                        </div>
                        <div class="subsection">
                            <h5>Water</h5>
                            <p><strong>Provider:</strong> ${area.utilities.water.name || 'N/A'}</p>
                            <p><strong>Helpline:</strong> ${area.utilities.water.helpline || 'N/A'}</p>
                            <p><strong>Address:</strong> ${area.utilities.water.address || 'N/A'}</p>
                        </div>
                        ${renderList(area.utilities.gas, 'Gas Suppliers')}
                        <div class="subsection">
                            <h5>Waste Management</h5>
                            <p><strong>Department:</strong> ${area.utilities.waste.department || 'N/A'}</p>
                            <p><strong>Helpline:</strong> ${area.utilities.waste.helpline || 'N/A'}</p>
                            <p><strong>Address:</strong> ${area.utilities.waste.address || 'N/A'}</p>
                        </div>
                    </div>
                    
                    <div class="section">
                        <h4>Transportation</h4>
                        ${renderList(area.transportation.bus, 'Bus Services')}
                        ${renderList(area.transportation.metro, 'Metro Services')}
                        ${renderList(area.transportation.railway, 'Railway Services')}
                    </div>
                    
                    <div class="section">
                        <h4>Education</h4>
                        ${renderList(area.education, 'Educational Institutions')}
                    </div>
                    
                    <div class="section">
                        <h4>Public Facilities</h4>
                        ${renderList(area.publicFacilities.libraries, 'Libraries')}
                        ${renderList(area.publicFacilities.communityCenters, 'Community Centers')}
                        <div class="subsection">
                            <h5>Land Records</h5>
                            <p><strong>Office:</strong> ${area.publicFacilities.landRecords.name || 'N/A'}</p>
                            <p><strong>Address:</strong> ${area.publicFacilities.landRecords.address || 'N/A'}</p>
                            <p><strong>Contact:</strong> ${area.publicFacilities.landRecords.phone || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            `;
            
            outputDiv.innerHTML = html;
        })
        .catch(error => {
            console.error('Error:', error);
            outputDiv.innerHTML = '<p class="error">Error fetching data. Please try again later.</p>';
        });
});

// Helper function to render lists of items
function renderList(items, title) {
    if (!items || items.length === 0) {
        return '';
    }
    
    let html = `<div class="subsection"><h5>${title}</h5>`;
    
    items.forEach((item, index) => {
        html += `<div class="list-item">`;
        if (item.name) html += `<p><strong>${item.name}</strong></p>`;
        if (item.address) html += `<p>Address: ${item.address}</p>`;
        if (item.phone || item.contact) html += `<p>Contact: ${item.phone || item.contact || 'N/A'}</p>`;
        if (item.services) html += `<p>Services: ${item.services}</p>`;
        if (item.details) html += `<p>${item.details}</p>`;
        if (item.timings) html += `<p>Timings: ${item.timings}</p>`;
        if (item.facilities) html += `<p>Facilities: ${item.facilities}</p>`;
        html += `</div>`;
        
        // Add separator between items except for the last one
        if (index < items.length - 1) {
            html += `<hr class="item-separator">`;
        }
    });
    
    html += `</div>`;
    return html;
}

// Function to go back to home page
function goBack() {
    window.location.href = '/';
}