var roleSoldier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            if(creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }else{
            var hostilesStructure = creep.room.find(FIND_HOSTILE_STRUCTURES);
            if(hostilesStructure.length > 0) {
                if(creep.attack(hostilesStructure[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(hostilesStructure[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                if(creep.attackController(hostilesStructure[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(hostilesStructure[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleSoldier;