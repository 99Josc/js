class gameScene extends Phaser.Scene {
  constructor ()
  {
      super({ key: 'gameScene' });
  }

  preload() {

      var map = this.load.tilemapTiledJSON('world','worldmap.json')

       this.load.image('groundimg', 'ground.png')
       this.load.image('houseimg', 'house.png')
       this.load.image('tile1img', 'tile1.png')

      // // characters
      this.load.atlas('girl', 'player.png', 'player.json');




  } // end of preload //

  create (){

  console.log("world map")

  var map = this.make.tilemap({key:'world'});

  var tileset1= map.addTilesetImage('ground','groundimg');
  var tileset2= map.addTilesetImage('house','houseimg');
  var tileset3= map.addTilesetImage('tile1','tile1img');


  let tilesArray = [tileset1,tileset2,tileset3]

  this.groundLayer = map.createLayer('groundLayer',tilesArray,0,0)
  this.roadLayer = map.createLayer('roadLayer',tilesArray,0,0)
  this.fenceLayer = map.createLayer('fenceLayer',tilesArray,0,0)
  this.buildingLayer = map.createLayer('buildingLayer',tilesArray,0,0)
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

  // this.physics.world.bounds.width = this.roadLayer.width*2;
  // this.physics.world.bounds.height = this.roadLayer.height*2;
  
  // this.physics.world.bounds.width = this.fenceLayer.width*2;
  // this.physics.world.bounds.height = this.fenceLayer.height*2;

  // this.physics.world.bounds.width = this.buildingLayer.width*2;
  // this.physics.world.bounds.height = this.buildingLayer.height*2;

  // this.physics.world.bounds.width = this.treeLayer.width*2;
  // this.physics.world.bounds.height = this.treeLayer.height*2;



  // load player into physics, where it starts when it is in this map
  this.player = this.physics.add.sprite(180, 420, 'girl').setScale(1)
  
  // enable
  window.player = this.player;

  this.player.setCollideWorldBounds(true); // don't go out of the this.map

  this.treeLayer.setCollisionByExclusion(-1, true);
  this.buildingLayer.setCollisionByExclusion(-1, true);
  this.fenceLayer.setCollisionByExclusion(-1, true);
  // this.groundLayer.setCollisionByExclusion(-1, true);

  this.physics.add.collider(this.player,this.treeLayer);
  this.physics.add.collider(this.player,this.buildingLayer);
  this.physics.add.collider(this.player,this.fenceLayer);
  this.physics.add.collider(this.player,this.groundLayer);


  //  Input Events
  this.cursors = this.input.keyboard.createCursorKeys();
 
  // make the camera follow the player
  this.cameras.main.startFollow(this.player);


  } // end of create //

  update() {
// room1
    if (
      this.player.x > 75 &&
      this.player.x < 115 &&
      this.player.y > 78 &&
      this.player.y < 80
    ) {
      this.room1();
    }

    // room2
    if (
      this.player.x > 308 &&
      this.player.x < 343 &&
      this.player.y > 78 &&
      this.player.y < 80
    ) {
      this.room2();
    }

    // room3
    if (
      this.player.x > 488 &&
      this.player.x < 528 &&
      this.player.y > 78 &&
      this.player.y < 80
    ) {
      this.room3();
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

//   // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start('room1');
  }

  room2(player, tile) {
    console.log("room2 function");
    this.scene.start('room2');
  }

  room3(player, tile) {
    console.log("room3 function");
    this.scene.start('room3');
  }

} 

//////////// end of class world ////////////////////////
