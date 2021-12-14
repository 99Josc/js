class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }

    

    preload () {

        // this.load.audio('bgm','assets/bgm.mp3');
        // this.load.audio("pop","assets/pop.mp3");
        this.load.image('bgimg','assets/bgimg.png');

    }

    create () {

        console.log("preloadScene")

        // this.music = this.sound
        // .add("bgm",{
        //     loop : true,
        // })
        // .setVolume(0.2);

        // this.music.play();

        this.add.image(0, 0, 'bgimg').setOrigin(0, 0).setScale(1.6);

        this.add.text(110,380, '-press SpaceBar to continue-', 
            { font: '24px Courier', fill: '#000000' });

            this.add.text(70,460, 'RULES:go to each stall to collect food for your mom', 
            { font: '16px Courier', fill: '#000000' });

            this.add.text(127,475, 'use arrow key to move your character', 
            { font: '16px Courier', fill: '#000000' });

            this.add.text(110,510, 'once collected all food go back to the house', 
            { font: '16px Courier', fill: '#000000' });



        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            let playerPos = {};
          playerPos.x = 370;
          playerPos.y = 166;
          playerPos.dir ="girl"
            this.scene.start("gameScene",{playerPos:playerPos});
            }, this );

            

    }

}
