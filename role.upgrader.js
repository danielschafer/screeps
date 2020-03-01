var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER;
                }
            });
            //sources.sort(function(a, b) {return b.store.getUsedCapacity()-a.store.getUsedCapacity()});
            if(sources.length > 0){
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
    }
};

module.exports = roleUpgrader;