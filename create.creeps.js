var createCreeps = {

    run: function() {

    if(creep.room.controller < 2){
        var minNumberOfHarvesters       = 5;
        var minNumberOfUpgraders        = 0;
        var minNumberOfBuilders         = 0;
        var minNumberOfSoldiers         = 0;
        var minNumberOfMaintenancers    = 0;
        var minNumberOfMiners           = 0;
    }else{
        var minNumberOfHarvesters       = 3;
        var minNumberOfUpgraders        = 10;
        var minNumberOfBuilders         = 3;
        var minNumberOfSoldiers         = 0;
        var minNumberOfMaintenancers    = 3;
        var minNumberOfMiners           = 2;
    }
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    if(Memory.creeps.lenght >= minNumberOfHarvesters && creep.room.controller < 2){
        for(var name in Memory.creeps) {
            Game.creep[name].memory.role = 'upgrader';
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < minNumberOfHarvesters) {
        var newName = 'Crup_Harvester_' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        if(Game.spawns['Spawn1'].room.energyCapacityAvailable <= 300){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}});
        }else if (300 < Game.spawns['Spawn1'].room.energyCapacityAvailable <= 400){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}});
        }else if (400 < Game.spawns['Spawn1'].room.energyCapacityAvailable <= 1000){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}});
        }
        minNumberOfUpgraders        = 0;
        minNumberOfBuilders         = 0;
        minNumberOfSoldiers         = 0;
        minNumberOfMaintenancers    = 0;
        minNumberOfMiners           = 0;
    }
    
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Harvesters: ' + harvesters.length);

    if(upgrader.length < minNumberOfUpgraders) {
        var newName = 'Crup_Upgrader_' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        if(Game.spawns['Spawn1'].room.energyCapacityAvailable <= 300){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'upgrader'}});
        }else if (300 < Game.spawns['Spawn1'].room.energyCapacityAvailable <= 400){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'upgrader'}});
        }else if (400 < Game.spawns['Spawn1'].room.energyCapacityAvailable <= 1000){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'upgrader'}});
        }
    }else if (upgrader.length < 1 ){
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
        if(Game.spawns['Spawn1'].room.energyCapacityAvailable <= 300){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'builder'}});
        }else if (300 < Game.spawns['Spawn1'].room.energyCapacityAvailable <= 400){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'builder'}});
        }else if (400 < Game.spawns['Spawn1'].room.energyCapacityAvailable <= 1000){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'builder'}});
        }
    }
    
    var soldier = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
    console.log('soldier: ' + soldier.length);

    if(soldier.length < minNumberOfSoldiers) {
        var newName = 'Crup_Soldier_' + Game.time;
        console.log('Spawning new soldier: ' + newName);
        if(Game.spawns['Spawn1'].room.energyCapacityAvailable <= 300){
            Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,CARRY,MOVE], newName,{memory: {role: 'soldier'}});
        }else if (300 < Game.spawns['Spawn1'].room.energyCapacityAvailable <= 400){
            Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,ATTACK,CARRY,MOVE], newName,{memory: {role: 'soldier'}});
        }else if (400 < Game.spawns['Spawn1'].room.energyCapacityAvailable <= 1000){
            Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,ATTACK,ATTACK,CARRY,MOVE], newName,{memory: {role: 'soldier'}});
        }
    }
    
    var maintenance = _.filter(Game.creeps, (creep) => creep.memory.role == 'maintenance');
    console.log('maintenance: ' + maintenance.length);

    if(maintenance.length < minNumberOfMaintenancers) {
        var newName = 'Crup_Maintenance_' + Game.time;
        console.log('Spawning new maintenance: ' + newName);
        if(Game.spawns['Spawn1'].room.energyCapacityAvailable <= 300){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'maintenance'}});
        }else if (300 < Game.spawns['Spawn1'].room.energyCapacityAvailable <= 400){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'maintenance'}});
        }else if (400 < Game.spawns['Spawn1'].room.energyCapacityAvailable <= 1000){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'maintenance'}});
        }
    }

    var maintenance = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    console.log('miner: ' + maintenance.length);

    if(maintenance.length < minNumberOfMiners) {
        var newName = 'Crup_Miner_' + Game.time;
        console.log('Spawning new miner: ' + newName);
        if(Game.spawns['Spawn1'].room.energyCapacityAvailable <= 300){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE], newName,{memory: {role: 'miner'}});  //250
        }else if (300 < Game.spawns['Spawn1'].room.energyCapacityAvailable <= 400){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,MOVE], newName,{memory: {role: 'miner'}}); //350
        }else if (400 < Game.spawns['Spawn1'].room.energyCapacityAvailable <= 500){
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