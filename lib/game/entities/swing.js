ig.module(
	'game.entities.swing'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function()
{

	EntitySwing = ig.Entity.extend(
	{
		
		// The players (collision) size is a bit smaller than the animation
		// frames, so we have to move the collision box a bit (offset)
		size: {x: 5, y: 5},
		
		maxVel: {x: 0, y: 0},
		
		type: ig.Entity.TYPE.A, // Player friendly group
		checkAgainst: ig.Entity.TYPE.RESOURCE, // Check Against B - our evil enemy group
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		animSheet: new ig.AnimationSheet( 'media/swing.png', 10, 10 ),	

		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally
		flip: false,
		name: "axe",

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			// Add the animations
			this.addAnim( 'idle', 1, [0] );
    		this.timer = new ig.Timer(0.05);
    		this.name = settings.name;
		},
		
		reset: function( x, y, settings ) 
		{
	        // This function is called when an instance of this class is
	        // resurrected from the entity pool.
	        // The parent implementation of reset() will reset the .pos to 
	        // the given x, y and will reset the .vel, .accel, .health and 
	        // some other properties.
	        this.parent( x, y, settings );
    		this.timer = new ig.Timer(0.001);
    	},

		update: function() 
		{		
			this.parent();
    		if (this.timer.delta() > 0) 
    		{
      			this.kill();
    		}
		},

		touches: function( other ) 
		{
			if(this.parent(other) === true)
			{
				if(other.type == ig.Entity.TYPE.RESOURCE)
				{
					other.receiveDamage(3, this);
					return;
				}
				if((other.name == "Tree" || other.name === "Branch") && this.name == "axe")
				{
					console.log("Tree hit");
					other.receiveDamage(3, this);
				}
				else if((other.name == "Rock" || other.name === "Ore") && this.name == "pick")
				{
					console.log("Rock hit");
					other.alive = false;
					other.kill();
					this.kill();
					ig.game.player.AddItem("Ore", 1);
				}
			}
		}	
	});


ig.EntityPool.enableFor( EntitySwing );

});