class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }

    preload () {

        

    }

    create () {

        console.log("preloadScene")

        


        this.add.text(140,120, 'Food Hunt', 
        { font: '62px Futura', fill: '#AE8D67' });

        this.add.text(110,420, '-press SpaceBar to continue-', 
            { font: '24px Courier', fill: '#ffffff' });

            this.add.text(130,460, 'RULES:go to each stall to collect food', 
            { font: '16px Courier', fill: '#000000' });

            this.add.text(130,475, 'use arrow key to move your character', 
            { font: '16px Courier', fill: '#000000' });


        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("gameScene");
            }, this );

    }

}