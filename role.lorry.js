var roleLorry = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.working != true && creep.carry.energy == 0) {
            creep.memory.working    = true;
            creep.memory.hasSource  = false;
        }
        else if (creep.memory.working == true && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working    = false;
            creep.memory.hasSource  = false;
        }

        if(creep.memory.working == true) {
            if(creep.memory.hasSource){
                var source = Game.getObjectById(creep.memory.sourceId.id);
                //console.log(source);
                if(source.store.getUsedCapacity() == 0){
                    creep.memory.hasSource = false;
                }
                if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                    //creep.say('go to container');
                }
            }else{
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER;
                    }
                });
                //for(var source in sources){
                //    console.log(sources[source]);
                //}
                sources.sort(function(a, b) {return b.store.getUsedCapacity()-a.store.getUsedCapacity()});
                creep.memory.sourceId   = sources[0];
                creep.memory.hasSource  = true;
            }
        }
        else {
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            var mostDamagedCreep = creep.room.find(FIND_CREEPS, { filter: (creep) => creep.hits < creep.hitsMax });
            mostDamagedCreep.sort(function(a, b) {return (b.hitsMax - b.hits)-(a.hitsMax - a.hits)});
            //console.log(closestHostile);
            //console.log(mostDamagedCreep.length); // TODO
            if(closestHostile) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }else{
                //creep.say('go to structure');
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN /*|| structure.structureType == STRUCTURE_TOWER*/) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var targets2 = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(targets2.length > 0) {
                    if(creep.transfer(targets2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets2[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    var targets3 = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                    if(targets3.length > 0) {
                        if(creep.transfer(targets3[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets3[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleLorry;