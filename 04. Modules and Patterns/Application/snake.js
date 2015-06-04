(function (game) {
    var game = game || {};

    game.snake = (function () {

        var headX = 5;
        var headY = 6;

        function Destination() {
            return {
                x: headX,
                y: headY,
            }
        }

        return {
            destination: Destination
        }

    }());
}(window))