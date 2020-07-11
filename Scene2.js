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

      //this.start = this.map.objects['spawn']['0'];
      this.start = this.map.createFromObjects('spawn', 1, { key: 'entry' });


      this.grass = this.map.createStaticLayer('Grass', this.tileset, 0, 0);
      this.trees = this.map.createStaticLayer('Trees', this.tileset, 0, 0);
      this.sign = this.map.createStaticLayer('Sign', this.tileset, 0, 0);
      
    
      this.player = this.physics.add.sprite(32.3799, 291.419, 'char_sprites', 'enchanted_guy_still_01.png').setScale(4);


      this.sword = this.physics.add.sprite(30, 180, 'char_sprites', 'Enchanted_Sword.png').setScale(2);

      this.npc = this.physics.add.sprite(300, 90, 'npc_sprites', 'enchanted_npc.png');

      this.enemy = this.physics.add.sprite(500, 90, 'enemy_guy', 'enemy.png');

      
      
      this.npcAnimation();
      
       //start npc movement 
      



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
      this.player.body.immovable = true;
      //this.player.setSize(30, 0, 0, 0);
      

      
      this.npc.body.setAllowGravity(false);
      this.npc.body.setSize(20, 20);
      this.npc.enableBody = true; 
      this.npc.body.immovable = true; 


     this.enemy.body.setAllowGravity(false);
     this.enemy.setVelocity(0);
     this.enemy.body.setSize(20,20);
     this.enemy.body.immovable = true; 

     this.physics.add.collider(this.player, this.enemy);
    
    


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



    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    
    this.cursorKeys = this.input.keyboard.createCursorKeys(); 


    let flag = true;

    }  // End of create function


  



   update() {

    this.player.setVelocity(0);
   

    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed);
      this.player.flipX = true;
      


      
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
      this.player.flipX = false;
    }
   
    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-gameSettings.playerSpeed);
      
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
      
    }





    // Display text from NPC when colliding with Player. Two separate questions if you are or are not armed wih the sword. 
    if(this.cursorKeys.left.isDown && this.player.texture.key === 'armed_guy') {
    this.DisplayText = this.npc.body.touching.none ? '' : 'You like that sword breh?';
    this.Text.setText(this.DisplayText);
    this.Text.x = this.npc.body.position.x;
    } 
    else if(this.cursorKeys.left.isDown && this.player.texture.key !== 'armed_guy') {
      this.DisplayText = this.npc.body.touching.none ? '' : 'You gonna grab that sword breh?';
    this.Text.setText(this.DisplayText);
    this.Text.x = this.npc.body.position.x;
    }
    else if (this.cursorKeys.right.isDown) {
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


//If player is interacting with npc on its right side, pause. Pressing right resumes tween
    
      if (this.npc.body.touching.right) {
      this.tween.pause();
      }  if (this.cursorKeys.right.isDown)  {
        this.tween.resume();
      }
      

  


      var distance = Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.player.x, this.player.y);

      //WIP .. checking if players position is greater than 600 .. will trigger function to follow player
      if(this.player.body.position.x > 600) {
        
       this.physics.moveToObject(this.enemy, this.player, 400);
     
       if (distance < 60)  // the lower the number the closer enemy is to player
        {
            //this.enemy.body.reset(this.enemy.x, this.enemy.y);
            this.enemy.body.setVelocity(0);
            this.enemy.body.setVelocityX(0);
            this.enemy.body.setVelocityY(0);
          
        }

      }
    




   } //End update area





//When player hovers over sword, destroy it and change character texture to show Enchanted_Guy_Sword
   pickUpSword(player, sword, weaponBtn) {
    sword.setVisible(false);
    //Changing this to out of Atlas for now in order to check if the sprite has armed texture when pressing F 
    player.setTexture('armed_guy');
    this.player.setSize(0,0);
    this.player.setScale(4);

    this.weaponBtn.setTexture('char_sprites', 'inventory_with_sword.png');
  }


//Make sword sprite visible again at players x and y position 
  resetSwordPos(sword) {
    sword.setVisible(true);
    this.sword.y = this.player.body.position.y;
    this.sword.x = this.player.body.position.x;
    
  }



   
  


//Npc (non enemy) movement tween thing

  npcAnimation () {
    this.tween = this.tweens.add({
    targets: this.npc,
    x: 120,
    delay: 1000,
    //duration: 2000,
    repeat: -1,
    ease: 'Linear',
    loopDelay: 4000,
    repeatDelay: 4000,
    yoyo: true,
    flipX: true
  })
 
}




chasePlayer(player) {

  //logic triggered if player's x position is greater than 700 .. 

  moveToObject(this.enemy, player, 4000);
};
 









  }