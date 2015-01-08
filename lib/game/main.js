ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.player',

	'game.levels.Level1',

	'plugins.camera',
	'game.entities.branch',
	'game.entities.ore',
	'game.entities.soil'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

	// HUD icons
	oreIcon: new ig.Image( 'media/ore.png' ),
	coinIcon: new ig.Image( 'media/coin.png' ),
	branchIcon: new ig.Image( 'media/branch.png' ),
	axeIcon: new ig.Image( 'media/axe.png' ),
	pickIcon: new ig.Image( 'media/pick.png' ),
	soilIcon: new ig.Image( 'media/soilIcon.png' ),
	hoeIcon: new ig.Image( 'media/hoeIcon.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		this.loadLevel(LevelLevel1);


		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
		ig.input.bind( ig.KEY.W, 'up' );
		ig.input.bind( ig.KEY.S, 'down' );
		ig.input.bind( ig.KEY.SPACE, 'attack' );
		ig.input.bind( ig.KEY.C, 'place' );
		ig.input.bind( ig.KEY.V, 'switch' );
		ig.input.bind( ig.KEY.X, 'weapon' );

		this.setupCamera();
	},	

	
	setupCamera: function() {
		// Set up the camera. The camera's center is at a third of the screen
		// size, i.e. somewhat shift left and up. Damping is set to 3px.		
		this.camera = new ig.Camera( ig.system.width, ig.system.height, 0 );
		
		// // The camera's trap (the deadzone in which the player can move with the
		// // camera staying fixed) is set to according to the screen size as well.
  //   	this.camera.trap.size.x = ig.system.width/10;
  //   	this.camera.trap.size.y = ig.system.height/3;
		
		// // The lookahead always shifts the camera in walking position; you can 
		// // set it to 0 to disable.
  //   	this.camera.lookAhead.x = ig.system.width/6;
		
		// // Set camera's screen bounds and reposition the trap on the player
  //   	this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
  //   	this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
    	this.camera.set( this.player );
	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Camera follows the player
		this.screen.x = this.player.pos.x - ig.system.width/2;
		this.screen.y = this.player.pos.y - ig.system.height/2;
		// Re-sort Entities
		ig.game.sortEntitiesDeferred();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();


		
		// Add your own, additional update code here
		if(this.player)
		{
			var x = 8, y = 16;
			this.coinIcon.draw(x, y);
			x += 20;
			if(this.player.inventory.length > 0)
			{
				if(this.player.inventory[this.player.selectedItem-1].name === 'Branch')
				{
					this.branchIcon.draw(x, y);
				}
				else if(this.player.inventory[this.player.selectedItem-1].name === 'Ore')
				{
					this.oreIcon.draw(x, y);
				}
				else if(this.player.inventory[this.player.selectedItem-1].name === 'Soil')
				{
					this.soilIcon.draw(x, y);
				}
			}
			x += 20;
			if(this.player.weapon === "axe")
			{
				this.axeIcon.draw(x, y);
			}
			else if(this.player.weapon === "pick")
			{
				this.pickIcon.draw(x, y);
			}
			else if(this.player.weapon === "hoe")
			{
				this.hoeIcon.draw(x, y);
			}
			x = 8;
		 	y += 20;
		 	this.font.draw(this.player.coins, x ,y);
		 	x += 20;

			if(this.player.inventory.length > 0)
			{
				this.font.draw(this.player.inventory[this.player.selectedItem-1].amount, x ,y);
			}
		 }
	},

	spawn: function(name, x, y, settings)
	{
		ig.game.spawnEntity(name, x , y, settings);
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 640, 480, 1 );

});
/*
// Listen to the window's 'resize' event and set the canvas' size each time
// it changes.
window.addEventListener('resize', function(){
	// If the game hasn't started yet, there's nothing to do here
	if( !ig.system ) { return; }
	
	// Resize the canvas style and tell Impact to resize the canvas itself;
	canvas.style.width = window.innerWidth + 'px';
	canvas.style.height = window.innerHeight + 'px';
	ig.system.resize( window.innerWidth * scale, window.innerHeight * scale );
	
	// Re-center the camera - it's dependend on the screen size.
	if( ig.game && ig.game.setupCamera ) {
		ig.game.setupCamera();
	}
}, false);*/
