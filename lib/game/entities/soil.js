ig.module(
	'game.entities.soil'
)
.requires(
	'impact.entity'
)
.defines(function()
{

	EntitySoil = ig.Entity.extend(
	{
		
		// The players (collision) size is a bit smaller than the animation
		// frames, so we have to move the collision box a bit (offset)
		size: {x: 32, y: 32},
		
		maxVel: {x: 0, y: 0},
		
		type: ig.Entity.TYPE.RESOURCE, // Player friendly group
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,
		name: "None",
		
		animSheet: new ig.AnimationSheet( 'media/soilStages.png', 32, 32 ),	
		
		
		health: 3,

		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally for the Player
		flip: false,
		alive: true,

		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			// Add the animations
			this.addAnim( 'idle', 1, [0] );
			this.snapToTile(this.getCurrentTile());
			this.zIndex = 10;
		},
		
		
		update: function() 
		{		

		},

        snapToTile:function (pos) {
            var tilesize = ig.game.backgroundMaps[0].tilesize;
            //(Math.floor(pos.x) * tilesize) = top left corner of tile
            //  + tilesize/2 = middle of tile
            // - this.size.x/2 = center of sprite on center of tile
            this.pos.x = ((Math.floor(pos.x) * tilesize) + tilesize/2) - this.size.x/2;
            this.pos.y = (Math.floor(pos.y) * tilesize) + tilesize/2 - this.size.y/2;
        },


        getCurrentTile:function () {
            var tilesize = ig.game.backgroundMaps[0].tilesize;
            var tileX = this.pos.x / tilesize;
            var tileY = this.pos.y / tilesize;
            return { x:tileX, y:tileY };
        }
	});
});