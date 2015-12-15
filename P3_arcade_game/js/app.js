/**
 *
 * Jean-François Beauchef
 *
 * Udacity P3: Classic Arcade Game Clone
 *
 *
 */



var TILE_FULL_HEIGHT = 171; // Height of a tile, including the 'hidden' portion.
var TILE_HEIGHT = 83; // Height of the visible portion of a tile.
var TILE_WIDTH = 101;
var TILE_HEIGHT_OFFSET_ENEMY = 25;
var TILE_HEIGHT_OFFSET_PLAYER = 10;
var COLLISION_OFFSET = 25;
var PLAYER_WIN_MILLI_SECONDS_DELAY = 300;

var PLAYER_INITIAL_TIME = 60; // in seconds
var PLAYER_INITIAL_TILE = { 'x': 3, 'y': 6 };

var PLAYER_MOVE = {
    'left':  { 'x': -TILE_WIDTH,  'y': 0 },
    'right': { 'x': +TILE_WIDTH,  'y': 0 },
    'up':    { 'x': 0,            'y': -TILE_HEIGHT },
    'down':  { 'x': 0,            'y': +TILE_HEIGHT }
};

var ENEMY_SPEED = {
    'slow': 100,
    'medium': 150,
    'fast': 200
};


/**
 * Game class.
 * It keeps the information related to the game in progress.
 * So that's the score, and the timer (for now).
 * Every character will have a reference to a game object.
 * If the game is over, a character does not need to move for example.
 *
 * @param time length of a game in seconds
 * @constructor
 */
var Game = function(time) {
    this.score = 0; // initial score
    this.timer = time;
    this.updateScore();
};

/**
 * Update the game timer. This might not be the most precise way
 * to handle this, but it will do.
 *
 * @param dt, a time delta between ticks
 */
Game.prototype.update = function(dt) {
    if (dt !== undefined && !this.isOver()) {
        this.timer = this.timer - dt;
        document.getElementById('timer').innerHTML = Math.ceil(this.timer);
    }
};

/**
 * Checks if there is time left to the game or not.
 *
 * @returns {boolean}
 */
Game.prototype.isOver = function() {
    return (this.timer < 0);
};

/**
 * Update the game score inside the board, on top of the game.
 */
Game.prototype.updateScore = function() {
    document.getElementById('score').innerHTML = this.score;
};

/**
 * Player won a round by reaching the top of the screen.
 * Increases the score, and updates the board.
 */
Game.prototype.winRound = function() {
    this.score = this.score + 1;
    this.updateScore();
};

/**
 * Player was hit by an enemy.
 * Decreases the score, and updates the board.
 */
Game.prototype.loseRound = function() {
    this.score = this.score - 1;
    this.updateScore();
};



/**
 * Character class
 *
 * @param game object containing timer and score
 * @param imageUrl URL to the image representing this character
 * @param tileX tile position on X axis
 * @param tileY tile position on Y axis
 * @param heightOffset height offset in pixels for this character
 * @constructor
 */
var Character = function(game, imageUrl, tileX, tileY, heightOffset) {
    this.game = game;
    this.sprite = imageUrl;
    this.heightOffset = heightOffset;
    this.x = (tileX - 1) * TILE_WIDTH;
    this.y = ((tileY - 1) * TILE_HEIGHT) - heightOffset;
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
 * @param game object containing timer and score
 * @param tileX tile position on X axis
 * @param tileY tile position on Y axis
 * @param speed the enemy's speed
 * @constructor
 */
var Enemy = function(game, tileX, tileY, speed) {
    this.speed = speed;
    Character.call(this, game, 'images/enemy-bug.png', tileX, tileY, TILE_HEIGHT_OFFSET_ENEMY);
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Update the enemy's position. Required method for game.
 * Dependant on the enemy's specific speed.
 * We multiply any movement by the dt parameter
 * which will ensure the game runs at the same speed for
 * all computers.
 *
 * @param dt, a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    if (dt !== undefined && !this.game.isOver()) {
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
 * @param player to check coordinates
 * @returns {boolean}
 */
Enemy.prototype.isColliding = function(player) {
    return ((player.x > this.x - TILE_WIDTH + COLLISION_OFFSET) &&
            (player.x < this.x + TILE_WIDTH - COLLISION_OFFSET) &&
            (player.y > this.y - TILE_HEIGHT + COLLISION_OFFSET) &&
            (player.y < this.y + TILE_HEIGHT - COLLISION_OFFSET));
};



/**
 * Player class, which subclasses the Character class
 *
 * @param game object containing timer and score
 * @param tileX tile position on X axis
 * @param tileY tile position on Y axis
 * @constructor
 */
var Player = function(game, tileX, tileY) {
    tileX = typeof tileX !== 'undefined' ? tileX : PLAYER_INITIAL_TILE.x;
    tileY = typeof tileY !== 'undefined' ? tileY : PLAYER_INITIAL_TILE.y;
    this.freeze = false; // this is to momentarely freeze the player when he wins
    Character.call(this, game, 'images/char-boy.png', tileX, tileY, TILE_HEIGHT_OFFSET_PLAYER);
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

/**
 * Update the player.
 *
 * @param dt, a time delta between ticks
 */
Player.prototype.update = function(dt) {
    // do nothing for now
};

/**
 * Checks to see if the player can move or not.
 * A player can move if the 'freeze' flag is not active,
 * and if the game is not over.
 *
 * @returns {boolean}
 */
Player.prototype.canMove = function() {
    return (!this.freeze && !this.game.isOver());
};

/**
 * Reset player position.
 */
Player.prototype.reset = function() {
    this.x = (PLAYER_INITIAL_TILE.x - 1) * TILE_WIDTH;
    this.y = ((PLAYER_INITIAL_TILE.y - 1) * TILE_HEIGHT) - this.heightOffset;
};

/**
 * Finish the current player run.
 * This is called by both the win and the lose methods.
 * It resets the player position, and changes the score.
 *
 * @param isWin indicate if the player won or lost this round
 */
Player.prototype.finish = function(isWin) {
    isWin = typeof isWin !== 'undefined' ? isWin : true;
    this.reset();
    if (isWin) {
        this.game.winRound();
    } else {
        this.game.loseRound();
    }
    this.freeze = false;
    console.log('Score: ' + this.game.score);
};

/**
 * Player wins!
 * We 'freeze' the player momentarely,
 * so we can see that we reached the top and won.
 *
 * Here is how I did the 'freeze' bit using setTimeout at first:
 *
 *     var player = this;
 *     setTimeout(function() {
 *         player.finish(true);
 *     }, PLAYER_WIN_MILLI_SECONDS_DELAY);
 *
 * But I got the following comment from the Udacity reviewer:
 *
 * "Since you are calling the player instance, inside the Player
 * prototype itself, you are violating OOP encapsulation principles.
 * You should use the keyword this instead: this.finish(true);"
 *
 * But I cannot do this because, as explained in the JavaScript
 * reference (Mozilla web site), "By default within window.setTimeout(),
 * the this keyword will be set to the window (or global) object."
 *
 * It also states that " you may explicitly bind this to the callback
 * function, in order to maintain the instance."
 *
 * So this is exactly what I did here.
 *
 */
Player.prototype.win = function() {
    this.freeze = true;
    setTimeout(this.finish.bind(this), PLAYER_WIN_MILLI_SECONDS_DELAY);
};

/**
 * Player loses the current round.
 */
Player.prototype.lose = function() {
    this.finish(false);
};

/**
 * Check to see if the player has reached the water
 *
 * @returns {boolean}
 */
Player.prototype.reachedWater = function() {
    return (this.y <= 1);
};

/**
 * Allows the player to move when an arrow key is pressed.
 * This is specific to the player.
 *
 * @param input key input (can be: 'left', 'right', 'up', 'down')
 */
Player.prototype.handleInput = function(input) {
    // First check that input is not undefined, and that it is a valid input in the PLAYER_MOVE matrix
    if (this.canMove() && input !== undefined && Object.prototype.hasOwnProperty.call(PLAYER_MOVE, input)) {
        // calculate new coordinates, and try to assign them
        this.assignNewCoordinates(this.x + PLAYER_MOVE[input].x, this.y + PLAYER_MOVE[input].y);
        // Check to see if the player won by reaching the top
        if (this.reachedWater()) {
            this.win();
        }
    }
};

/**
 * Assign new coordinates ONLY if they are valid (player if not out of bounds).
 * Note that because of the way the PLAYER_MOVE matrix is built, at most one
 * of X and Y will be modified.
 *
 * @param newX new X coordinate
 * @param newY new Y coordinate
 */
Player.prototype.assignNewCoordinates = function(newX, newY) {
    if ((newX >= 0) && (newX <= ctx.canvas.width - TILE_WIDTH)) {
        this.x = newX;
    }
    if ((newY >= -this.heightOffset) && (newY <= ctx.canvas.height - TILE_FULL_HEIGHT - this.heightOffset)) {
        this.y = newY;
    }
};



/**
 * Initialize game.
 *
 * Instantiate all required objects.
 * Place all enemy objects in an array called allEnemies
 * Place the player object in a variable called player
 * Positions here are based on tiles, not pixels.
 * The top left tile is (1,1). The bottom right tile is (5,6).
 *
 */
function initializeGame() {
    game = new Game(PLAYER_INITIAL_TIME);
    player = new Player(game);
    allEnemies = [
        new Enemy(game, 1, 2, ENEMY_SPEED.medium),
        new Enemy(game, 4, 3, ENEMY_SPEED.fast),
        new Enemy(game, 2, 4, ENEMY_SPEED.slow)
    ];
};

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

/**
 * This simply resets the game when the reset button is clicked.
 */
document.getElementById('reset-game').addEventListener('click', initializeGame);

/**
 * Do actual game initialization here.
 */
var game, player, allEnemies;
initializeGame();
