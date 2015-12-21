var mathExercises = angular.module('mathExercises', ['exeModule']);

var exeModule = angular.module('exeModule', [])
exeModule.controller('exerciseMainCtrl', ['$scope', '$location', '$route', '$rootScope', 'allTexts', 'exerciseService', function($scope, $location, $route, $rootScope, allTexts, exerciseService) {

  exerciseService.reset();

  $scope.allTexts = allTexts;
  $scope.currentPage = 1;
  $scope.isSummaryActive = false;
  $scope.exetype = $route.current.exetype;

  var setProgressBarData = function() {
    $scope.countExerciseData = exerciseService.getAllElements();
    $scope.totalItems = $scope.countExerciseData.length;
    $scope.onePercentage = 100 / $scope.totalItems;
  }

  setProgressBarData();


  $scope.isCurrentExercise = function(index) {
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
      exerciseService.addSummary();
      setProgressBarData();
      $scope.isSummaryActive = true;
    }
  }

  $scope.getResultColor = function(index) {
    if ($scope.isSummaryActive && angular.isDefined(index)) {
      if (exerciseService.isCorrectByIndex(index)) {
        return 'valid-result'
      } else {
        return 'invalid-result';
      }
    }
  }

  // Pager
  $scope.selectPage = function(page) {
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

exeModule.controller('exe1Ctrl', ['$scope', 'exerciseService', function($scope, exerciseService) {
  var self = this;
  var index = $scope.$parent.$index;

  exerciseService.setCurrentSubExercise(index);
  self.imgUrl = "app/assets/img/pink-flower.png";

  if (angular.isUndefined(exerciseService.getGridPoint())) {
    exerciseService.setGridPoints(exerciseService.calculateGridPoints(exerciseService.getExpectedResult(index), 330));
  }

  self.positionArray = exerciseService.getPositions();
  if (angular.isUndefined(self.positionArray) || self.positionArray.length == 0) {
    self.positionArray = exerciseService.addPositionsToElement(index, 330);
    exerciseService.savePositions(self.positionArray);
  }

  self.elementSize = exerciseService.getElementSizeForFrameSize(330);
  self.userInput = exerciseService.getActualResult(index);

  self.changeInput = function() {
    if (!$scope.isSummaryActive) {
      exerciseService.setActualResult(self.userInput);
    }

  };

  self.backspace = function() {
    if (!$scope.isSummaryActive) {
      self.userInput = self.userInput.substring(0, self.userInput.length - 1);
      self.changeInput();

    }
  }

  self.setUserInput = function(newVal) {
    if (angular.isUndefined(self.userInput) || self.userInput == null) {
      self.userInput = String(newVal);
    } else
    if (String(self.userInput).length < 2) {
      self.userInput = self.userInput + String(newVal);
    }
    self.changeInput();
  }

  // TODO: move the colors to CSS and create functions see: noNext()
  self.getNumberStyle = function(index) {
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

exeModule.controller('exe1Summary', ['$scope', 'exerciseService', function($scope, exerciseService) {
  var self = this;
  var index = $scope.$parent.$index;
  exerciseService.setCurrentSubExercise(index);
  self.imgUrl = "app/assets/img/pink-flower.png";

  if (angular.isUndefined(exerciseService.getGridPoint())) {
    exerciseService.setGridPoints(exerciseService.calculateGridPoints(exerciseService.getExpectedResult(index), 80));

  }
  self.positionArray = exerciseService.addPositionsToElement(index, 80);

  self.elementSize = exerciseService.getElementSizeForFrameSize(80);
  self.userInput = exerciseService.getActualResult(index);
}]);

exeModule.controller('exe2Ctrl', ['$scope', '$rootScope', 'exerciseService', function($scope, $rootScope, exerciseService) {
  var self = this;
  var index = $scope.$parent.$index;
  self.imgUrl = "app/assets/img/pink-flower.png";
  exerciseService.setCurrentSubExercise(index);

  self.positionArray = exerciseService.getPositions();
  if (angular.isUndefined(self.positionArray) || self.positionArray.length == 0) {
    exerciseService.setGridPoints(exerciseService.calculateGridPoints(25, 330));
    self.positionArray = exerciseService.addPositionsToElement(index, 330);
    exerciseService.savePositions(self.positionArray);
  }
  self.elementSize = exerciseService.getElementSizeForFrameSize(330);

  self.changeInput = function() {
    if (!$scope.isSummaryActive) {
      var userInput = 0;
      for (var i = 0; i < self.positionArray.length; i++) {
        if (angular.isDefined(self.positionArray[i]) && self.positionArray[i].isDisplayed) {
          userInput++;
        }
      }
      exerciseService.setActualResult(userInput);
      exerciseService.savePositions(self.positionArray);
    }

  };

  self.isAdded = function(pos) {
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


  $rootScope.$on('dropped', function(){
    self.addObject();
    $rootScope.$digest();
  });

  self.hide = function(pos) {
    pos.isDisplayed = false;
    self.changeInput();
  }

  self.removeOne = function() {
    for (var i = 0; i < self.positionArray.length; i++) {
      if (angular.isDefined(self.positionArray[i]) && self.positionArray[i].isDisplayed) {
        self.positionArray[i].isDisplayed = false;
        self.changeInput();
        return;
      }
    }
  }

}]);

exeModule.controller('exe2Summary', ['$scope', 'exerciseService', function($scope, exerciseService) {
  var self = this;
  var index = $scope.$parent.$index;
  self.imgUrl = "app/assets/img/pink-flower.png";
  exerciseService.setCurrentSubExercise(index);


  if (angular.isUndefined(exerciseService.getGridPoint())) {
    exerciseService.setGridPoints(exerciseService.calculateGridPoints(25, 80));

  }
  self.positionArray = exerciseService.addPositionsToElement(index, 80);

  self.positionArrayWithDisplayFlag = exerciseService.getPositions();
  if (angular.isDefined(self.positionArrayWithDisplayFlag)) {
    for (var i = 0; i < self.positionArrayWithDisplayFlag.length; i++) {
      if (self.positionArrayWithDisplayFlag[i].isDisplayed) {
        self.positionArray[i].isDisplayed = true;
      }
    }
  }


  self.elementSize = exerciseService.getElementSizeForFrameSize(80);

  self.isAdded = function(pos) {
    if (angular.isDefined(pos.isDisplayed) && pos.isDisplayed) {
      return true;
    } else {
      return false;
    }
  }
}]);

exeModule.service('exerciseService', ['$rootScope', '$http', function($rootScope, $http) {
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
    for (i = 0; i < elements.length; i++) {
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

    var elementLeft = element.offset().left;
    var elementTop = element.offset().top;
    $(element).draggable({
      revert: "invalid",
      stop: function(event, ui) {
        if (ui.helper.data('dropped')) {
          $(this).animate({
            height: attr.originalHeight
          }, 200);

          $rootScope.$emit('dropped');

        }
      }
    });

    $(element).on("click", function() {

    })
  }

}]);

exeModule.directive('droppableObject', function() {
  return {
    link: link
  }

  function link(scope, element, attr) {
    $(element).droppable({
      drop: function(event, ui) {
        if (!ui.draggable.data('dropped')) {
          ui.draggable.data('dropped', true);
        }

      }
    });
  }

});

function findNextSqrt(x) {
  if (Math.sqrt(x) % 1 > 0) {
    return findNextSqrt(x + 1);
  } else {
    return x;
  }
}


var getNumberArr = function(upperLimit, repeatCount) {
  var numberArr = [];
  var counter = 0;
  while (numberArr.length < (repeatCount * upperLimit)) {
    numberArr.push((counter++ % upperLimit));
  }
  return numberArr;
}
