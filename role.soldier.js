var roleSoldier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        var hostilesStructure = creep.room.find(FIND_HOSTILE_STRUCTURES);
        if(hostiles.length > 0) {
            if(creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }else if(hostilesStructure.length > 0) {
            if(creep.attack(hostilesStructure[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostilesStructure[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            if(creep.attackController(hostilesStructure[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostilesStructure[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
      }else{
            //console.log('we are here.');
            for(var name in Memory.creeps) {
                if(Memory.creeps[name].role == 'soldier'){
                    Game.creeps[name].memory.role = 'upgrader';
                    console.log("change harvesters to upgraders");
                }
            }
        }
    }
};

module.exports = roleSoldier;