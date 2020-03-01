var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER;
                }
            });
            //for(var source in sources){
            //    console.log(sources[source]);
            //}
            //sources.sort(function(a, b) {return b.store.getUsedCapacity()-a.store.getUsedCapacity()});
            if(sources.length > 0 && (sources[0].store.getUsedCapacity() != 0 || sources[1].store.getUsedCapacity() != 0)){ // TODO do not use hard coded numbers
                if(creep.withdraw(sources[1], RESOURCE_ENERGY) != 0) {
                    if(sources[1].store.getUsedCapacity() != 0){ 
                        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }else if(sources[0].store.getUsedCapacity() != 0){
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }else{
                sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) != 0) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }

        }
        else {var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
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
                }
            }
        }
    }
};

module.exports = roleHarvester;