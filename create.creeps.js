var createCreeps = {

    run: function() {

        if(Game.spawns['Spawn1'].room.controller.level<2){
            console.log('Game.rooms.controller: ' + Game.spawns['Spawn1'].room.controller.level);
            var minNumberOfHarvesters       = 5;
            var minNumberOfUpgraders        = 0;
            var minNumberOfBuilders         = 0;
            var minNumberOfSoldiers         = 0;
            var minNumberOfMaintenancers    = 0;
            var minNumberOfMiners           = 0;
        }else{
            var minNumberOfHarvesters       = 5;
            var minNumberOfUpgraders        = 5;
            var minNumberOfBuilders         = 5;
            var minNumberOfSoldiers         = 0;
            var minNumberOfMaintenancers    = 2;
            var minNumberOfMiners           = 0;
        }
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    
//    if(harvesters.length >= minNumberOfHarvesters && Game.spawns['Spawn1'].room.controller.level < 2){
//        console.log('we are here.');
//        for(var name in Memory.creeps) {
//            Game.creeps[name].memory.role = 'upgrader';
//            console.log("change harvesters to upgraders");
//        }
//    }
    console.log('Game.spawns[Spawn1].room.energyCapacityAvailable: '+ Game.spawns['Spawn1'].room.energyCapacityAvailable);
    
    if(harvesters.length < minNumberOfHarvesters) {
        var newName = 'Crup_Harvester_' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        //Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}});
        if(300 <= Game.spawns['Spawn1'].room.energyCapacityAvailable < 400){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}}); //300
        }else if (400 <= Game.spawns['Spawn1'].room.energyCapacityAvailable < 500){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}}); //400
        }else if (500 <= Game.spawns['Spawn1'].room.energyCapacityAvailable <= 1000){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}}); //500
        }
        minNumberOfUpgraders        = 0;
        minNumberOfBuilders         = 0;
        minNumberOfSoldiers         = 0;
        minNumberOfMaintenancers    = 0;
        minNumberOfMiners           = 0;
    }
    
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgrader: ' + upgrader.length);

    if(upgrader.length < minNumberOfUpgraders) {
        var newName = 'Crup_Upgrader_' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        if(300 <= Game.spawns['Spawn1'].room.energyCapacityAvailable < 400){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'upgrader'}}); //300
        }else if (400 <= Game.spawns['Spawn1'].room.energyCapacityAvailable < 500){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'upgrader'}}); //400
        }else if (500 <= Game.spawns['Spawn1'].room.energyCapacityAvailable <= 1000){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'upgrader'}}); //500
        }
        minNumberOfBuilders         = 0;
        minNumberOfSoldiers         = 0;
        minNumberOfMaintenancers    = 0;
        minNumberOfMiners           = 0;
    }
    
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('builder: ' + builder.length);

    if(builder.length < minNumberOfBuilders) {
        var newName = 'Crup_Builder_' + Game.time;
        console.log('Spawning new builder: ' + newName);
        if(300 <= Game.spawns['Spawn1'].room.energyCapacityAvailable < 400){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'builder'}}); //300
        }else if (400 <= Game.spawns['Spawn1'].room.energyCapacityAvailable < 500){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'builder'}}); //400
        }else if (500 <= Game.spawns['Spawn1'].room.energyCapacityAvailable <= 1000){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'builder'}}); //500
        }
    }
    
    var soldier = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
    console.log('soldier: ' + soldier.length);

    if(soldier.length < minNumberOfSoldiers) {
        var newName = 'Crup_Soldier_' + Game.time;
        console.log('Spawning new soldier: ' + newName);
        if(300 <= Game.spawns['Spawn1'].room.energyCapacityAvailable < 400){
            Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,CARRY,MOVE], newName,{memory: {role: 'soldier'}}); //300
        }else if (400 <= Game.spawns['Spawn1'].room.energyCapacityAvailable < 500){
            Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,ATTACK,CARRY,MOVE], newName,{memory: {role: 'soldier'}}); //400
        }else if (500 <= Game.spawns['Spawn1'].room.energyCapacityAvailable <= 1000){
            Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,ATTACK,ATTACK,CARRY,MOVE], newName,{memory: {role: 'soldier'}}); //500
        }
    }
    
    var maintenance = _.filter(Game.creeps, (creep) => creep.memory.role == 'maintenance');
    console.log('maintenance: ' + maintenance.length);

    if(maintenance.length < minNumberOfMaintenancers) {
        var newName = 'Crup_Maintenance_' + Game.time;
        console.log('Spawning new maintenance: ' + newName);
        if(300 <= Game.spawns['Spawn1'].room.energyCapacityAvailable < 400){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'maintenance'}}); //300
        }else if (400 <= Game.spawns['Spawn1'].room.energyCapacityAvailable < 500){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'maintenance'}}); //400
        }else if (500 <= Game.spawns['Spawn1'].room.energyCapacityAvailable <= 1000){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'maintenance'}}); //500
        }
    }

    var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    console.log('miner: ' + miner.length);

    if(miner.length < minNumberOfMiners) {
        var newName = 'Crup_Miner_' + Game.time;
        console.log('Spawning new miner: ' + newName);
        if(300 <= Game.spawns['Spawn1'].room.energyCapacityAvailable < 400){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE], newName,{memory: {role: 'miner'}});  //250
        }else if (400 <= Game.spawns['Spawn1'].room.energyCapacityAvailable < 500){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,MOVE], newName,{memory: {role: 'miner'}}); //350
        }else if (500 <= Game.spawns['Spawn1'].room.energyCapacityAvailable < 600){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,MOVE], newName,{memory: {role: 'miner'}});   //450
        }else if (Game.spawns['Spawn1'].room.energyCapacityAvailable >= 550){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName,{memory: {role: 'miner'}});   //550
        }
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    }
};

module.exports = createCreeps;