// Üzenetek figyelése.
onmessage = function( message ) {
    
    for( var i = 0; i < 100000000000; i++) {
      if ( i%1000000 === 0 ) console.log( "Izzadsz?" );
    }    
    
    console.log( message.data );
    postMessage( "Ezt kaptam: "+message.data );
};