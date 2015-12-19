var mathApp = angular.module('mathApp', ['ngMdIcons', 'ui.bootstrap', 'ngRoute', 'mathServices', 'homeModule', 'mathExercises'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/components/home/homeView.html',
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
        templateUrl: 'app/components/exercises/exercise1View.html',
        controller: 'exerciseMainCtrl',
        resolve: {
          'countExerciseServiceData': function(exerciseService) {
            return exerciseService.dataLoadPromise;
          },
          allTexts: ['textService', function(textService) {
            return textService.getAllTexts();
          }],
        }
      }).when('/N1b', {
        templateUrl: 'app/components/exercises/exercise2View.html',
        controller: 'exerciseMainCtrl',
        resolve: {
          'countExerciseServiceData': function(exerciseService) {
            return exerciseService.dataLoadPromise;
          },
          allTexts: ['textService', function(textService) {
            return textService.getAllTexts();
          }],
        }
      }).when('/N1c', {
        templateUrl: 'app/components/exercises/exercise3View.html',
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




mathApp.run(["$templateCache", function($templateCache) {
  $templateCache.put("template/navigation/close.html",
    "<div class=\"pull-right close-btn\"> \n" +
    "    <a ng-click=\"exit()\" class=\"nav-btn\" href>\n" +
    "        <ng-md-icon icon=\"close\" style=\"fill:white\" size=\"36\">\n" +
    "    </a>\n" +
    "</div>\n" +
    "");

  $templateCache.put("template/navigation/reload.html",
    "<a href ng-click=\"reload()\" class=\"nav-btn\">\n" +
    "    <ng-md-icon icon=\"refresh\" style=\"fill:white\" size=\"36\">\n" +
    "</a>\n" +
    "");

  $templateCache.put("template/navigation/nav_before.html",
    "<a href class=\"nav-btn side-vertical-center\" ng-class=\"{disabled:noPrevious()}\" ng-click=\"selectPage(currentPage-1,$event)\">\n" +
    "  <ng-md-icon icon=\"navigate_before\" style=\"fill:white\" size=\"48\">\n" +
    "<\/a>" +
    "");
  $templateCache.put("template/navigation/nav_next.html",
    "<a href class=\"nav-btn side-vertical-center\" ng-class=\"{disabled:noNext()}\" ng-click=\"selectPage(currentPage+1,$event)\">\n" +
    "  <ng-md-icon icon=\"navigate_next\" style=\"fill:white\" size=\"48\">\n " +
    "<\/a>");

  $templateCache.put("template/navigation/check_result.html",
    "<a href ng-click=\"checkResult()\" class=\"nav-btn\" ng-class=\"{disabled:isSummaryActive}\">\n"+
    "<ng-md-icon icon=\"done_all\" style=\"fill:white\" size=\"48\">\n"+
    "<\/a>"+
    "");
}]);
