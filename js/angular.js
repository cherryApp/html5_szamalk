// Saját modul.
var app = angular.module( "app", ["currencyModule"] );

app.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["Content-Type"];
}

// Kontroller.
app.controller( "testCtrl",["$scope", "$http", "$q", function( $scope, $http, $q ) {
    
    $scope.szam = 22;
    
    $scope.calc = function() {
        return parseInt( $scope.szam * 1.27, 10 );
    };
    
    // Szam változó figyelése.
    $scope.$watch( "szam", function( n, o ) {
        console.log( n, o );
        /*if ( n > 100 ) {
            alert( "A szám nem lehet száznál nagyobb!");
            $scope.szam = 22;
        }*/
    });
    
    
}]);

// Tábla.
app.controller( "tableCtrl", ["$scope", "$http", function( $scope, $http ) {
    
    // Termékek lekérése.
    $http.get( "json/products.json" )
        .then( 
            function(response) {
                console.log( response.data );
                $scope.products = response.data;
            },
            function( error ) {
                console.log( error );
            }
        );
    
    // Products mentése.
    $scope.saveTable = function() {
        
        $http.post( "http://127.0.0.1:3333", $scope.products )
            .then( function(response) {
                console.log( "mentve" );
            });
        
        
    };
    
    window.$scope = $scope;
    
    
}]);
















