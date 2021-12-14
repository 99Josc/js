class room1 extends Phaser.Scene {

  constructor() {
      super("room1");
      
      // Put global variable here
  }


  init(data) {
    this.playerPos = data.playerPos
  }

  preload() {
      // var map = this.load.tilemapTiledJSON("room2","assets/room2.json");
      var map = this.load.tilemapTiledJSON('room1','assets/room1.json')
      this.load.image("itemIMG", "assets/item.png");

      this.load.image("milk", "assets/milk.png");

    // // characters
    this.load.atlas("girl", "assets/player.png", "assets/player.json");
      
    this.load.spritesheet("cow1","assets/cow.png",{
      frameWidth: 24,
      frameHeight: 23,
    });

    this.load.audio("pop","assets/pop.mp3");
    this.load.audio("game","assets/game.mp3");

  }

  create() {
      console.log("*** room1 scene");

      this.music = this.sound
      .add("game",{
          loop : true,
      })
      .setVolume(0.4);
      this.game = this.music;

      this.music.play();


      this.popsnd = this.sound.add('pop');

      var map = this.make.tilemap({key:'room1'});

      var tileset1= map.addTilesetImage('item','itemIMG');

  let tilesArray = [tileset1];

  this.groundLayer = map.createLayer('groundLayer',tilesArray,0,0)
  // this.cowLayer = map.createLayer('cowLayer',tilesArray,0,0)
  this.fenceLayer = map.createLayer('fenceLayer',tilesArray,0,0)
  this.treeLayer = map.createLayer('treeLayer',tilesArray,0,0)

this.anims.create({ 
    key: 'left', 
   frames: [ 
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
    key: 'back', 
   frames: [ 
       { key: 'girl', frame: 'back1' },
       { key: 'girl', frame: 'back2' }, 
       { key: 'girl', frame: 'back3' },                
       
           
   ],
           frameRate: 10,
           repeat: -1
       });

   
this.physics.world.bounds.width = this.groundLayer.width*2;
this.physics.world.bounds.height = this.groundLayer.height*2;

// cow create
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
.sprite(100,230,"cow1")
.play("cowAnims")
.setScale(2.5)
.setSize(14,14);
this.enemycow2 = this.physics.add
.sprite(300,160,"cow1")
.play("cowAnims")
.setScale(2.5)
.setSize(14,14);
this.enemycow3 = this.physics.add
.sprite(190,320,"cow1")
.play("cowAnims")
.setScale(2.5)
.setSize(14,14);


// milk icon
this.milkIcon1 = this.add
.sprite(50,100,"milk")
.setScale(1)
.setScrollFactor(0)
.setVisible(false);
this.milkIcon2 = this.add
.sprite(80,100,"milk")
.setScale(1)
.setScrollFactor(0)
.setVisible(false);
this.milkIcon3 = this.add
.sprite(110,100,"milk")
.setScale(1)
.setScrollFactor(0)
.setVisible(false);

this.cowScore = this.add
.text(30,55,"Milk Collect:",{
fontSize: "16px",
fill: "ffffff",
})
.setScrollFactor(0);



//   //////////////////
this.player = this.physics.add.sprite(45, 203, 'girl').setScale(1.5)

// enable
window.player = this.player;

this.player.setCollideWorldBounds(true); // don't go out of the this.map

this.treeLayer.setCollisionByExclusion(-1, true);
// this.cowLayer.setCollisionByExclusion(-1, true);
this.fenceLayer.setCollisionByExclusion(-1, true);

this.physics.add.collider(this.player,this.treeLayer);
// this.physics.add.collider(this.player,this.cowLayer);
this.physics.add.collider(this.player,this.fenceLayer);

this.physics.add.overlap(
  this.player,
  [this.enemycow1,this.enemycow2,this.enemycow3],
  this.collectCow,
  null,this
);

//  Input Events
this.cursors = this.input.keyboard.createCursorKeys();

// make the camera follow the player
this.cameras.main.startFollow(this.player);
      
  }
  // end of create

  update() {
      // back to worldmap
      if (
          this.player.x > 12 &&
          this.player.x < 18 &&
          this.player.y > 170 &&
          this.player.y < 265
        ) {
          this.divider1();
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
      } /////////////////// end of update //////////////////////////////
    
      // Function to jump back to gamescene
      divider1(player, title) {
        console.log("divider1 function");
        let playerPos = {};
        playerPos.x = 410;
        playerPos.y = 112;
        playerPos.dir ="girl"
        this.game.loop = false;
        this.game.stop();
        this.scene.start('divider1',{playerPos:playerPos})
      }
     
      // function to collect milk
      collectCow(player,cow){
        console.log("collectCow");

        this.popsnd.play();
        
         window.cow = window.cow + 1;
   console.log("cow1", window.cow);
   cow.disableBody(true,true);

         if (window.cow == 0){
           this.milkIcon1.setVisible(false);
           this.milkIcon2.setVisible(false);
           this.milkIcon3.setVisible(false);
         }else if (window.cow == 1 ){
           this.milkIcon1.setVisible(true);
         }else if (window.cow == 2){
           this.milkIcon1.setVisible(true);
           this.milkIcon2.setVisible(true);
         }else if (window.cow == 3){
           this.milkIcon1.setVisible(true);
           this.milkIcon2.setVisible(true);
           this.milkIcon3.setVisible(true);

       }
   }

  

}