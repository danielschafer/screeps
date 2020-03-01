var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var myPos = creep.pos.look();
        for( var pos in myPos){
            creep.memory.container = false; 
            if(myPos[pos].type == LOOK_STRUCTURES){
                if(myPos[pos].structure.structureType == STRUCTURE_CONTAINER){
                    creep.memory.container = true;
                    //console.log('on container');
                    //creep.say('🔄 on container');
                    break;
                }            
            }
        }

        if(creep.memory.container) {
            creep.memory.container = true;
        }
        if(!creep.memory.harvesting || !creep.memory.container) {
        //    creep.memory.container  = false;
            //creep.say('🚧 goto container');
        }

        if(creep.memory.container == false){
            var containers = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_CONTAINER; } });
            for( var container in containers){
                var foundMiner = false;
                var look = creep.room.lookAt(containers[container]);
                //console.log(containers[container].pos);
                //console.log('size of look: '+look);
                for( var x in look){
                    //console.log('size of look: '+look.lenght);
                    if(look[x].type == LOOK_CREEPS){
                        if(look[x].creep.memory.role == 'miner'){
                            foundMiner = true;
                        }
                    }
                }
                if(foundMiner == false){
                    //creep.say('goto container');
                    creep.moveTo(containers[container], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }else{
            if(creep.harvest(creep.pos.findClosestByPath(FIND_SOURCES)) != 0){
                console.log('err: '+creep.harvest(creep.pos.findClosestByPath(FIND_SOURCES)));
            }
            //creep.say('mine');
        }

        //if(creep.pos.isEqualTo(container.pos[0])) {
        //    creep.harvest(creep.room.findClosestByPath(FIND_SOURCES));
        //}else{
        //    creep.moveTo(container.pos, {visualizePathStyle: {stroke: '#ffaa00'}});
        //}
    }
};

module.exports = roleMiner;