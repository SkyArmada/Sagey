ig.module(
	'game.entities.ore'
)
.requires(
	'impact.entity',
	'game.entities.item'
)
.defines(function()
{

	EntityOre = EntityItem.extend(
	{
		name: "Ore",
		
		animSheet: new ig.AnimationSheet( 'media/ore.png', 16, 16 ),	

		
		init: function( x, y, settings ) 
		{
			this.parent( x, y, settings );
		},
		
		
		update: function() 
		{		

		}
	});
});