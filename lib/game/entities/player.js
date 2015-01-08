ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'game.entities.swing'
)
.defines(function()
{

	EntityPlayer = ig.Entity.extend(
	{
		
		// The players (collision) size is a bit smaller than the animation
		// frames, so we have to move the collision box a bit (offset)
		size: {x: 32, y: 32},
		
		maxVel: {x: 400, y: 800},
		
		type: ig.Entity.TYPE.A, // Player friendly group
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		animSheet: new ig.AnimationSheet( 'media/peppermint.png', 32, 32 ),	
		
		
		health: 3,
		inventory: [],
		selectedItem: 1,

		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally for the Player
		flip: false,
		direction: "down",
		coins: 0,
		weapon: "axe",
		currentTile: {x:0,y:0},

		
		init: function( x, y, settings ) 
		{
			this.parent( x, y, settings );
			
			// Add the animations
			this.addAnim( 'idle', 1, [0] );

			// Set a reference to the player on the game instance
			ig.game.player = this;
			this.zIndex = 1;
		},
		
		
		update: function() 
		{		
			this.HandleInput();
			
			// Move!
			this.parent();
			this.currentTile = this.getCurrentTile();
		},

		HandleInput: function()
		{
			if(ig.input.state('left'))
			{
				this.vel.x = -100;
				this.direction = "left";
			}
			else if(ig.input.state('right'))
			{
				this.vel.x = 100;
				this.direction = "right";
			}
			else
			{
				this.vel.x = 0;
			}

			if(ig.input.state('up'))
			{
				this.vel.y = -100;
				this.direction = "up";
			}
			else if(ig.input.state('down'))
			{
				this.vel.y = 100;
				this.direction = "down";
			}
			else
			{
				this.vel.y = 0;
			}

			//if(ig.input.pressed('attack') && this.vel.x === 0 && this.vel.y === 0)
			if(ig.input.pressed('attack'))
			{
				this.Swing();
			}

			if(ig.input.pressed('switch'))
			{
				this.selectedItem++;
				if(this.selectedItem > this.inventory.length)
				{
					this.selectedItem = 1;
				}
			}

			if(ig.input.pressed('place'))
			{
				if(this.inventory.length > 0)
				{
					var itemSpawn
					itemSpawn = "Entity" + this.inventory[this.selectedItem-1].name;
					switch(this.direction)
					{
						case "up":
							ig.game.spawnEntity(itemSpawn, (this.pos.x + (this.size.x/2)) - 5, (this.pos.y - 10));
							break;					
						case "down":
							ig.game.spawnEntity(itemSpawn, (this.pos.x + (this.size.x/2)) - 5, (this.pos.y + (this.size.y)));
							break;					
						case "left":
							ig.game.spawnEntity(itemSpawn, (this.pos.x - 10), (this.pos.y + (this.size.y/2) - 5));
							break;					
						case "right":
							ig.game.spawnEntity(itemSpawn, (this.pos.x + this.size.x), (this.pos.y + (this.size.y/2) - 5));
							break;
						default:
							break;
					}

					this.inventory[this.selectedItem-1].amount--;
					if(this.inventory[this.selectedItem-1].amount === 0)
					{
						this.inventory.splice(this.selectedItem-1, 1);
					}
					if(this.selectedItem > this.inventory.length)
					{
						if(this.inventory.length == 0)
						{
							this.selectedItem = 1;
						}
						else
						{
							this.selectedItem--;
						}
					}
				}
				else
				{
					console.log("Empty inventory");
				}
			}


			if(ig.input.pressed('weapon'))
			{
				if(this.weapon === "axe")
				{
					this.weapon = "pick";
				}
				else if(this.weapon === "pick")
				{
					this.weapon = "hoe";
				}
				else
				{
					this.weapon = "axe";
				}
			}
		},

		AddItem: function(name, amount)
		{
			var index = this.FindItem(name);

			if(index == -1)
			{
				this.inventory.push({name: name, amount: amount});
			}
			else
			{
				this.inventory[index] = {name: name, amount:this.inventory[index].amount + amount};
			}
		},

		FindItem: function(name)
		{
			var searchTerm = name, index = -1;
			for(var i = 0, len = this.inventory.length; i < len; i++) 
			{
			    if (this.inventory[i].name === name) 
			    {
			    	return i;
			    }
			}
		}

        snapToTile:function (pos) 
        {
            var tilesize = ig.game.backgroundMaps[0].tilesize;
            this.pos.x = pos.x * tilesize;
            this.pos.y = pos.y * tilesize;
        },


        getCurrentTile:function () 
        {
            var tilesize = ig.game.backgroundMaps[0].tilesize;
            var tileX = this.pos.x / tilesize;
            var tileY = this.pos.y / tilesize;
            return { x:Math.floor(tileX), y:Math.floor(tileY) };
        },

        Swing: function()
        {
			if(this.weapon === "hoe")
			{				
				ig.game.backgroundMaps[0].data[this.currentTile.y][this.currentTile.x] = 3;
				return;
			}
			console.log(this.weapon);
			switch(this.direction)
			{
				case "up":
					ig.game.spawnEntity(EntitySwing, (this.pos.x + (this.size.x/2)) - 5, (this.pos.y - 10), {name:this.weapon});
					break;					
				case "down":
					ig.game.spawnEntity(EntitySwing, (this.pos.x + (this.size.x/2)) - 5, (this.pos.y + (this.size.y)), {name:this.weapon});
					break;					
				case "left":
					ig.game.spawnEntity(EntitySwing, (this.pos.x - 10), (this.pos.y + (this.size.y/2) - 5), {name:this.weapon});
					break;					
				case "right":
					ig.game.spawnEntity(EntitySwing, (this.pos.x + this.size.x), (this.pos.y + (this.size.y/2) - 5), {name:this.weapon});
					break;
				default:
					break;
			}
			console.log(this.inventory);
        }
	});
});