// Enemy Class
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt*this.speed;
    if (this.x > 5) {
        this.x = -1;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // console.log(this.sprite);
    ctx.drawImage(Resources.get(this.sprite), this.x*101, this.y*83);
};

// Player Class
var Player = function() {
    this.x = 2;
    this.y = 5;
    this.sprite = 'images/char-boy.png';
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    allEnemies.forEach(function(enemy) {
        if ((this.x == Math.ceil(enemy.x) || this.x == Math.floor(enemy.x)) && this.y == enemy.y) {
            player.reset();
        }
    }, this);
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x*101, this.y*83);
};

// input handler for Player movement
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x != 0) {
        this.x -= 1;
    } else if (key === 'up') {
        if (this.y != 1) {
            this.y -= 1;
        } else {
            player.reset();
        }
    } else if (key === 'right' && this.x != 4) {
        this.x += 1;
    } else if (key === 'down' && this.y != 5) {
        this.y += 1;
    }
};

// Resets the player's position
Player.prototype.reset = function() {
    this.x = 2;
    this.y = 5;
}

var player = new Player();
var allEnemies = [new Enemy(0,1),new Enemy(2,2),new Enemy(1,3)];

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
