describe('mathServices', function () {
    var $httpBackend, $rootScope;

    beforeEach(module('mathServices'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');

    }));

    describe('textService call', function () {
        $httpBackend.expectGet('../assets/data/appTexts.json');
        $httpBackend.flush();
    });

});
