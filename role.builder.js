var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(targets) {
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                var targets2 = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: function(object){ return (object.hits < object.hitsMax)}});
                if(false) {
                    if(creep.repair(targets2) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets2, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER;
                }
            });
            //sources.sort(function(a, b) {return b.store.getUsedCapacity()-a.store.getUsedCapacity()});
            if(source && source.store.getUsedCapacity() != 0){
                if(creep.withdraw(source, RESOURCE_ENERGY) != 0) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                source = creep.pos.findClosestByPath(FIND_SOURCES); // TODO what contains FIND_SOURCES?
                if(creep.harvest(source) != 0) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});

                }
            }
        }
    }
};

module.exports = roleBuilder;