var mathServices = angular.module('mathServices', []);

mathServices.factory('textService', ['$http', function ($http) {

    return {
        getAllTexts: function () {
            return $http.get('app/assets/data/appTexts.json').then(function (result) {
                return result.data;
            });
        }
    };
}]);

mathServices.factory('menuLoaderService', ['$http', function ($http) {
    return {
        getMainMenuData: function () {
            return $http.get('app/assets/data/menuData.json').then(function (result) {
                return result.data;
            });
        }
    };
}]);
