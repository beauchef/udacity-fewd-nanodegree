/**
 *
 * Jean-François Beauchef
 *
 * Udacity P3: Classic Arcade Game Clone
 *
 * TODO:
 * - reset player position once the top is reached
 *
 */



var TILE_FULL_HEIGHT = 171; // Height of a tile, including the 'hidden' portion.
var TILE_HEIGHT = 83; // Height of the visible portion of a tile.
var TILE_WIDTH = 101;
var TILE_HEIGHT_OFFSET_ENEMY = 25;
var TILE_HEIGHT_OFFSET_PLAYER = 10;
var COLLISION_OFFSET = 25;

var ENEMY_SPEED = {
    'slow': 100,
    'medium': 150,
    'fast': 200
};

var PLAYER_INITIAL_TILE = { 'x': 3, 'y': 6 };

var PLAYER_MOVE = {
    'left':  { 'x': -TILE_WIDTH,  'y': 0 },
    'right': { 'x': +TILE_WIDTH,  'y': 0 },
    'up':    { 'x': 0,            'y': -TILE_HEIGHT },
    'down':  { 'x': 0,            'y': +TILE_HEIGHT }
};


/**
 * Character class
 *
 * @param imageUrl URL to the image representing this character
 * @param tileX tile position on X axis
 * @param tileY tile position on Y axis
 * @param heightOffset height offset in pixels for this character
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
 * You should multiply any movement by the dt parameter
 * which will ensure the game runs at the same speed for
 * all computers.
 *
 * @param dt, a time delta between ticks
 */
Character.prototype.update = function(dt) {
    // do nothing
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
 * @param tileX tile position on X axis
 * @param tileY tile position on Y axis
 * @constructor
 */
var Enemy = function(tileX, tileY, speed) {
    this.speed = speed;
    Character.call(this, 'images/enemy-bug.png', tileX, tileY, TILE_HEIGHT_OFFSET_ENEMY);
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Update the enemy's position.
 * Dependant on the enemy's specific speed.
 *
 * @param dt, a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    if (dt !== undefined) {
        this.x = this.x + (this.speed * dt);
        if (this.x > ctx.canvas.width) {
            this.x = this.x - (ctx.canvas.width + TILE_WIDTH);
        }
    }
};

/**
 * Check if the enemy instance is colliding with the player.
 * An offset is used, so the player can get relatively close to an enemy.
 * It gives a better 'feel' to the game.
 *
 * @param x
 * @param y
 * @returns {boolean}
 */
Enemy.prototype.isColliding = function(player) {
    return ((player.x > this.x - TILE_WIDTH + COLLISION_OFFSET) &&
            (player.x < this.x + TILE_WIDTH - COLLISION_OFFSET) &&
            (player.y > this.y - TILE_HEIGHT + COLLISION_OFFSET) &&
            (player.y < this.y + TILE_HEIGHT - COLLISION_OFFSET));
}



/**
 * Player class, which subclasses the Character class
 *
 * @param tileX tile position on X axis
 * @param tileY tile position on Y axis
 * @constructor
 */
var Player = function(tileX, tileY) {
    tileX = typeof tileX !== 'undefined' ? tileX : PLAYER_INITIAL_TILE.x;
    tileY = typeof tileY !== 'undefined' ? tileY : PLAYER_INITIAL_TILE.y;
    Character.call(this, 'images/char-boy.png', tileX, tileY, TILE_HEIGHT_OFFSET_PLAYER);
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

/**
 * Reset player position.
 */
Player.prototype.reset = function() {
    this.x = (PLAYER_INITIAL_TILE.x - 1) * TILE_WIDTH;
    this.y = ((PLAYER_INITIAL_TILE.y - 1) * TILE_HEIGHT) - this.heightOffset;
};

/**
 * Allows the player to move when an arrow key is pressed.
 * This is specific to the player.
 *
 * @param input key input (can be: 'left', 'right', 'up', 'down')
 */
Player.prototype.handleInput = function(input) {
    // First check that input is not undefined, and that it is a valid input in the PLAYER_MOVE matrix
    if (input !== undefined && Object.prototype.hasOwnProperty.call(PLAYER_MOVE, input)) {
        var newX = this.x + PLAYER_MOVE[input]['x'];
        var newY = this.y + PLAYER_MOVE[input]['y'];
        this.x = (newX >= 0 && newX <= ctx.canvas.width - TILE_WIDTH) ? newX : this.x;
        this.y = (newY >= -this.heightOffset && newY <= ctx.canvas.height - TILE_FULL_HEIGHT - this.heightOffset) ? newY : this.y;
        console.log('Move: x='+this.x+', y='+this.y);
    }
};



/**
 * Now instantiate your objects.
 * Place all enemy objects in an array called allEnemies
 * Place the player object in a variable called player
 * Positions here are based on tiles, not pixels.
 * The top left tile is (1,1). The bottom right rile is (5,6).
 *
 */
var player = new Player();
var allEnemies = [
    new Enemy(1, 2, ENEMY_SPEED.medium),
    new Enemy(4, 3, ENEMY_SPEED.fast),
    new Enemy(2, 4, ENEMY_SPEED.slow)
];



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
