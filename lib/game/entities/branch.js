ig.module(
	'game.entities.branch'
)
.requires(
	'impact.entity',
	'game.entities.item'
)
.defines(function()
{

	EntityBranch = EntityItem.extend(
	{
		name: "Branch",
		
		animSheet: new ig.AnimationSheet( 'media/branch.png', 16, 16 ),	

		
		init: function( x, y, settings ) 
		{
			this.parent( x, y, settings );
		},
		
		
		update: function() 
		{		

		}
	});
});