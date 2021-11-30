class room3 extends Phaser.Scene {

    constructor() {
        super("room3");
        
        // Put global variable here
    }


    init(data) {
    
    }

    preload() {
        // var map = this.load.tilemapTiledJSON("room2","assets/room2.json");
        var map = this.load.tilemapTiledJSON('room3','room3.json')
        this.load.image("itemIMG", "item.png");


      // // characters
      this.load.atlas("girl", "player.png", "player.json");
        

    }

    create() {
        console.log("*** room3 scene");

        var map = this.make.tilemap({key:'room3'});

        var tileset1= map.addTilesetImage('item','itemIMG');

    let tilesArray = [tileset1];

    this.groundLayer = map.createLayer('groundLayer',tilesArray,0,0)
    this.cowLayer = map.createLayer('cowLayer',tilesArray,0,0)
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

//   //////////////////
this.player = this.physics.add.sprite(45, 203, 'girl').setScale(1.5)
  
  // enable
  window.player = this.player;

  this.player.setCollideWorldBounds(true); // don't go out of the this.map

  // this.treeLayer.setCollisionByExclusion(-1, true);
  // this.cowLayer.setCollisionByExclusion(-1, true);
  // this.fenceLayer.setCollisionByExclusion(-1, true);

  // this.physics.add.collider(this.player,this.treeLayer);
  // this.physics.add.collider(this.player,this.cowLayer);
  // this.physics.add.collider(this.player,this.fenceLayer);
  


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
            this.player.y < 263
          ) {
            this.gameScene();
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
        gameScene(player, tile) {
          console.log("gameScene function");
          this.scene.start('gameScene')
        }
       
    

    

}