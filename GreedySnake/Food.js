function Food(gameSnake) {
    // 食物的位置
    // 不能和蛇重合
    var self = this;
    // 食物的位置和蛇重合就重新随机产生
    do {
        this.row = parseInt(Math.random() * gameSnake.row);
        this.col = parseInt(Math.random() * gameSnake.col);
    } while ((function () {
        for (var i = 0; i < gameSnake.snake.body.length; i++) {
            if (gameSnake.snake.body[i].row == self.row && gameSnake.snake.body[i].col == self.col) return true;
        }
        return false;
    })());

    Food.prototype.render = function () {
        game.setHTML(this.row, this.col, '🍒');
    }
}