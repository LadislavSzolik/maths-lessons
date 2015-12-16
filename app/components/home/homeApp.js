var homeModule = angular.module('homeModule', []);

homeModule.controller('homeCtrl', ['$scope', 'allTexts', 'mainMenuData', function ($scope, allTexts, mainMenuData) {
    $scope.allTexts = allTexts;
    $scope.mainMenuData = mainMenuData;

    $scope.menuColStyle = [""];

}]);
