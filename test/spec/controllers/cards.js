'use strict';

describe('Controller: cardCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var cardCtrl, scope, timerCallback;
  var Model;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, Model, _$q_) {
    timerCallback = jasmine.createSpy('timerCallback');
    
    jasmine.Clock.useMock();
    scope = $rootScope.$new();
    Model = Model;
    cardCtrl = $controller('cardCtrl', {
      $scope: scope,
      Model: Model
    });
  }));

  it('should be showed a Welcome massage', function () {
    expect(scope.msg).toEqual('Welcome in Cards Page');
  });

  it('When ctrl is loaded, Cards Deck should be greater than 0', function () {
    expect( scope.allCards.length ).toBeGreaterThan(0);
  });

  it('When ctrl is loaded, Cards Deck should be less than 41', function () {
    expect( scope.allCards.length ).toBeLessThan(41);
  });

  it('When ctrl is loaded, Cards Deck array position "0" property "sign" should be egual to "clubs" and property "value" should be egual to "2"', function () {
    var sign = 'clubs';
    var value = 2;
    expect( scope.allCards[0]['sign'] ).toBe(sign);
    expect(scope.allCards[0].value).toBe(value);
  });

  it('When ctrl is loaded, Cards Deck array position "10" property "sign" should be egual to "spades" and property "value" should be egual to "2"', function () {
    var sign = 'spades';
    var value = 2;
    expect(scope.allCards[10].sign).toBe(sign);
    expect(scope.allCards[10].value).toBe(value);
  });

  it('After Draw function with param egual to "5" is called, myCards.length should be egual to "5"', function () {
    scope.drawCardsNumber = 5;
    scope.draw();
    expect( scope.myCards.length ).toBe(5);
  });

  it('After Draw function is called, Drawn cards should be removed from the original deck', function () {
    scope.drawCardsNumber = 5;
    scope.draw();
    expect(scope.allCards.length).toBe(35);
    expect(scope.allCards).not.toContain(scope.myCards[0]);
    expect(scope.allCards).not.toContain(scope.myCards[1]);
    expect(scope.allCards).not.toContain(scope.myCards[2]);
    expect(scope.allCards).not.toContain(scope.myCards[3]);
    expect(scope.allCards).not.toContain(scope.myCards[4]);
  });
      
  it('After Shuffle cards, Cards Deck array position "0" property "value" should be not egual to "2" and property "sign" should be not egual to "clubs"', function () {
    var obj = scope.allCards[0];
    scope.shuffle();
    expect( scope.allCards[0] ).not.toEqual(obj);
  });

  it('After Shuffle cards, Cards Deck array position "10" property "value" should be not egual to "2" and property "sign" should be not egual to "spades"', function () {
    var obj = scope.allCards[10];
    scope.shuffle();
    expect( scope.allCards[10] ).not.toEqual(obj);
  });

  it('Sorted cards are sorted by suit: Clubs, Spades, Hearts, Diamonds; then by value: Ace is high', function () {

    var sort = function(cardsArr) {
      //Sorted cards are sorted by suit: Clubs, Spades, Hearts, Diamonds; then by value: Ace is high.
      if( cardsArr.length > 1 ){
        return cardsArr.sort(orderByProperty('priority', 'value'));
      }else{
        return cardsArr;
      }
    }; 

    var orderByProperty = function(prop) {
      var args = Array.prototype.slice.call(arguments, 1);
      return function (a, b) {
        var equality = b[prop] - a[prop];
        if (equality === 0 && arguments.length > 1) {
          return orderByProperty.apply(null, args)(a, b);
        }
        return equality;
      };
    }; 

    scope.drawCardsNumber = 5;
    scope.draw();
    var objSorted = sort(scope.myCards);
    scope.sort();

    for(var i=0; i<=scope.myCards.length-1; i++){
      expect( scope.myCards[i] ).toEqual(objSorted[i]);
    }
    
  });

});
