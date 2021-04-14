function Snake() {
    // 初始化身体
    this.body = [
        { 'row': 3, 'col': 5 },
        { 'row': 3, 'col': 4 },
        { 'row': 3, 'col': 3 },
        { 'row': 3, 'col': 2 }
    ];
    this.direction = 'R';
    // 蛇将要前进的方向
    this.willDirection = 'R';
}

// 渲染蛇的样式
Snake.prototype.render = function () {
    // 蛇头的渲染
    game.setColor(this.body[0].row, this.body[0].col, 'red');
    // 蛇身的渲染
    for (var i = 1; i < this.body.length; i++) {
        game.setColor(this.body[i].row, this.body[i].col, 'skyblue');
    }
}

// 蛇的运动
Snake.prototype.update = function () {
    this.direction = this.willDirection;
    // 控制方向（增加头部）
    switch (this.direction) {
        // 左
        case 'L':
            this.body.unshift({ 'row': this.body[0].row, 'col': this.body[0].col - 1 });
            break;
        // 上
        case 'U':
            this.body.unshift({ 'row': this.body[0].row - 1, 'col': this.body[0].col });
            break;
        // 右
        case 'R':
            this.body.unshift({ 'row': this.body[0].row, 'col': this.body[0].col + 1 });
            break;
        // 下
        case 'D':
            this.body.unshift({ 'row': this.body[0].row + 1, 'col': this.body[0].col });
            break;
    };
    // 死亡的判定1-超出了边缘
    if (this.body[0].row > game.row - 1 || this.body[0].col > game.col - 1 || this.body[0].row < 0 || this.body[0].col < 0) {
        alert('游戏结束！您的得分为 ' + game.score);
        this.body.shift();
        clearInterval(timer);
    }
    // 死亡的判定2-撞到了自己
    for (var i = 1; i < this.body.length; i++) {
        if (this.body[0].row == this.body[i].row && this.body[0].col == this.body[i].col) {
            alert('游戏结束！您的得分为 ' + game.score);
            this.body.shift();
            clearInterval(timer);
        }
    }
    // 吃到食物长度增加（此时不删除尾部，就达到了长度增加的效果）
    if (this.body[0].row == game.food.row && this.body[0].col == game.food.col) {
        // 创建新的食物
        game.food = new Food(game);
        game.score++;
        document.getElementById('score').innerHTML = 'Score: ' + game.score;
    }
    else {
        // 没吃到食物就删除尾部，长度不变
        this.body.pop();
    }

}

// 防止蛇渲染时出现掉头的情况
Snake.prototype.changeDirection = function (d) {
    this.willDirection = d;
}