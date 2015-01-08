ig.module(
	'game.entities.tree'
)
.requires(
	'impact.entity',
	'game.entities.resource'
)
.defines(function()
{

	EntityTree = EntityResource.extend(
	{
		name: "Tree",
		
		animSheet: new ig.AnimationSheet( 'media/tree.png', 32, 32 ),	
		
		
		health: 3,

		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally for the Player
		flip: false,

		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			// Add the animations
			this.addAnim( 'idle', 1, [0] );
			this.addDrop("Branch", 100, 1);
		},
		
		
		update: function() 
		{		
			this.parent();
		},

		receiveDamage: function( amount, from ) 
		{
			if(from.name === "axe")
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