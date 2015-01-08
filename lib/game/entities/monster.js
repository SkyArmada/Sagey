ig.module(
	'game.entities.monster'
)
.requires(
	'impact.entity'
)
.defines(function()
{

	EntityMonster = ig.Entity.extend(
	{
		
		// The players (collision) size is a bit smaller than the animation
		// frames, so we have to move the collision box a bit (offset)
		size: {x: 32, y: 32},
		
		type: ig.Entity.TYPE.MONSTER, // Player friendly group
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,
		name: "Monster",
		alive: true,
		
		animSheet: new ig.AnimationSheet( 'media/tree.png', 32, 32 ),	
		
		
		health: 3,

		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally for the Player
		flip: false,

		
		init: function( x, y, settings ) 
		{
			this.parent( x, y, settings );
			
			// Add the animations
			this.addAnim( 'idle', 1, [0] );
    		this.timer = new ig.Timer(1);
		},
		
		
		update: function() 
		{			
    		if (this.timer.delta() > 0) 
    		{
    			var direction = this.getRandomNum(1, 4);
    			if(direction === 1)
    			{
    				this.pos.x -= 32;
    			}
    			else if(direction === 2)
    			{
    				this.pos.x += 32;
    			}
    			else if(direction === 3)
    			{
    				this.pos.y -= 32;
    			}
    			else if(direction === 4)
    			{
    				this.pos.y += 32;
    			}
    			console.log(this.pos);
    			this.snapToTile(this.getCurrentTile());
    			this.timer.set(1);
    		}
			//this.parent();
		},


        snapToTile:function (pos) {
            var tilesize = ig.game.backgroundMaps[0].tilesize;
            this.pos.x = pos.x * tilesize;
            this.pos.y = pos.y * tilesize;
        },


        getCurrentTile:function () {
            var tilesize = ig.game.backgroundMaps[0].tilesize;
            var tileX = this.pos.x / tilesize;
            var tileY = this.pos.y / tilesize;
            return { x:Math.floor(tileX), y:Math.floor(tileY) };
        },

        getRandomNum:function (min, max)
        {
        	return Math.floor((Math.random() * max) + min);
        }
	});
});