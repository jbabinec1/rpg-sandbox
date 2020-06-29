class LoadScene extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
  
    preload(){


      this.load.image("rpgMap", "tiles/RPG Nature Tileset.png");
      
      this.load.image('player', 'assets/star.png',
      { frameWidth: 32, frameHeight: 48 });

      this.load.image('item_slot', 'assets/inventory.png', {frameWidth: 16, frameHeight: 16});

      this.load.image('armed_guy', 'assets/Enchanted_Guy_Sword.png', {frameWidth: 16, frameHeight: 16});


      this.load.atlas({
        key: 'char_sprites',
        textureURL: 'assets/enchanted_characterJr.png',
        atlasURL: 'assets/enchanted_characterJr.json'
      })

      
      this.load.atlas({
        key: 'npc_sprites',
        textureURL: 'assets/enchanted_npc.png',
        atlasURL: 'assets/enchanted_npc.json'
      }) 


      this.load.tilemapTiledJSON('map', 'tiles/rpgGame.json' )


    }



  
    create() {


      this.add.text(20, 20, "Loading game...");
      this.scene.start("playGame");

    
   
    
    

    



    }
  }