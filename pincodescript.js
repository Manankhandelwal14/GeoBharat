if (!localStorage.getItem("pincodeData")) {
    let pincodeData = {
        "110001": "🏙️ Connaught Place,Phone no: 9460300829",
        "400001": "🌆 Fort, Mumbai",
        "560001": "🏢 MG Road, Bangalore",
        "600001": "🏠 Parrys Corner, Chennai"
    };

    localStorage.removeItem("pincodeData");
    
    localStorage.setItem("pincodeData", JSON.stringify(pincodeData));
}
function getPincodeResult() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const pincode = urlParams.get("pincode");
    let outputDiv = document.getElementById("output");

    
    let storedData = JSON.parse(localStorage.getItem("pincodeData"));

    
    if (storedData[pincode]) {
        outputDiv.innerHTML = `<strong> Location:</strong> ${storedData[pincode]}`;
        outputDiv.classList.remove("error");
    } else {
        outputDiv.innerHTML = "❌ Pincode not found.";
        outputDiv.classList.add("error");
    }
}

function goBack() {
    window.location.href = "index.html"; 
}

getPincodeResult();