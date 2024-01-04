function initMap() {
    
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.7749, lng: -122.4194 }, // Replace with your desired coordinates
      zoom: 12, // Adjust the zoom level
    });

    console.log(map)

    var marker = new google.maps.Marker({
      position: { lat: 37.7749, lng: -122.4194 }, 
      map: map,
      title: 'Hello World!', 
    });
    console.log(marker)
  }