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
            debug: false,
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    
    pixelArt: true,
    backgroundColor: '#F7CE9E',
    scene: [preloadScene, gameScene, room1, divider1, room2, divider2, room3, divider3, room4]
};

 game = new Phaser.Game(config);
 window.bee = 0
 window.burger = 0
 window.cow = 0
 
}

