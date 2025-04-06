const toggleButton = document.getElementById('nav-toggle');
const navlinks = document.getElementById('nav-links')
toggleButton.addEventListener('click',()=>{
    navlinks.classList.toggle('active');
})


function redirectToResultPage() {
    let pincode = document.getElementById('pincode').value.trim();
    if (pincode) {
        window.location.href = `result.html?pincode=${pincode}`; // Redirect with pincode
    }
}

// Listen for "Enter" key press to redirect
document.getElementById("pincode").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        redirectToResultPage();
    }
});