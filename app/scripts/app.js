'use strict';


var app = angular
  .module('webApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
]);

/* The factory creates the various models for the application */
app.factory('Model', function() {
    
  var cardsTemplate = [
    {values: [2,3,4,5,6,7,8,9,10,11], sign: 'clubs', priority: 4}, 
    {values: [2,3,4,5,6,7,8,9,10,11], sign: 'spades', priority: 3},
    {values: [2,3,4,5,6,7,8,9,10,11], sign: 'hearts', priority: 2},
    {values: [2,3,4,5,6,7,8,9,10,11], sign: 'diamonds', priority: 1}
  ];

  var _getCards = function() {
  // Creates and initialize an Array of all cards based on the following structure
    var newCardsDeck = []; 
    for(var i=0; i<=cardsTemplate.length-1;i++){
      for(var j=0; j<=cardsTemplate[i].values.length-1;j++){
        newCardsDeck.push( {sign: cardsTemplate[i].sign, value: cardsTemplate[i].values[j], priority: cardsTemplate[i].priority} ); 
      }
    }
    return newCardsDeck;
  };


  return {    
    getCards: function() { return _getCards() },
  }

});



app.factory('Cards', function() {

  var _shuffle = function(cardsArr) {
    var j, x, i;
    for (i = cardsArr.length-1; i>=0; i--) {
        j = Math.floor(Math.random() * i);
        x = cardsArr[i];
        cardsArr[i] = cardsArr[j];
        cardsArr[j] = x;
    }
    return cardsArr;
  }; 

  var _draw = function(cardsArr,cardsNumber) {
    if (cardsNumber == 0) { return { cardsDeck: cardsArr, myCards: [] };
    }else if(cardsArr.length < cardsNumber){ return { cardsDeck: [], myCards: cardsArr };
    }else{
      var myCards = [];
      for (var i = 0; i <= cardsNumber-1; i++) {
          var j = Math.floor(Math.random() * cardsArr.length)+1;
          myCards.push(cardsArr.splice(j-1, 1)[0]); 
      }
      return {
        cardsDeck: cardsArr,
        myCards: myCards
      };
    }
  }; 

  var _sort = function(cardsArr) {
    //Sorted cards are sorted by suit: Clubs, Spades, Hearts, Diamonds; then by value: Ace is high.
    if( cardsArr.length > 1 ){
      return cardsArr.sort(_orderByProperty('priority', 'value'));
    }else{
      return cardsArr;
    }
  }; 

  var _orderByProperty = function(prop) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function (a, b) {
      var equality = b[prop] - a[prop];
      if (equality === 0 && arguments.length > 1) {
        return _orderByProperty.apply(null, args)(a, b);
      }
      return equality;
    };
  }; 

  return {    
    shuffle: function(cardsArr) { return _shuffle(cardsArr) },
    draw: function(cardsArr,cardsNumber) { return _draw(cardsArr,cardsNumber) },
    sort: function(cardsArr) { return _sort(cardsArr) }
  };

});

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/cards', {
      controller: 'cardCtrl',
      templateUrl: 'views/cards.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});


