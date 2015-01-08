ig.module(
	'game.entities.rock'
)
.requires(
	'impact.entity',
	'game.entities.resource'
)
.defines(function()
{

	EntityRock = EntityResource.extend(
	{
		name: "Rock",
		
		animSheet: new ig.AnimationSheet( 'media/rock.png', 32, 32 ),	
		
		
		health: 3,

		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally for the Player
		flip: false,

		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			// Add the animations
			this.addAnim( 'idle', 1, [0] );
			this.addDrop("Ore", 100, 1);
		},
		
		
		update: function() 
		{		

		},

		receiveDamage: function( amount, from ) 
		{
			if(from.name === "pick")
			{
				this.parent( amount, from);
			}
			else
			{
				this.parent(amount*.4, from);
			}
		}
	});
});