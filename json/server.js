// 
var http = require( "http" ),
    fs = require( "fs" ),
    url = require( "url" );

// Válasz adása.
function writeResponse( req, res, content ) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-xsrf-token');
    res.end( content || "Hello, én vagyok a szerver" );
}

// Post kezelése.
function handlePost( req, res ) {
    
    var body = "";
    req.on( "data", function(data) {
       body += data; 
    });
    req.on( "end", function() {
        console.log( body );
        fs.writeFileSync('products.json', body);   
    });
    
    
    writeResponse( req, res );
    
}

function handleGet( req, res ) {
    
    // Url paraméterek.
    var urlParams = getQuery( req.url );
    
    // Fájl beolvasása.
    var jsonFile = fs.readFileSync('products.json', 'utf8');
    jsonFile = JSON.parse( jsonFile );
    
    var record = [];
    for ( var k in jsonFile ) {
        if( jsonFile[k].id == urlParams.id ) {
            record.push( jsonFile[k] );
        }
    }
    console.log( jsonFile );
    writeResponse( req, res, JSON.stringify(record) );
    
}

// Query paraméterek olvasása.
function getQuery( _url ) {
    return url.parse(_url, true).query;
}

var app = http.createServer( function( req, res ) {
    
    // Kérések kezelése.
    switch( req.method.toLowerCase() ) {
        case "post": handlePost( req, res );
            break;
        case "get": handleGet( req, res );
            break;
        default: 
            writeResponse( req, res );
    }
    
    // Válasz.
    
} ).listen( "3333" );

// Socket io. ----------------------------------------
var io = require('socket.io')(app);
io.on('connection', function (socket) {
    
    socket.on( "message_from_client", function(data) {
        console.log( "client: ", socket.id );
        console.log( "message: ", data );
        
        // Terített üzenet.
        var messageData = {
            "sender": socket.id,
            "message": data
        };
        
        // Terítjük az üzenetet.
        socket.broadcast.emit( "message_from_server", data );
        
        
    });
    
    
    
});









console.log( "Server run in 3333 port." );