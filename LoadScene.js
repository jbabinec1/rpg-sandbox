class LoadScene extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
  
    preload(){


      this.load.image("rpgMap", "tiles/RPG Nature Tileset.png");
      
      this.load.image('player', 'assets/star.png',
      { frameWidth: 32, frameHeight: 48 });


      this.load.atlas({
        key: 'char_sprites',
        textureURL: 'assets/enchanted_character.png',
        atlasURL: 'assets/enchanted_character.json'
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