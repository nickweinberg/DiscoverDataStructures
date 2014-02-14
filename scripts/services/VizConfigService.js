// This service allows multiple visualizations to use the same configuration
// values without relying on global variables. This particular service also
// enforces privacy of the _vizConfig variable. Controllers don't have write
// access to the config values.

app.service('VizConfigService', function () {
  // TODO: perhaps create separate config objects for controllers that draw
  // circles vs controllers that draw trees/links, etc.

  var _vizConfig = {
    r            : 25,
    xSpawnStart  : 200,
    xPosStart    : 15,
    xPosIncrement: 35,
    ySpawnStart  : 50,
    yEnd         : 150,
    delay        : 200,
    duration     : 600
  };

  // _cloneConfig performs a SHALLOW copy of any object, but the purpose is to
  // clone the config so that controllers get a copy of the config. Controllers
  // can't mutate the original, canonical config object. They can only mutate
  // their own copy.
  var _cloneConfig = function(configObject){
    var clone = {};
    for(var key in configObject){
      if(configObject.hasOwnProperty(key)){
        clone[key] = configObject[key];
      }
    }
    return clone;
  };

  this.getConfig = function(){
    return _cloneConfig(_vizConfig);
  };
});
