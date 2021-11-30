var game;
window.onload=function()
{

var config = {
    type: Phaser.AUTO,
    
    width: 32 * 20,
    height: 32 * 20,
    physics: {
        default: "arcade",
        arcade: {
            gravity: false,
            debug: true,
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    
    pixelArt: true,
    backgroundColor: '#F7CE9E',
    scene: [preloadScene, gameScene, room1, room2, room3]
};

 game = new Phaser.Game(config);
}