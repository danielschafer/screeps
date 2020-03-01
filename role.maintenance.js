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
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0); }});
            if(targets) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                var targets2 = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: function(object){ return (object.structureType != STRUCTURE_WALL  && object.hits < object.hitsMax)}});
                if(targets2) {
                    if(creep.repair(targets2) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets2, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    var targets3 = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: function(object){ return (object.hits < object.hitsMax)}});
                    if(targets3){
                        if(creep.repair(targets3) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets3, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{
                        var targets4 = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                        if(targets4) {
                            if(creep.build(targets4) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets4, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                    }
                }
            }
        }
        else{
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER;
                }
            });
            if(sources.length > 0){
                if(creep.withdraw(sources[0], RESOURCE_ENERGY) != 0) {
                    if(sources[0].store.getUsedCapacity() != 0){ 
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }else if(sources[1].store.getUsedCapacity() != 0){
                        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }else{
                sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

module.exports = roleMaintenance;