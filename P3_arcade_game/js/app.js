/**
 *
 * Jean-François Beauchef
 *
 * Udacity P3: Classic Arcade Game Clone
 *
 * TODO:
 * - make enemies move
 *
 */



var TILE_FULL_HEIGHT = 171; // Height of a tile, including the hidden portion.
var TILE_HEIGHT = 83;
var TILE_WIDTH = 101;
var TILE_HEIGHT_OFFSET_ENEMY = 25;
var TILE_HEIGHT_OFFSET_PLAYER = 10;

var MOVE = {
    'left': { 'x': -TILE_WIDTH, 'y': 0 },
    'right': { 'x': +TILE_WIDTH, 'y': 0 },
    'up': { 'x': 0, 'y': -TILE_HEIGHT },
    'down': { 'x': 0, 'y': +TILE_HEIGHT }
};


/**
 * Character class
 *
 * @param imageUrl
 * @constructor
 */
var Character = function(imageUrl, tileX, tileY, heightOffset) {
    this.sprite = imageUrl;
    this.heightOffset = heightOffset;
    this.x = (tileX - 1) * TILE_WIDTH;
    this.y = ((tileY - 1) * TILE_HEIGHT) - heightOffset;
}

/**
 * Update the character's position, required method for game
 *
 * @param dt, a time delta between ticks
 */
Character.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

/**
 * Draw the character on the screen, required method for game
 */
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



/**
 * Enemies our player must avoid
 *
 * @constructor
 */
var Enemy = function(tileX, tileY) {
    Character.call(this, 'images/enemy-bug.png', tileX, tileY, TILE_HEIGHT_OFFSET_ENEMY);
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;



/**
 * Player class, which subclasses the Character class
 *
 * @constructor
 */
var Player = function(tileX, tileY) {
    Character.call(this, 'images/char-boy.png', tileX, tileY, TILE_HEIGHT_OFFSET_PLAYER);
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

/**
 * Allows the player to move when an arrow key is pressed.
 * This is specific to the player.
 *
 * @param input
 */
Player.prototype.handleInput = function(input) {
    // First check that input is not undefined, and that it is a valid input in the MOVE matrix
    if (input !== undefined && Object.prototype.hasOwnProperty.call(MOVE, input)) {
        var newX = this.x + MOVE[input]['x'];
        var newY = this.y + MOVE[input]['y'];
        this.x = (newX >= 0 && newX <= ctx.canvas.width - TILE_WIDTH) ? newX : this.x;
        this.y = (newY >= -this.heightOffset && newY <= ctx.canvas.height - TILE_FULL_HEIGHT - this.heightOffset) ? newY : this.y;
    }
};



/**
 * Now instantiate your objects.
 * Place all enemy objects in an array called allEnemies
 * Place the player object in a variable called player
 *
 */
var allEnemies = [new Enemy(1, 2), new Enemy(5, 3), new Enemy(2, 4)];
var player = new Player(3, 6);



/**
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 *
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
