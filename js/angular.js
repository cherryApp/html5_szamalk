// Saját modul.
var app = angular.module( "app", ["currencyModule"] );

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
app.controller( "tableCtrl", ["$scope", "$http", "productFactory",
    function( $scope, $http, productFactory ) {
    
    // Termékek lekérése.
    productFactory.getProducts()
        .then( function(products) {
            $scope.products = products;
        });
    
    // Products mentése.
    $scope.saveTable = function() {
        
        $http.post( "http://127.0.0.1:3333", $scope.products )
            .then( function(response) {
                console.log( "mentve" );
            });
        
        
    };
    
    window.$scope = $scope;
    
    
}]);

// Contact.
app.controller( "contactCtrl", ["$scope", "$http", "productFactory",
    function( $scope, $http, productFactory ) {
    
    // Termékek lekérése.
    productFactory.getProducts()
        .then( function(products) {
            $scope.productsNum = products.length;
        });    
    
}]);

app.controller( "pageCtrl", ["$scope", function( $scope ) {
    
    // Menü elérési útvonala.
    $scope.navPath = 'template/nav.html';
    
    // Ugrás az oldalra.
    $scope.jumpToPage = function( $event ) {
        $event.preventDefault();
        var href = $event.target.getAttribute("href");
        $scope.pagePath = "template/"+href+".html";
    };
    
    // Aktuális oldal.
    $scope.pagePath = "template/home.html";
    
}]);

app.factory( "productFactory", ["$http", "$q", function( $http, $q ) {
    return { 
        
        products: [],
        
        getProducts: function() {
            
            // Aszinkron folyamat indítása.
            var deferred = $q.defer();
            
            // Ha vannak már termékek, akkor azokat adjuk vissza.
            if ( this.products.length > 0 ) {
                console.log( "adatok a cache-ből" );
                deferred.resolve( this.products );
            } else {
                
                var self = this;
                $http.get( "json/products.json" )
                    .then( 
                        function(response) {
                            console.log( response.data );
                            self.products = response.data;
                            deferred.resolve( response.data );
                        },
                        function( error ) {
                            console.log( error );
                            deferred.reject( error );
                        }
                    );
                
            }
            
            return deferred.promise;            
            
        }  
    };
}]);
















