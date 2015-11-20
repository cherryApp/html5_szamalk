// Szöveges üzenetek.
var chatArea = document.querySelector( "#chat-area" );
var nickInput = document.querySelector( "#nick-input" );

// Socket kapcsolat felépítése.
var socket = io('http://localhost:3333');
    socket.on('message_from_server', function (data) {
        data = JSON.parse( data );
        
        var div = document.createElement( "div" );
        div.className = "message-row";
        div.innerHTML = "<b>"+data.nickname+":</b> "+data.message;
        chatArea.appendChild( div );   
    });

// Üzenet küldése.
var messageInput = document.querySelector( "#message-input" );
function sendMessage() {
    
    // Input tartalmát kimentjük egy változóba.
    var val = messageInput.value;
    messageInput.value = "";
    
    // Üzenet adatai.
    var messageData = {
        "nickname": nickInput.value,
        "message": val
    };
    
    // Üzenet küldése a szerverre.
    socket.emit( 'message_from_client', JSON.stringify(messageData) );
    
}

messageInput.addEventListener( "keyup", function(e) {
    if ( e.keyCode === 13 )
        sendMessage();
} );
document.querySelector( "#send-message" )
    .addEventListener( "click", sendMessage );

////////////////////////////////////// File reader ////////////////////////////
var fileInput = document.querySelector( "#file-input" );
fileInput.onchange = function() {
    
    // Tartalom beolvasása.
    var fr = new FileReader();
    fr.onload = function() {
        console.log( this );
        document.querySelector( "#preview" ).src = this.result;
    };
    fr.readAsDataURL( this.files[0] );
    
    
};

////////////////////////////////// Worker ////////////////////////////////////
var worker = new Worker( "js/worker.js" );
worker.onmessage = function( message ) {
    console.log( message.data );
};
// worker.postMessage( "Hello worker jól vagy?" );

/*
for( var i = 0; i < 100000000000; i++) {
  if ( i%1000000 === 0 ) console.log( "Izzadsz?" );
}
*/

//////////////////////////////////// Google Map /////////////////////////////
var map;
function initMap() {
    
    navigator.geolocation.getCurrentPosition( function(data) {
        console.log( data.coords.latitude, data.coords.longitude );
        
        var myLatLng = {
            lat: data.coords.latitude, 
            lng: data.coords.longitude
        };
        
        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 15
        });
        
        var markerSettings = {
            position: myLatLng,
            map: map,
            title: 'Itt vagyok!'
        };
        var marker = new google.maps.Marker(markerSettings);
        
    });
    
   /* 
  
  */
}



















