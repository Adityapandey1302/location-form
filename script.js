function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                document.getElementById('latitude').value = position.coords.latitude;
                document.getElementById('longitude').value = position.coords.longitude;
                console.log("Location captured:", position.coords.latitude, position.coords.longitude);
            }, 
            function(error) {
                console.log("Error getting location:", error);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Get location when the page loads
window.onload = getLocation;

document.getElementById('skincareForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        gender: document.getElementById('gender').value,
        usedProducts: document.getElementById('usedProducts').value,
        preferredProducts: document.getElementById('preferredProducts').value,
        dailyProduct: document.getElementById('dailyProduct').value,
        additionalPoints: document.getElementById('additionalPoints').value,
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value
    };

    // Send the data to server
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(data => {
        showThankYouMessage();
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function showThankYouMessage() {
    const thankYouMessage = document.getElementById('thankYouMessage');
    thankYouMessage.classList.remove('hidden');

    const formContainer = document.querySelector('.form-container');
    formContainer.style.display = 'none';
}