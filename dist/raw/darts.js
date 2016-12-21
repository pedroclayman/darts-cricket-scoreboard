'use strict';

angular.module('dartsScoreboardApp', []);
'use strict';

function gameController($scope, scoreCard) {
    $scope.scoreCard = scoreCard;
}

angular.module('dartsScoreboardApp').directive('game', [function gameDirective() {
    return {
        restict: 'A',
        controller: ['$scope', 'scoreCard', gameController]
    };
}]);
'use strict';

angular.module("dartsScoreboardApp").controller('ScoreCellCtrl', ['$scope', function ($scope) {

    $scope.toggleScoreboard = function (toggle) {
        $scope.toggleScoreboard = toggle;
    };
}]).directive('scoreCell', ["$parse", 'scoreCard', function ($parse, scoreCard) {

    function link(scope, element, attrs) {
        scope.cellClicked = function (playerIdx, num) {
            var player = scoreCard.players[playerIdx];
            scope.scoreCard.hit(player, num);
        };
    }

    return {
        restrict: "A",
        link: link,
        scope: true
    };
}]);
'use strict';

function scoreRowController($scope) {}

angular.module('dartsScoreboardApp').directive('scoreRow', [function scoreRowDirective() {
    return {
        restrict: 'A',
        template: '<div class="row">\n                                <div class="col-xs-4 tbl-cell" ng-class="{ \'strike-1\' : scoreCard.players[0].score[num] === 1, \'strike-2\' : scoreCard.players[0].score[num] === 2, \'strike-3\' : scoreCard.players[0].score[num] >= 3 }" score-cell ng-click="cellClicked(0, num)"></div>\n                                <div class="col-xs-4 tbl-cell">{{num}}</div>\n                                <div class="col-xs-4 tbl-cell" ng-class="{ \'strike-1\' : scoreCard.players[1].score[num] === 1, \'strike-2\' : scoreCard.players[1].score[num] === 2, \'strike-3\' : scoreCard.players[1].score[num] >= 3 }" score-cell ng-click="cellClicked(1, num)"></div>\n                            </div>',
        controller: ['$scope', scoreRowController]

    };
}]);
"use strict";

var _redux = require("redux");

var _redux2 = _interopRequireDefault(_redux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_redux2.default);

var ScoreCard = function ScoreCard() {
    this.players = [new Player("p1"), new Player("p2")];

    this.hit = function (player, num) {
        player.hit(num);

        var opponent = this.players.filter(function (item) {
            return item !== player;
        })[0];

        if (player.score[num] > 3 && (opponent.score[num] == null || opponent.score[num] < 3)) {
            player.points += num;
        }
    };
};
ScoreCard.prototype.numbers = [20, 19, 18];

var Player = function Player(name) {
    this.name = name;
    this.score = [];
    this.points = 0;

    this.hit = function (num) {
        this.score[num] = this.score[num] + 1 || 1;
    };
};

angular.module('dartsScoreboardApp').service('scoreCard', [ScoreCard]);