var createStructures = {

    run: function() {
        // create roads and containers to sources
        var goals = _.map(Game.spawns['Spawn1'].room.find(FIND_SOURCES), function(source) {
            return { pos: source.pos, range: 1 };
          });
        //console.log(goals);
        var destinations = PathFinder.search(Game.spawns['Spawn1'].pos,goals);
        
        for(var goal in goals){
            var destinations = PathFinder.search(Game.spawns['Spawn1'].pos,goals[goal]);
            //console.log('myDestinations: '+ destinations.path[destinations.path.length-1]);
            //console.log(Game.spawns['Spawn1'].room.createConstructionSite(destinations.path[destinations.path.length-1],STRUCTURE_CONTAINER));
            Game.spawns['Spawn1'].room.createConstructionSite(destinations.path[destinations.path.length-1],STRUCTURE_CONTAINER);
            destinations.path.pop();
            for(var destination in destinations.path){    
               //console.log(Game.spawns['Spawn1'].room.createConstructionSite(destinations.path[destination],STRUCTURE_ROAD));
               Game.spawns['Spawn1'].room.createConstructionSite(destinations.path[destination],STRUCTURE_ROAD);
            }
        }

        // create roads to controller
        var destinations = PathFinder.search(Game.spawns['Spawn1'].pos, Game.spawns['Spawn1'].room.controller.pos);
        //for(var pos in destinations.path){
        //    console.log(destinations.path[pos]);
        //}
        destinations.path.pop();
        for(var destination in destinations.path){    
           //console.log(Game.spawns['Spawn1'].room.createConstructionSite(destinations.path[destination],STRUCTURE_ROAD));
           Game.spawns['Spawn1'].room.createConstructionSite(destinations.path[destination],STRUCTURE_ROAD);
        }

        // place tower next to spawn
        //console.log(Game.spawns['Spawn1'].room.createConstructionSite((Game.spawns['Spawn1'].pos.x + 10), Game.spawns['Spawn1'].pos.y, STRUCTURE_TOWER));
        //console.log(Game.spawns['Spawn1'].pos);

    }
};

module.exports = createStructures;