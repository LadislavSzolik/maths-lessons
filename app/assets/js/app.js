/*$.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
    $.mobile.changePage.defaults.changeHash = false; */

var mathApp = angular.module('mathApp', ['ngMdIcons', 'ngTouch','ui.bootstrap', 'ngRoute', 'mathServices', 'homeModule', 'mathExercises'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/components/homeView.html',
        controller: 'homeCtrl',
        resolve: {
          allTexts: ['textService', function(textService) {
            return textService.getAllTexts();
          }],
          mainMenuData: ['menuLoaderService', function(menuLoaderService) {
            return menuLoaderService.getMainMenuData();
          }]
        }
      }).when('/N1a', {
        templateUrl: 'app/components/exerciseView.html',
        controller: 'exercise1Controller',
        exetype: 'N1a',
        resolve: {
          'countExerciseServiceData': function(exercise1Service) {
            return exercise1Service.dataLoadPromise;
          },
          allTexts: ['textService', function(textService) {
            return textService.getAllTexts();
          }]

        }
      }).when('/N1b', {
        templateUrl: 'app/components/exerciseView.html',
        controller: 'exerciseMainCtrl',
        exetype: 'N1b',
        resolve: {
          'countExerciseServiceData': function(exercise2Service) {
            return exercise2Service.dataLoadPromise;
          },
          allTexts: ['textService', function(textService) {
            return textService.getAllTexts();
          }],
        }
      }).when('/N1c', {
        templateUrl: 'app/components/exerciseView.html',
        controller: 'exerciseMainCtrl',
        resolve: {
          'exe3ServiceData': function(exerciseService) {
            return exerciseService.exe3DataPromise;
          },
          allTexts: ['textService', function(textService) {
            return textService.getAllTexts();
          }],
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
