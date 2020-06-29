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


      // Weapon slot
      //this.weaponBtn = this.add.sprite(100, 35, 'char_sprites', 'inventory.png').setInteractive();
      
      
      this.weaponBtn = this.add.sprite(100, 35, 'item_slot').setInteractive();
      this.weaponBtn.setScrollFactor(0);

       
      ///UGH!
    /* this.weaponBtn.on('pointerdown', function (pointer, weaponBtn) {
      //this.weaponBtn.setTexture('char_sprites', 'inventory_with_sword.png');
        console.log('Fuck!');
    }); */


      this.player.setVelocity(0);
      this.player.body.setAllowGravity(false);
      this.player.setCollideWorldBounds(false); 
      //this.player.setSize(30, 0, 0, 0);

      
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
      this.Text = this.add.text(210, 50, this.DisplayText, {fontSize: '20px', fill: '#000', backgroundColor: '#fff' });   // rgba(0,255,0,0.25)
      
     
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



    //this.weaponBtn.on('gameobjectdown',this.removeSword);
    this.weaponBtn.on('pointerdown', function (weaponBtn) {
      //this.setFrame(3);
      this.setTexture('item_slot');
      //player.setTexture('char_sprites', 'enchanted_guy_still_01.png');

  });

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    
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
    this.DisplayText = this.npc.body.touching.none ? '' : 'You see that sword?';
    this.Text.setText(this.DisplayText);
   
    } else if (this.cursorKeys.right.isDown) {
      this.Text.setText('');
    } else if(this.cursorKeys.down.isDown) {
      this.Text.setText('');
    }

    // Drop weapon .. Make it disappear from inventory slot / character .. show sword on ground
    if (Phaser.Input.Keyboard.JustDown(this.F) && this.player.texture.key === 'armed_guy' ) {
      this.weaponBtn.setTexture("item_slot");
      this.player.setTexture('char_sprites', 'enchanted_guy_still_01.png');

      this.resetSwordPos(this.sword); 


    } 



    

    //this.weaponBtn.on('pointerdown', this.weaponState);


   } //End update area



//When player hovers over sword, destroy it and change character texture to show Enchanted_Guy_Sword
   pickUpSword(player, sword, weaponBtn) {
    sword.setVisible(false);
    //Changing this to out of Atlas for now in order to check if the sprite has armed texture when pressing F 
    player.setTexture('armed_guy');
    this.player.setSize(21, 0, 0, 0);

    this.weaponBtn.setTexture('char_sprites', 'inventory_with_sword.png');
  }


//Make sword sprite visible again at players x and y position 
  resetSwordPos(sword) {
    sword.setVisible(true);
    this.sword.y = this.player.body.position.y;
    this.sword.x = this.player.body.position.x;
    
  }









  }