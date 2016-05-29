'use strict';

angular.module('webApp')
  .controller('cardCtrl', ['$scope', '$routeParams', 'Model', 'Cards',
    function($scope,$routeParams, Model, Cards) {
      $scope.msg = 'Welcome in Cards Page';

      $scope.myCards = [];
      
      $scope.isShowedCardsDeck = false;
      $scope.areShowedMyCards = false;
      $scope.allCards = Model.getCards();
      $scope.drawCardsNumber = 0;
      $scope.draw = function(){
        $scope.myCards.length = 0;
        $scope.isShowedCardsDeck = false;
        $scope.areShowedMyCards = false;
        var objResult = Cards.draw($scope.allCards,$scope.drawCardsNumber);
        $scope.myCards = objResult.myCards;
        $scope.allCards = objResult.cardsDeck;
      }
      $scope.shuffle = function(){
        $scope.allCards = Cards.shuffle($scope.allCards);
      }
      $scope.sort = function(){
        $scope.myCards = Cards.sort($scope.myCards);
      }
}]);
