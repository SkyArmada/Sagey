ig.module(
	'game.entities.resource'
)
.requires(
	'impact.entity'
)
.defines(function()
{

	EntityResource = ig.Entity.extend(
	{
		
		// The players (collision) size is a bit smaller than the animation
		// frames, so we have to move the collision box a bit (offset)
		size: {x: 32, y: 32},
		
		maxVel: {x: 0, y: 0},
		
		type: ig.Entity.TYPE.RESOURCE, // Player friendly group
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		name: "Resource",
		alive: true,
		
		animSheet: new ig.AnimationSheet( 'media/tree.png', 32, 32 ),	
		
		
		health: 3,

		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally for the Player
		flip: false,
		drops:[],

		
		init: function( x, y, settings ) 
		{
			this.parent( x, y, settings );
			
			// Add the animations
			this.addAnim( 'idle', 1, [0] );
		},
		
		
		update: function() 
		{		
			this.parent();
		},

		receiveDamage: function( amount, from ) 
		{
			this.health -= amount;
			if(this.alive)
			{
				if(this.health <= 0)
				{
					this.alive = false;
					this.kill();
					var drop = this.getRandomNum(0, this.drops.length - 1);
					ig.game.player.AddItem(this.drops[drop].name, this.drops[drop].amount);
				}
			}
		},

		addDrop: function(name, percent, amount)
		{
			for(var i = 0; i <= percent; i++)
			{
				if(this.drops.length >= 101)
				{
					console.log(this.name + " too many items.");
				}
				this.drops.push({name:name, amount:amount});
			}
		},

		getDrop:function()
		{
			var drop = this.getRandomNum(0, this.drops.length - 1);
			return this.drops[drop];
		},

        getRandomNum:function (min, max)
        {
        	return Math.floor((Math.random() * max) + min);
        }
	});
});