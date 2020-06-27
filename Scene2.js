class Scene2 extends Phaser.Scene {
    constructor() {
      super("playGame");
    }
  
    create() {
      
 

        this.map = this.make.tilemap({
            key: 'map',
            tileWidth: 16,
            tileHeight: 16
          });

      this.tileset = this.map.addTilesetImage('RPG Nature Tileset', 'rpgMap');



      this.grass = this.map.createStaticLayer('Grass', this.tileset, 0, 0);
      this.trees = this.map.createStaticLayer('Trees', this.tileset, 0, 0);
      this.sign = this.map.createStaticLayer('Sign', this.tileset, 0, 0);
      
    
      this.player = this.physics.add.sprite(50, 99, 'char_sprites', 'enchanted_guy_still_01.png').setScale(4);


      this.sword = this.physics.add.sprite(30, 180, 'char_sprites', 'Enchanted_Sword.png').setScale(2);

      this.npc = this.physics.add.sprite(300, 90, 'npc_sprites', 'enchanted_npc.png');
      //this.player = this.physics.add.image(config.width / 2 - 8, config.height - 64, 'player'); 



      this.player.setVelocity(0);
      this.player.body.setAllowGravity(false);
      this.player.setCollideWorldBounds(false); 

      
      this.npc.body.setAllowGravity(false);
      this.npc.body.setSize(20, 20);
      this.npc.enableBody = true; 
      this.npc.body.immovable = true; 


      this.sword.body.setAllowGravity(false);


      //Collision between player and trees
      this.trees.setCollisionBetween(1, 70);
      this.physics.add.collider(this.player, this.trees);

   
     
      this.physics.add.collider(this.player, this.npc);

      this.DisplayText;
      this.Text = this.add.text(210, 80, this.DisplayText, {fontSize: '20px', fill: '#000', backgroundColor: 'rgba(0,255,0,0.25)' });
      
     
      //this.physics.add.existing(this.sign, true);
      this.physics.add.collider(this.player, this.sign);
      this.sign.setCollisionByExclusion([-1]);
      this.sign.setCollisionBetween(1, 70);
      this.sign.enableBody = true; 
      
      

      // When player walks over sword, overlap and trigger pickUpSword function
      this.physics.add.overlap(this.player, this.sword, this.pickUpSword, null, this);
      


    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player); 


    
    this.cursorKeys = this.input.keyboard.createCursorKeys(); 

    }  // End of create function


  



   update() {

    this.player.setVelocity(0);
   

    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
    }
   
    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
    }



    // Display text from NPC when colliding with Player
    if(this.cursorKeys.left.isDown) {
    this.DisplayText = this.npc.body.touching.none ? '' : 'Hello';
    this.Text.setText(this.DisplayText);
   
    } else if (this.cursorKeys.right.isDown) {
      this.Text.setText('');
    } else if(this.cursorKeys.down.isDown) {
      this.Text.setText('');
    }
    



   } //End update area



//When player hovers over sword, destroy it and change character texture to show Enchanted_Guy_Sword
   pickUpSword(player, sword){
    sword.disableBody(true, true); 
    player.setTexture('char_sprites','Enchanted_Guy_Sword.png');
  }









  }