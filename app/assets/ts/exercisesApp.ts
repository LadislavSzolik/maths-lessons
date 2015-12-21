/// <reference path="./typings/angularjs/angular.d.ts" />
/// <reference path="./typings/jquery/jquery.d.ts" />
/// <reference path="./typings/jqueryui/jqueryui.d.ts" />

var mathExercises = angular.module('mathExercises', ['exeModule']);

var exeModule = angular.module('exeModule', []);

exeModule.controller('exercise1Controller', ['$scope', '$location', '$route', '$rootScope', 'allTexts', 'exercise1Service', function($scope:any, $location:any, $route:any, $rootScope:any, allTexts: any, exercise1Service:any){
  exercise1Service.reset();

  $scope.allTexts = allTexts;
  $scope.currentPage = 1;
  $scope.isSummaryActive = false;
  $scope.exetype = $route.current.exetype;

  var setProgressBarData = function() {
    $scope.countExerciseData = exercise1Service.getAllElements();
    $scope.totalItems = $scope.countExerciseData.length;
    $scope.onePercentage = 100 / $scope.totalItems;
  }

  setProgressBarData();


  $scope.isCurrentExercise = function(index: number) {
    return $scope.currentPage == (index + 1);
  }

  $scope.exit = function() {
    $location.path('/');
  }

  $scope.reload = function() {
    $route.reload();
  }

  $scope.checkResult = function() {
    if (!$scope.isSummaryActive) {
      $scope.currentPage = 1;
      exercise1Service.addSummary();
      setProgressBarData();
      $scope.isSummaryActive = true;
    }
  }

  $scope.getResultColor = function(index: number) {
    if ($scope.isSummaryActive && angular.isDefined(index)) {
      if (exercise1Service.isCorrectByIndex(index)) {
        return 'valid-result'
      } else {
        return 'invalid-result';
      }
    }
  }

  // Pager
  $scope.selectPage = function(page:number) {
    if (page > 0 && page <= $scope.totalItems) {
      $scope.currentPage = page;
    }
  };
  $scope.noPrevious = function() {
    return $scope.currentPage === 1;
  };

  $scope.noNext = function() {
    return $scope.currentPage === $scope.totalItems;
  };

}]);


exeModule.controller('exercise2Controller', ['$scope', '$location', '$route', '$rootScope', 'allTexts', 'exercise2Service', function($scope :any, $location:any , $route:any, $rootScope:any, allTexts:any, exercise2Service:any){
  exercise2Service.reset();

  $scope.allTexts = allTexts;
  $scope.currentPage = 1;
  $scope.isSummaryActive = false;
  $scope.exetype = $route.current.exetype;

  var setProgressBarData = function() {
    $scope.countExerciseData = exercise2Service.getAllElements();
    $scope.totalItems = $scope.countExerciseData.length;
    $scope.onePercentage = 100 / $scope.totalItems;
  }

  setProgressBarData();


  $scope.isCurrentExercise = function(index:number) {
    return $scope.currentPage == (index + 1);
  }

  $scope.exit = function() {
    $location.path('/');
  }

  $scope.reload = function() {
    $route.reload();
  }

  $scope.checkResult = function() {
    if (!$scope.isSummaryActive) {
      $scope.currentPage = 1;
      exercise2Service.addSummary();
      setProgressBarData();
      $scope.isSummaryActive = true;
    }
  }

  $scope.getResultColor = function(index:number) {
    if ($scope.isSummaryActive && angular.isDefined(index)) {
      if (exercise2Service.isCorrectByIndex(index)) {
        return 'valid-result'
      } else {
        return 'invalid-result';
      }
    }
  }

  // Pager
  $scope.selectPage = function(page:number) {
    if (page > 0 && page <= $scope.totalItems) {
      $scope.currentPage = page;
    }
  };
  $scope.noPrevious = function() {
    return $scope.currentPage === 1;
  };

  $scope.noNext = function() {
    return $scope.currentPage === $scope.totalItems;
  };

}]);




exeModule.controller('exe1SubCtrl', ['$scope', 'exercise1Service', function($scope: any, exercise1Service:any) {
  var self = this;
  var index = $scope.$parent.$index;

  exercise1Service.setCurrentSubExercise(index);
  self.imgUrl = "app/assets/img/pink-flower.png";

  if (angular.isUndefined(exercise1Service.getGridPoint())) {
    exercise1Service.setGridPoints(exercise1Service.calculateGridPoints(exercise1Service.getExpectedResult(index), 330));
  }

  self.positionArray = exercise1Service.getPositions();
  if (angular.isUndefined(self.positionArray) || self.positionArray.length == 0) {
    self.positionArray = exercise1Service.addPositionsToElement(index, 330);
    exercise1Service.savePositions(self.positionArray);
  }

  self.elementSize = exercise1Service.getElementSizeForFrameSize(330);
  self.userInput = exercise1Service.getActualResult(index);

  self.changeInput = function() {
    if (!$scope.isSummaryActive) {
      exercise1Service.setActualResult(self.userInput);
    }

  };

  self.backspace = function() {
    if (!$scope.isSummaryActive) {
      self.userInput = self.userInput.substring(0, self.userInput.length - 1);
      self.changeInput();

    }
  }

  self.setUserInput = function(newVal:number) {
    if (angular.isUndefined(self.userInput) || self.userInput == null) {
      self.userInput = String(newVal);
    } else
    if (String(self.userInput).length < 2) {
      self.userInput = self.userInput + String(newVal);
    }
    self.changeInput();
  }

  // TODO: move the colors to CSS and create functions see: noNext()
  self.getNumberStyle = function(index:number) {
    if (index == 0 || index == 4 || index == 8) {
      return {
        background: "#FFB651",
        border: "2px solid #E48400"
      };
    } else if (index == 1 || index == 5 || index == 9) {
      return {
        background: "#3E7AD0",
        border: "2px solid #0053CA"
      };
    } else if (index == 2 || index == 6) {
      return {
        background: "#FF7746",
        border: "2px solid #FF4400"
      };
    } else {
      return {
        background: "#00B47D",
        border: "2px solid #016F4D"
      };
    }
  }

}]);

exeModule.controller('exe1SubCtrlSummary', ['$scope', 'exercise1Service', function($scope: any, exercise1Service:any) {
  var self = this;
  var index = $scope.$parent.$index;
  exercise1Service.setCurrentSubExercise(index);
  self.imgUrl = "app/assets/img/pink-flower.png";

  if (angular.isUndefined(exercise1Service.getGridPoint())) {
    exercise1Service.setGridPoints(exercise1Service.calculateGridPoints(exercise1Service.getExpectedResult(index), 80));

  }
  self.positionArray = exercise1Service.addPositionsToElement(index, 80);

  self.elementSize = exercise1Service.getElementSizeForFrameSize(80);
  self.userInput = exercise1Service.getActualResult(index);
}]);

exeModule.controller('exe2SubCtrl', ['$scope', '$rootScope', 'exercise2Service', function($scope: any, $rootScope:any, exercise2Service:any) {
  var self = this;
  var index = $scope.$parent.$index;
  self.imgUrl = "app/assets/img/pink-flower.png";
  exercise2Service.setCurrentSubExercise(index);

  self.positionArray = exercise2Service.getPositions();
  if (angular.isUndefined(self.positionArray) || self.positionArray.length == 0) {
    exercise2Service.setGridPoints(exercise2Service.calculateGridPoints(25, 330));
    self.positionArray = exercise2Service.addPositionsToElement(index, 330);
    exercise2Service.savePositions(self.positionArray);
  }
  self.elementSize = exercise2Service.getElementSizeForFrameSize(330);

  var droppedObjects:string[] = [];

  self.changeInput = function() {
    if (!$scope.isSummaryActive) {
      var userInput = droppedObjects.length
      exercise2Service.setActualResult(userInput);
      exercise2Service.savePositions(self.positionArray);
    }

  };

  self.isAdded = function(pos:any) {
    if (angular.isDefined(pos.isDisplayed) && pos.isDisplayed) {
      return true;
    } else {
      return false;
    }
  }

  self.addObject = function() {
    if (!$scope.isSummaryActive) {
      for (var i = 0; i < self.positionArray.length; i++) {
        if (angular.isDefined(self.positionArray[i]) && !self.positionArray[i].isDisplayed) {
          self.positionArray[i].isDisplayed = true;
          self.changeInput();
          return;
        }
      }
    }
  }

  self.addObject();


  $rootScope.$on('dropped', function(event:any, args:any) {
    droppedObjects.push(args.objectId);
    self.addObject();
    $rootScope.$digest();
  });


  var hidingObjects = function(objectId:string, localCall:boolean):void {

    for (var j = 0; j < droppedObjects.length; j++) {
      if(droppedObjects[j] == objectId){
          droppedObjects.splice(j,1);
      }
    }

    for (var i = 0; i < self.positionArray.length; i++) {
      if (self.positionArray[i].id == objectId) {
        self.positionArray[i].isDisplayed = false;
        self.changeInput();

        if(angular.isUndefined(localCall) || localCall == false) {
          console.log('hiding object digest call');
          $rootScope.$digest();
        }
        return;
      }
    }
  }

  $rootScope.$on('hideObject', function(event:any, args:any) {
    hidingObjects(args.objectId, false);
  });

  self.hide = function(pos:any) {
    pos.isDisplayed = false;
    self.changeInput();
  }

  self.removeOne = function() {

    if (droppedObjects.length > 0) {
      var objectId = droppedObjects[droppedObjects.length-1];
      $("#"+objectId).css({
        top: "230px",
        left: "-200px",
        height: "120px"
      });
      console.log('remove one: '+objectId);
      $rootScope.$emit('hide.with.rubber', {objectId: objectId});
      hidingObjects(objectId, true);

    }
  }

}]);

exeModule.controller('exe2SubCtrlSummary', ['$scope', 'exercise2Service', function($scope: any, exercise2Service:any) {
  var self = this;
  var index = $scope.$parent.$index;
  self.imgUrl = "app/assets/img/pink-flower.png";
  exercise2Service.setCurrentSubExercise(index);


  if (angular.isUndefined(exercise2Service.getGridPoint())) {
    exercise2Service.setGridPoints(exercise2Service.calculateGridPoints(25, 80));

  }
  self.positionArray = exercise2Service.addPositionsToElement(index, 80);

  self.positionArrayWithDisplayFlag = exercise2Service.getPositions();
  if (angular.isDefined(self.positionArrayWithDisplayFlag)) {
    for (var i = 0; i < self.positionArrayWithDisplayFlag.length; i++) {
      if (self.positionArrayWithDisplayFlag[i].isDisplayed) {
        self.positionArray[i].isDisplayed = true;
      }
    }
  }


  self.elementSize = exercise2Service.getElementSizeForFrameSize(80);

  self.isAdded = function(pos:any) {
    if (angular.isDefined(pos.isDisplayed) && pos.isDisplayed) {
      return true;
    } else {
      return false;
    }
  }
}]);

exeModule.service('exercise1Service',['$rootScope', '$http', function($rootScope:any, $http:any) {
  var elements:Array<any> = [];
  var current = 0;
  // store the greatest value from the incoming data
  var greatestNumber = 0;
  var isSummaryActive = false;

  var addPositionsToElement = function(index:number, frameSize:number) {
    var elementSize = getElementSizeForFrameSize(frameSize);
    var rowLimit = parseInt(frameSize / elementSize);
    var positionArray = [];
    for (var j = 0; j < elements[index].listOfPositions.length; j++) {
      elementPosition = elements[index].listOfPositions[j];
      var coorX = parseInt(elementSize * (elementPosition % rowLimit));
      var coorY = parseInt(elementSize * (parseInt(elementPosition / rowLimit)));
      positionArray.push({
        left: (coorX + 10) + 'px',
        top: (coorY + 10) + 'px',
        isDisplayed: false,
        targetPlace: {
          left: (coorX + 10) + 'px',
          top: (coorY + 10) + 'px'
        },
        initPlace: {
          top: '230px',
          left: '-200px',
          height: '120px',
          'z-index': '99'
        },
        id: "object-" + j,
        elementSize: elementSize
      });
    }
    return positionArray;
  }

  var getElementSizeForFrameSize = function(size) {
    var frameArea = size * size;
    var limitCorrection = findNextSqrt(greatestNumber);
    return Math.sqrt(parseInt(frameArea / limitCorrection));
  }

  var calculateGridPoints = function(value, frameSize) {
    var elementSize = getElementSizeForFrameSize(frameSize);
    var rowLimit = parseInt(frameSize / elementSize);
    var possiblePositions = getNumberArr(rowLimit * rowLimit, 1);

    var listOfPositionsInGrid = [];
    for (var i = 0; i < value; i++) {
      listOfPositionsInGrid.push((possiblePositions.splice(Math.floor(Math.random() * possiblePositions.length), 1))[0]);
    }
    return listOfPositionsInGrid;
  }

  var savePositions = function(positionArray) {
    elements[current].positionArray = positionArray;
  }

  var getPositions = function() {
    return elements[current].positionArray;
  }

  var getAllElements = function() {
    return elements
  }

  var setCurrentSubExercise = function(index) {
    current = index;
  }

  var getExpectedResult = function(index) {
    return elements[index].expectedResult;
  }

  var setExpectedResult = function(incomingResult) {
    return elements[current].expectedResult = incomingResult;
  }

  var getActualResult = function(index) {
    return elements[index].actualResult;
  }

  var setActualResult = function(incomingResult) {
    elements[current].actualResult = incomingResult;
    if (elements[current].expectedResult == elements[current].actualResult) {
      elements[current].isCorrect = true;
      elements[current].resultStyle = 'valid-result';
    } else {
      elements[current].isCorrect = false;
      elements[current].resultStyle = 'invalid-result';
    }
  }

  var isCorrectByIndex = function(index) {
    return elements[current].isCorrect;
  }

  var findTheGreatestNumber = function(incomingData) {
    for (i = 0; i < incomingData.length; i++) {
      greatestNumber = greatestNumber < parseInt(incomingData[i].number) ? parseInt(incomingData[i].number) : greatestNumber;
    }
  }

  var addElements = function(incomingData) {
    elements = [];
    findTheGreatestNumber(incomingData);
    for (i = 0; i < incomingData.length; i++) {
      var listOfPositions = calculateGridPoints(incomingData[i].number, 330);
      elements.push({
        expectedResult: incomingData[i].number,
        isCorrect: false,
        resultStyle: 'invalid-result'
      });
    }
  }

  var setGridPoints = function(newListOfPositions) {
    elements[current].listOfPositions = newListOfPositions;
  }

  var getGridPoint = function() {
    return elements[current].listOfPositions;
  }

  var addNumberRows = function(data) {
    elements = [];
    for (i = 0; i < data.length; i++) {
      elements.push({
        numberRow: data[i].numberRow,
        isCorrect: false
      });
    }
  }

  var dataLoadPromise = $http.get('app/assets/data/countExerciseData.json').success(function(data) {
    addElements(data.subexerciseListDTO);
  });




  var getCurrentPositionArray = function() {
    return elements[current].positionArray;
  }

  var reset = function() {
    if (isSummaryActive) {
      elements.shift();
    }
    for (var i = 0; i < elements.length; i++) {
      if (angular.isDefined(elements[i].actualResult)) {
        elements[i].actualResult = undefined;
        elements[i].isCorrect = false;
      }
      elements[i].positionArray = undefined;
      elements[i].listOfPositions = undefined;
      elements[i].resultStyle = 'invalid-result';
    }
    isSummaryActive = false;
  }

  var addSummary = function() {
    elements.unshift({
      expectedResult: 1
    });
    isSummaryActive = true;
  }

  return {
    reset: reset,
    addPositionsToElement: addPositionsToElement,
    getAllElements: getAllElements,
    dataLoadPromise: dataLoadPromise,
    setCurrentSubExercise: setCurrentSubExercise,
    getExpectedResult: getExpectedResult,
    getActualResult: getActualResult,
    setActualResult: setActualResult,
    getCurrentPositionArray: getCurrentPositionArray,
    getElementSizeForFrameSize: getElementSizeForFrameSize,
    addSummary: addSummary,
    isCorrectByIndex: isCorrectByIndex,
    isSummaryActive: isSummaryActive,
    calculateGridPoints: calculateGridPoints,
    setGridPoints: setGridPoints,
    getPositions: getPositions,
    savePositions: savePositions,
    getGridPoint: getGridPoint
  }
}]);

exeModule.service('exercise2Service', ['$rootScope', '$http', function($rootScope, $http) {
  var elements = [];
  var current = 0;
  // store the greatest value from the incoming data
  var greatestNumber = 0;
  var isSummaryActive = false;

  var addPositionsToElement = function(index, frameSize) {
    var elementSize = getElementSizeForFrameSize(frameSize);
    var rowLimit = parseInt(frameSize / elementSize);
    var positionArray = [];
    for (var j = 0; j < elements[index].listOfPositions.length; j++) {
      elementPosition = elements[index].listOfPositions[j];
      var coorX = parseInt(elementSize * (elementPosition % rowLimit));
      var coorY = parseInt(elementSize * (parseInt(elementPosition / rowLimit)));
      positionArray.push({
        left: (coorX + 10) + 'px',
        top: (coorY + 10) + 'px',
        isDisplayed: false,
        targetPlace: {
          left: (coorX + 10) + 'px',
          top: (coorY + 10) + 'px'
        },
        initPlace: {
          top: '230px',
          left: '-200px',
          height: '120px',
          'z-index': '99'
        },
        id: "object-" + j,
        elementSize: elementSize
      });
    }
    return positionArray;
  }

  var getElementSizeForFrameSize = function(size) {
    var frameArea = size * size;
    var limitCorrection = findNextSqrt(greatestNumber);
    return Math.sqrt(parseInt(frameArea / limitCorrection));
  }

  var calculateGridPoints = function(value, frameSize) {
    var elementSize = getElementSizeForFrameSize(frameSize);
    var rowLimit = parseInt(frameSize / elementSize);
    var possiblePositions = getNumberArr(rowLimit * rowLimit, 1);

    var listOfPositionsInGrid = [];
    for (var i = 0; i < value; i++) {
      listOfPositionsInGrid.push((possiblePositions.splice(Math.floor(Math.random() * possiblePositions.length), 1))[0]);
    }
    return listOfPositionsInGrid;
  }

  var savePositions = function(positionArray) {
    elements[current].positionArray = positionArray;
  }

  var getPositions = function() {
    return elements[current].positionArray;
  }

  var getAllElements = function() {
    return elements
  }

  var setCurrentSubExercise = function(index) {
    current = index;
  }

  var getExpectedResult = function(index) {
    return elements[index].expectedResult;
  }

  var setExpectedResult = function(incomingResult) {
    return elements[current].expectedResult = incomingResult;
  }

  var getActualResult = function(index) {
    return elements[index].actualResult;
  }

  var setActualResult = function(incomingResult) {
    elements[current].actualResult = incomingResult;
    if (elements[current].expectedResult == elements[current].actualResult) {
      elements[current].isCorrect = true;
      elements[current].resultStyle = 'valid-result';
    } else {
      elements[current].isCorrect = false;
      elements[current].resultStyle = 'invalid-result';
    }
  }

  var isCorrectByIndex = function(index: number) {
    return elements[current].isCorrect;
  }

  var findTheGreatestNumber = function(incomingData) {
    for (i = 0; i < incomingData.length; i++) {
      greatestNumber = greatestNumber < parseInt(incomingData[i].number) ? parseInt(incomingData[i].number) : greatestNumber;
    }
  }

  var addElements = function(incomingData) {
    elements = [];
    findTheGreatestNumber(incomingData);
    for (var i = 0; i < incomingData.length; i++) {
      var listOfPositions = calculateGridPoints(incomingData[i].number, 330);
      elements.push({
        expectedResult: incomingData[i].number,
        isCorrect: false,
        resultStyle: 'invalid-result'
      });
    }
  }

  var setGridPoints = function(newListOfPositions:Array<Object>) {
    elements[current].listOfPositions = newListOfPositions;
  }

  var getGridPoint = function() {
    return elements[current].listOfPositions;
  }

  var addNumberRows = function(data) {
    elements = [];
    for (var i = 0; i < data.length; i++) {
      elements.push({
        numberRow: data[i].numberRow,
        isCorrect: false
      });
    }
  }

  var dataLoadPromise = $http.get('app/assets/data/countExerciseData.json').success(function(data) {
    addElements(data.subexerciseListDTO);
  });




  var getCurrentPositionArray = function() {
    return elements[current].positionArray;
  }

  var reset = function() {
    if (isSummaryActive) {
      elements.shift();
    }
    for (var i = 0; i < elements.length; i++) {
      if (angular.isDefined(elements[i].actualResult)) {
        elements[i].actualResult = undefined;
        elements[i].isCorrect = false;
      }
      elements[i].positionArray = undefined;
      elements[i].listOfPositions = undefined;
      elements[i].resultStyle = 'invalid-result';
    }
    isSummaryActive = false;
  }

  var addSummary = function() {
    elements.unshift({
      expectedResult: 1
    });
    isSummaryActive = true;
  }

  return {
    reset: reset,
    addPositionsToElement: addPositionsToElement,
    getAllElements: getAllElements,
    dataLoadPromise: dataLoadPromise,
    setCurrentSubExercise: setCurrentSubExercise,
    getExpectedResult: getExpectedResult,
    getActualResult: getActualResult,
    setActualResult: setActualResult,
    getCurrentPositionArray: getCurrentPositionArray,
    getElementSizeForFrameSize: getElementSizeForFrameSize,
    addSummary: addSummary,
    isCorrectByIndex: isCorrectByIndex,
    isSummaryActive: isSummaryActive,
    calculateGridPoints: calculateGridPoints,
    setGridPoints: setGridPoints,
    getPositions: getPositions,
    savePositions: savePositions,
    getGridPoint: getGridPoint
  }
}]);


exeModule.directive('animateRubber', function() {
  return {
    link: link
  }

  function link(scope, element, attr) {
    $(element).on("click", function() {
      $(this).addClass('remove-btn-animate').delay(200).queue(function(next) {
        $(this).removeClass('remove-btn-animate');
        next();
      })
    });
  }
});

exeModule.directive('animateButton', function() {
  return {
    link: link
  }

  function link(scope, element, attr) {
    $(element).on("click", function() {
      $(this).addClass('nav-btn-animate').delay(200).queue(function(next) {
        $(this).removeClass('nav-btn-animate');
        next();
      })
    });
  }
});

exeModule.directive('draggableObject', ['$rootScope', function($rootScope) {
  return {
    link: link
  }

  function link(scope, element, attr) {
    var alreadyDropped = false;


    var hideObject = function() {
      $(element).css({
        top: "230px",
        left: "-200px",
        height: "120px"
      });
      $rootScope.$emit('hideObject', {
        objectId: attr.id
      });
    }


    $rootScope.$on('hide.with.rubber', function(event:any, args:any) {
      if(args.objectId == attr.id) {
        alreadyDropped = false;
      }
    });

    $(element).draggable({
      revert: "invalid",
      stop: function(event, ui) {
        if (ui.helper.data('dropped-target') == true && alreadyDropped != true) {
          $(this).animate({
            height: attr.originalHeight
          }, 200);

          $rootScope.$emit('dropped', {
            objectId: attr.id
          });
          alreadyDropped = true;
        } else if (ui.helper.data('dropped-origin') == true) {
          ui.helper.data('dropped-target', false);
          ui.helper.data('dropped-origin', false);
          alreadyDropped = false;
          hideObject();
        }
      }
    });

    $(element).on("click", function() {
      if (alreadyDropped == true) {
        hideObject();
        alreadyDropped = false;
      } else {
        $(this).animate({
          height: attr.originalHeight,
          top: attr.targetTop,
          left: attr.targetLeft
        }, 200);
        alreadyDropped = true;
        $rootScope.$emit('dropped', {
          objectId: attr.id
        });
      }
    });

  }

}]);

exeModule.directive('droppableObject', function() {
  return {
    link: link
  }

  function link(scope:any, element:any, attr:any) {
    $(element).droppable({
      drop: function(event, ui) {
        if (ui.draggable.data('dropped-target') != true) {
          ui.draggable.data('dropped-target', true);
          ui.draggable.data('already-dropped', false);
          ui.draggable.data('dropped-origin', false);
        }

      }
    });
  }

});

exeModule.directive('droppableOrigin', function() {
  return {
    link: link
  }

  function link(scope:any, element:any, attr:any) {
    $(element).droppable({
      drop: function(event, ui) {

        if (ui.draggable.data('dropped-target') == true && ui.draggable.data('dropped-origin') != true) {
          ui.draggable.data('dropped-origin', true);
          ui.draggable.data('dropped-target', false);
        }

      }
    });
  }

});

function findNextSqrt(x:number): number {
  if (Math.sqrt(x) % 1 > 0) {
    return findNextSqrt(x + 1);
  } else {
    return x;
  }
}


var getNumberArr = function(upperLimit:number, repeatCount:number) {
  var numberArr:Array<number> = [];
  var counter = 0;
  while (numberArr.length < (repeatCount * upperLimit)) {
    numberArr.push((counter++ % upperLimit));
  }
  return numberArr;
}
