class room3 extends Phaser.Scene {

    constructor() {
        super("room3");
        
        // Put global variable here
    }


    init(data) {
     this.playerPos = data.PlayerPos;
    }

    preload() {
        // var map = this.load.tilemapTiledJSON("room1","assets/room1.json");
        var map = this.load.tilemapTiledJSON('room3','assets/room3.json')
        this.load.image("itemIMG", "assets/item.png");

        this.load.image("honey", "assets/honey.png");

      // // characters
      this.load.atlas("girl", "assets/player.png", "assets/player.json");

      this.load.spritesheet("bee1","assets/bee.png",{
        frameWidth: 25,
        frameHeight: 25,
      });

      this.load.audio("pop","assets/pop.mp3");
      this.load.audio("game","assets/game.mp3");

    }

    create() {
        console.log("*** room3 scene");

        this.music = this.sound
        .add("game",{
            loop : true,
        })
        .setVolume(0.4);
        this.game = this.music;

        this.music.play();


        this.popsnd = this.sound.add('pop');

        var map = this.make.tilemap({key:'room3'});

        var tileset1= map.addTilesetImage('item','itemIMG');

    let tilesArray = [tileset1];

    this.groundLayer = map.createLayer('groundLayer',tilesArray,0,0)
    this.honeyLayer = map.createLayer('honeyLayer',tilesArray,0,0)
    // this.beesLayer = map.createLayer('beesLayer',tilesArray,0,0)

    this.anims.create({ 
      key: 'left', 
     frames: [ 
         { key: 'girl', frame: 'left1' },
         { key: 'girl', frame: 'left2' }, 
         { key: 'girl', frame: 'left3' },   
       
     ],
             frameRate: 10,
             repeat: -1
         });

     this.anims.create({ 
      key: 'right', 
     frames: [ 
         { key: 'girl', frame: 'right1' },
         { key: 'girl', frame: 'right2' }, 
         { key: 'girl', frame: 'right3' },         
             
     ],
             frameRate: 10,
             repeat: -1
         });

     this.anims.create({ 
      key: 'front', 
     frames: [ 
         { key: 'girl', frame: 'front1' },
         { key: 'girl', frame: 'front2' }, 
         { key: 'girl', frame: 'front3' },                
         
             
     ],
             frameRate: 10,
             repeat: -1
    });

     this.anims.create({ 
      key: 'back', 
     frames: [ 
         { key: 'girl', frame: 'back1' },
         { key: 'girl', frame: 'back2' }, 
         { key: 'girl', frame: 'back3' },        
         
             
     ],
             frameRate: 10,
             repeat: -1
         });

     
  this.physics.world.bounds.width = this.groundLayer.width*2;
  this.physics.world.bounds.height = this.groundLayer.height*2;

  /////////////////////////////////////////
  this.anims.create({
    key:"beeAnims",
    frames:this.anims.generateFrameNumbers("bee1",{
      start:0,
      end: 1,
    }),
      frameRate: 4,
      repeat: -1,
  });



//   //////////////////
this.player = this.physics.add.sprite(46, 196, 'girl').setScale(1.5)
  
  // enable
  window.player = this.player;

  this.player.setCollideWorldBounds(true); // don't go out of the this.map

  // this.beesLayer.setCollisionByExclusion(-1, true);
  this.honeyLayer.setCollisionByExclusion(-1, true);

  // this.physics.add.collider(this.player,this.beesLayer);
  this.physics.add.collider(this.player,this.honeyLayer);


  //  Input Events
  this.cursors = this.input.keyboard.createCursorKeys();
 
  // make the camera follow the player
  this.cameras.main.startFollow(this.player);
        
  this.enemybee1 = this.physics.add
  .sprite(100,230,"bee1")
  .play("beeAnims")
  .setScale(1)
  .setSize(12,12);
  this.enemybee2 = this.physics.add
  .sprite(300,180,"bee1")
  .play("beeAnims")
  .setScale(1)
  .setSize(12,12);
  this.enemybee3 = this.physics.add
  .sprite(170,320,"bee1")
  .play("beeAnims")
  .setScale(1)
  .setSize(12,12);

this.physics.add.overlap(
  this.player,
  [this.enemybee1,this.enemybee2,this.enemybee3],
  this.collectBee,
  null,this
);



// bees icon
this.honeyIcon1 = this.add
.sprite(50,100,"honey")
.setScale(1)
.setScrollFactor(0)
.setVisible(false);
this.honeyIcon2 = this.add
.sprite(80,100,"honey")
.setScale(1)
.setScrollFactor(0)
.setVisible(false);
this.honeyIcon3 = this.add
.sprite(110,100,"honey")
.setScale(1)
.setScrollFactor(0)
.setVisible(false);

this.beeScore = this.add
.text(30,55,"Honey Collect:",{
fontSize: "16px",
fill: "ffffff",
})
.setScrollFactor(0);


    }
    
    /////////////////////////// end of create////////////////////////////

    update() {
        if (
            this.player.x > 8 &&
            this.player.x < 13 &&
            this.player.y > 156 &&
            this.player.y < 240
          ) {
            this.divider3();
          }
      
      
      
          if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-200);
            this.player.anims.play("left", true); // walk left
          } 
          else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(200);
            this.player.anims.play("right", true);
          } else if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-200);
            this.player.anims.play("back", true);
            //console.log('front');
          } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(200);
            this.player.anims.play("front", true);
            //console.log('back');
          } else {
            this.player.anims.stop();
            this.player.body.setVelocity(0, 0);
          }
        } 
        
        
        ////////////////////// end of update //////////////////////////////
      


        // Function to jump back to gamescene
        divider3(player, title) {
          console.log("divider3 function");
          let playerPos = {};
          playerPos.x = 373;
          playerPos.y = 200;
          playerPos.dir ="girl"
          this.game.loop = false;
          this.game.stop();
          this.scene.start('divider3',{playerPos:playerPos})
        }


        // function to collect honey
        collectBee(player,bee){
         console.log("collectBee");

         this.popsnd.play();

          window.bee = window.bee + 1;
          console.log("bee1", window.bee);
          bee.disableBody(true,true);

    // this.beeScore.setText("honey : " + window.bee);

          if (window.bee == 0){
            this.honeyIcon1.setVisible(false);
            this.honeyIcon2.setVisible(false);
            this.honeyIcon3.setVisible(false);
          }else if (window.bee == 1 ){
            this.honeyIcon1.setVisible(true);
          }else if (window.bee == 2){
            this.honeyIcon1.setVisible(true);
            this.honeyIcon2.setVisible(true);
          }else if (window.bee == 3){
            this.honeyIcon1.setVisible(true);
            this.honeyIcon2.setVisible(true);
            this.honeyIcon3.setVisible(true);

        }
    }
}