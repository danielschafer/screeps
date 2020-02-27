var roleMaintenance = {
    run: function(creep) {

        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }

        if(creep.memory.repairing) {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: function(object){ return (object.structureType != STRUCTURE_WALL && object.hits < object.hitsMax)}});
            if(targets) {
                if(creep.repair(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                var targets2 = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: function(object){ return (object.hits < object.hitsMax)}});
                if(targets2){
                    if(creep.repair(targets2) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets2, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    var targets3 = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    if(targets3) {
                        if(creep.build(targets3) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets3, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
        }
        else{
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleMaintenance;