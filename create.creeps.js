var createCreeps = {

    run: function() {

        if(Game.spawns['Spawn1'].room.controller.level<2){
            console.log('Game.rooms.controller: ' + Game.spawns['Spawn1'].room.controller.level);
            var minNumberOfHarvesters       = 2;
            var minNumberOfUpgraders        = 2;
            var minNumberOfBuilders         = 2;
            var minNumberOfSoldiers         = 0;
            var minNumberOfMaintenancers    = 0;
            var minNumberOfLorries          = 0;
            var minNumberOfMiners           = 0;
        }else{
            var minNumberOfHarvesters       = 3;
            var minNumberOfUpgraders        = 2;
            var minNumberOfBuilders         = 3;
            var minNumberOfMaintenancers    = 3;
            var minNumberOfSoldiers         = 0;
            var minNumberOfLorries          = 3;

            var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_TOWER; } });
            if(towers.length > 0){ minNumberOfMaintenancers    = 0; }

            var containers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_CONTAINER; } });
            var minNumberOfMiners           = containers.length;
            if(containers.length == 0){ minNumberOfLorries = 0; }
            //else if (Object.keys(Game.creeps).length > 3){ minNumberOfHarvesters = 0; }
        }
    
        console.log('********************');
        console.log('*** CREEP STATUS ***');
        console.log('********************');
        console.log('EnergyAvailable: '+ Game.spawns['Spawn1'].room.energyAvailable + '/' + + Game.spawns['Spawn1'].room.energyCapacityAvailable);
        console.log('No of creeps: ' + Object.keys(Game.creeps).length + '/' + (minNumberOfHarvesters+minNumberOfUpgraders+minNumberOfBuilders+minNumberOfSoldiers+minNumberOfMaintenancers+minNumberOfLorries+minNumberOfMiners));
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length+'/'+minNumberOfHarvesters);
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgrader: ' + upgrader.length + '/' + minNumberOfUpgraders);
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('builder: ' + builder.length + '/' + minNumberOfBuilders);
        var soldier = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
        console.log('soldier: ' + soldier.length + '/' + minNumberOfSoldiers);
        var maintenance = _.filter(Game.creeps, (creep) => creep.memory.role == 'maintenance');
        console.log('maintenance: ' + maintenance.length + '/' + minNumberOfMaintenancers);
        var lorry = _.filter(Game.creeps, (creep) => creep.memory.role == 'lorry');
        console.log('lorry: ' + lorry.length + '/' + minNumberOfLorries);
        var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        console.log('miner: ' + miner.length + '/' + minNumberOfMiners);

        if(miner.length  == 0){ minNumberOfLorries = 0; }
        

        if(Object.keys(Game.creeps).length == 0){
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], 'Beginner',{memory: {role: 'harvester'}}); //300
        }

        if(Game.spawns['Spawn1'].pos.findClosestByRange(FIND_HOSTILE_CREEPS)) {
            var minNumberOfHarvesters       = 0;
            var minNumberOfUpgraders        = 0;
            var minNumberOfBuilders         = 0;
            var minNumberOfSoldiers         = 5;
            var minNumberOfMaintenancers    = 0;
            var minNumberOfLorries          = 0;
            var minNumberOfMiners           = 0;
        }
        
        if(harvesters.length < minNumberOfHarvesters) {
            var newName = 'Crup_Harvester_' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            //Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}});
            if(300 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 400){
                    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}}); //300
            }else if (400 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 500){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}}); //400
            }else if (500 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 600){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}}); //500
            }else if (600 <= Game.spawns['Spawn1'].room.energyCapacityAvailable){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,{memory: {role: 'harvester'}}); //600
            }
            minNumberOfUpgraders        = 0;
            minNumberOfBuilders         = 0;
            minNumberOfSoldiers         = 0;
            minNumberOfMaintenancers    = 0;
            minNumberOfMiners           = 0;
            minNumberOfLorries          = 0;
        }

        if(upgrader.length < minNumberOfUpgraders) {
            var newName = 'Crup_Upgrader_' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            if(300 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable < 400){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'upgrader'}}); //300
            }else if (400 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 500){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'upgrader'}}); //400
            }else if (500 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 600){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'upgrader'}}); //500
            }else if (600 <= Game.spawns['Spawn1'].room.energyCapacityAvailable){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,{memory: {role: 'upgrader'}}); //600
            }
            //if(upgrader.length == 0 && _.filter(Game.creeps, (creep) => creep.memory.role == 'miner') < 1){ // TODO why?
                minNumberOfBuilders         = 0;
                minNumberOfSoldiers         = 0;
                minNumberOfMaintenancers    = 0;
                //minNumberOfMiners           = 0;
                minNumberOfLorries          = 0;
            //}
        }

        if(builder.length < minNumberOfBuilders) {
            var newName = 'Crup_Builder_' + Game.time;
            console.log('Spawning new builder: ' + newName);
            if(300 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 400){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'builder'}}); //300
            }else if (400 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 500){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'builder'}}); //400
            }else if (500 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 600){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'builder'}}); //500
            }else if (600 <= Game.spawns['Spawn1'].room.energyCapacityAvailable){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,{memory: {role: 'builder'}}); //600
            }
        }

        if(soldier.length < minNumberOfSoldiers) {
            var newName = 'Crup_Soldier_' + Game.time;
            console.log('Spawning new soldier: ' + newName);
            if(300 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 400){
                Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,CARRY,MOVE], newName,{memory: {role: 'soldier'}}); //300
            }else if (400 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 500){
                Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,ATTACK,CARRY,MOVE], newName,{memory: {role: 'soldier'}}); //400
            }else if (500 <= Game.spawns['Spawn1'].room.energyCapacityAvailable){
                Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,ATTACK,ATTACK,CARRY,MOVE], newName,{memory: {role: 'soldier'}}); //500
            }
        }

        if(maintenance.length < minNumberOfMaintenancers) {
            var newName = 'Crup_Maintenance_' + Game.time;
            console.log('Spawning new maintenance: ' + newName);
            if(300 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 400){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'maintenance'}}); //300
            }else if (400 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 500){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'maintenance'}}); //400
            }else if (500 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 600){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'maintenance'}}); //500
            }else if (600 <= Game.spawns['Spawn1'].room.energyCapacityAvailable){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,{memory: {role: 'maintenance'}}); //600
            }
        }

        if(lorry.length < minNumberOfLorries) {
            var newName = 'Crup_Lorry_' + Game.time;
            console.log('Spawning new lorry: ' + newName);
            if(300 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 400){
                Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,MOVE], newName,{memory: {role: 'lorry'}});  //250
            }else if (400 <= Game.spawns['Spawn1'].room.energyCapacityAvailable  && Game.spawns['Spawn1'].room.energyCapacityAvailable < 500){
                Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY], newName,{memory: {role: 'lorry'}}); //350
            }else if (500 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 600){
                Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE], newName,{memory: {role: 'lorry'}});   //450
            }else if (600 <= Game.spawns['Spawn1'].room.energyCapacityAvailable){
                Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,{memory: {role: 'lorry'}});   //500
            }
        }

        if(miner.length < minNumberOfMiners) {
            var newName = 'Crup_Miner_' + Game.time;
            console.log('Spawning new miner: ' + newName);
            if(300 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 400){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE], newName,{memory: {role: 'miner'}});  //250
            }else if (400 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 500){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,MOVE], newName,{memory: {role: 'miner'}}); //350
            }else if (500 <= Game.spawns['Spawn1'].room.energyCapacityAvailable && Game.spawns['Spawn1'].room.energyCapacityAvailable  < 600){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,MOVE], newName,{memory: {role: 'miner'}});   //450
            }else if (600 <= Game.spawns['Spawn1'].room.energyCapacityAvailable){
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName,{memory: {role: 'miner'}});   //550
            }
        }

        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🚧' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
};  

module.exports = createCreeps;