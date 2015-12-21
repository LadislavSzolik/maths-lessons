
/// <reference path="./typings/angularjs/angular.d.ts" />

var homeModule = angular.module('homeModule', []);

homeModule.controller('homeCtrl', ['$scope', 'allTexts', 'mainMenuData', function ($scope:any, allTexts:any, mainMenuData :any) {
    $scope.allTexts = allTexts;
    $scope.mainMenuData = mainMenuData;

    $scope.menuColStyle = [""];

}]);
