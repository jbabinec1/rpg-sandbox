var gameSettings = {
  playerSpeed: 200
}
  
  var config =    {
      width: 800,
      height: 600,
      //backgroundColor: 0x000000,
      scene: [LoadScene, Scene2],
      pixelArt: true,
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
          gravity: { y: 300 }
        }
      }
    }
    
    var game = new Phaser.Game(config);