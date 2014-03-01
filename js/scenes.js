// Create player scene
Q.scene("level1", function(stage) {
  var fmod = 4;
  var frenzied_enemies = false;

  Q.stageTMX("level1.tmx", stage);
  stage.add("viewport").follow(Q("Player").first());

  // I can't listen to this anymore. I need silence.
  // Q.audio.play('test.wav', { loop: true });

  stage.on("enemy_killed", function(){ 
    Q.state.inc("killed", 1);
    Q.state.dec("alive", 1);
    frenzied_enemies = false;

    // Every few enemies killed, let's trigger a frenzy.
    if(!frenzied_enemies && Q.state.get("killed") % fmod === 0){
      Q("Enemy").trigger("frenzy"); 
      fmod *= 2;
      frenzied_enemies = true;
    }

    // Check if game over.
    if(Q("Enemy").length <= 1){
      console.log("Level beaten. Resetting."); 
      Q.state.inc("level", 1);
      Q.stageScene("level1", 0);
    }
  });
});
