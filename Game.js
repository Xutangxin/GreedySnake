function Game() {
    // 设置行和列，初始化
    this.row = 22;
    this.col = 22;
    this.initWindow();
    this.snake = new Snake();
    this.food = new Food(this);
    this.score = 0;
    this.bindEvent();
    // 执行定时器任务
    this.start();
}

// 初始化窗口
Game.prototype.initWindow = function () {
    this.dom = document.createElement('table');
    // 创建表格
    for (let i = 0; i < this.row; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < this.col; j++) {
            const td = document.createElement('td');
            td.className = 'cell'
            tr.appendChild(td);
        }
        // 添加表格到dom中
        this.dom.appendChild(tr);
    }
    // 添加dom到主视图中
    document.getElementById('app').appendChild(this.dom);
}

// 渲染食物
Game.prototype.setHTML = function (row, col, html) {
    this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].innerHTML = html;
}


// 清屏
Game.prototype.clear = function () {
    for (let i = 0; i < this.row; i++) {
        for (let j = 0; j < this.row; j++) {
            this.dom.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.background = '#C8C8C8   ';
            this.dom.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerHTML = '';

        }
    }
}

// 异步程序（蛇行走的动画效果）
let timer;
Game.prototype.start = function () {
    this.f = 0;
    timer = setInterval(() => {
        // 清屏-更新-渲染
        game.f++;
        game.clear();
        // 当蛇变长的时候，速度要变快
        const during = game.snake.body.length < 30 ? 30 - game.snake.body.length : 1;
        game.f % during == 0 && game.snake.update();
        // 渲染蛇和食物
        game.snake.render();
        game.food.render();
    }, 20);
}

// 键盘事件监听
Game.prototype.bindEvent = function () {
    const self = this;
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            // 左
            case 37:
                if (self.snake.direction == 'R') return;
                self.snake.changeDirection('L');
                break;
            // 上
            case 38:
                if (self.snake.direction == 'D') return;
                self.snake.changeDirection('U');
                break;
            // 右
            case 39:
                if (self.snake.direction == 'L') return;
                self.snake.changeDirection('R');
                break;
            // 下
            case 40:
                if (self.snake.direction == 'U') return;
                self.snake.changeDirection('D');
                break;
        }
    }
}