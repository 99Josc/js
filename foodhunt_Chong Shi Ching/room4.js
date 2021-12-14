class room4 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'room4' });
    }

    preload () {
  
        this.load.audio('end','assets/end.mp3');


        this.load.image('endimg','assets/end.png');
        this.load.image("milk", "assets/milk.png");
        this.load.image("honey", "assets/honey.png");


        this.load.spritesheet("bee1","assets/bee.png",{
            frameWidth: 25,
            frameHeight: 25,
          });

        this.load.spritesheet("burger1","assets/burger.png",{
            frameWidth: 20,
            frameHeight: 18.5,
          });

          this.load.spritesheet("cow1","assets/cow.png",{
            frameWidth: 24,
            frameHeight: 23,
          });
    
          

    }

    create () {

        console.log("room4")

        this.music = this.sound
        .add("end",{
            loop : true,
        })
        .setVolume(0.2);
        this.end = this.music;
        
        this.music.play();

        this.add.image(0, 0, 'endimg').setOrigin(0, 0).setScale(1.6);
        this.add.image(530, 140, 'milk').setOrigin(0, 0).setScale(1.6);
        this.add.image(500, 290, 'milk').setOrigin(0, 0).setScale(1);
        // this.add.image(0, 0, 'endimg').setOrigin(0, 0).setScale(1.6);
        // this.add.image(0, 0, 'endimg').setOrigin(0, 0).setScale(1.6);

        this.add.text(100,180, 'You have win the game !!', 
        { font: '38px Futura', fill: '#000000' });

        this.add.text(115,240, '-press SpaceBar to replay game-', 
            { font: '20px Courier', fill: '#000000' });

        // cow
        this.anims.create({
            key:"cowAnims",
            frames:this.anims.generateFrameNumbers("cow1",{
              start:0,
              end: 1,
            }),
              frameRate: 3,
              repeat: -1,
          });

          this.enemycow1 = this.physics.add
            .sprite(480,140,"cow1")
            .play("cowAnims")
            .setScale(4)
            .setSize(14,14);

          this.enemycow1 = this.physics.add
            .sprite(550,300,"cow1")
            .play("cowAnims")
            .setScale(2)
            .setSize(14,14);

            
        //  bee
        this.anims.create({
            key:"beeAnims",
            frames:this.anims.generateFrameNumbers("bee1",{
              start:0,
              end: 1,
            }),
              frameRate: 4,
              repeat: -1,
          });

          this.enemybee2 = this.physics.add
          .sprite(300,180,"bee1")
          .play("beeAnims")
          .setScale(1)
          .setSize(12,12);
          
          this.enemybee1 = this.physics.add
          .sprite(100,230,"bee1")
          .play("beeAnims")
          .setScale(1)
          .setSize(12,12);

          this.enemybee3 = this.physics.add
          .sprite(170,320,"bee1")
          .play("beeAnims")
          .setScale(1)
          .setSize(12,12);

        //   burger
        this.anims.create({
            key:"burgerAnims",
            frames:this.anims.generateFrameNumbers("burger1",{
              start:0,
              end: 1,
            }),
              frameRate: 5,
              repeat: -1,
          });

          this.enemyburger = this.physics.add
            .sprite(50,540,"burger1")
            .play("burgerAnims")
            .setScale(1)
            .setSize(12,12);

            this.enemyburger = this.physics.add
            .sprite(80,570,"burger1")
            .play("burgerAnims")
            .setScale(1)
            .setSize(12,12);
            
            this.enemyburger = this.physics.add
            .sprite(110,600,"burger1")
            .play("burgerAnims")
            .setScale(1)
            .setSize(12,12);


    // space
        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("preloadScene");
            this.end.loop = false;
            this.end.stop();
            }, this );




    }

}