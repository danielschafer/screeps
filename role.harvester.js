var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvesting = true;
            creep.say('⚡ transport');
        }


        if(!creep.memory.harvesting) {
            var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER;
                }
            });
            //for(var source in sources){
            //    console.log(sources[source]);
            //}
            //sources.sort(function(a, b) {return b.store.getUsedCapacity()-a.store.getUsedCapacity()});
            if(source && source.store.getUsedCapacity() != 0){//} || sources[1].store.getUsedCapacity() != 0)){ // TODO do not use hard coded numbers
                if(creep.withdraw(source, RESOURCE_ENERGY) != 0) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
                    }/*else if(sources[0].store.getUsedCapacity() != 0){
                        if(creep.withdraw(sources[0], RESOURCE_ENERGY) != 0) {
                            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }*/
            }else{
                var source = creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(source) != 0) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }else{
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var targets2 = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > creep.carryCapacity;
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

module.exports = roleHarvester;