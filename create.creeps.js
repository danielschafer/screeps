var createCreeps = {

    run: function() {
    var minNumberOfHarvesters       = 3;
    var minNumberOfUpgraders        = 10;
    var minNumberOfBuilders         = 3;
    var minNumberOfSoldiers         = 0;
    var minNumberOfMaintenancers    = 3;
    
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < minNumberOfHarvesters) {
        var newName = 'Crup_Harvester_' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
        minNumberOfUpgraders        = 0;
        minNumberOfBuilders         = 0;
        minNumberOfSoldiers         = 0;
        minNumberOfMaintenancers    = 0;
    }
    
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Harvesters: ' + harvesters.length);

    if(upgrader.length < minNumberOfUpgraders) {
        var newName = 'Crup_Upgrader_' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
    }else if (upgrader.length < 1 ){
        minNumberOfBuilders         = 0;
        minNumberOfSoldiers         = 0;
        minNumberOfMaintenancers    = 0;
    }
    
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('builder: ' + builder.length);

    if(builder.length < minNumberOfBuilders) {
        var newName = 'Crup_Builder_' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'builder'}});
    }
    
    var soldier = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
    console.log('soldier: ' + soldier.length);

    if(soldier.length < minNumberOfSoldiers) {
        var newName = 'Crup_Soldier_' + Game.time;
        console.log('Spawning new soldier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,MOVE], newName, {memory: {role: 'soldier'}});
    }
    
    var maintenance = _.filter(Game.creeps, (creep) => creep.memory.role == 'maintenance');
    console.log('maintenance: ' + maintenance.length);

    if(maintenance.length < minNumberOfMaintenancers) {
        var newName = 'Crup_Maintenance_' + Game.time;
        console.log('Spawning new maintenance: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'maintenance'}});
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