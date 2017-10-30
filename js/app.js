// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = 2;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 2;
    this.y = 5;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
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

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    // console.log(this.sprite);
    ctx.drawImage(Resources.get(this.sprite), this.x*101, this.y*83);
};

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

Player.prototype.reset = function() {
    this.x = 2;
    this.y = 5;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(0,1),new Enemy(2,2),new Enemy(1,3)];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
