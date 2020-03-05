/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('create.structures');
 * mod.thing == 'a thing'; // true
 */

var roleTower = {
    run: function() {
        var myTowers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER;
            }
        });
        for( var tower in myTowers){
            var closestHostile = myTowers[tower].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            
            var mostDamagedHealerCreep = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS, { filter: (creep) => creep.getActiveBodyparts(HEAL) > 0 });
            //console.log(closestHostile);
            
            
            var mostDamagedCreep = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, { filter: (creep) => creep.hits < creep.hitsMax });
            mostDamagedCreep.sort(function(a, b) {return (b.hitsMax - b.hits)-(a.hitsMax - a.hits)});
            //console.log(mostDamagedCreep);
            if(closestHostile) {
                //console.log(closestHostile);
                if(mostDamagedHealerCreep.length > 0){
                    myTowers[tower].attack(mostDamagedHealerCreep[0]);
                }else {
                    myTowers[tower].attack(closestHostile);
                }
            }else if(mostDamagedCreep[0]){
                myTowers[tower].heal(mostDamagedCreep[0]);
            }else{
                //console.log('tower: ' + myTowers[tower].pos);
                //var closestDamagedStructure = myTowers[tower].pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_WALL  && structure.hits < structure.hitsMax });
                //if(closestDamagedStructure) {
                //    myTowers[tower].repair(closestDamagedStructure);
                //}else{
                    //var closestDamagedStructure2 = myTowers[tower].pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_WALL  && structure.hits < structure.hitsMax });
                    //if(closestDamagedStructure2) {
                    //    myTowers[tower].repair(closestDamagedStructure2);
                    //}
                    var mostDamagedStructure = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType != STRUCTURE_ROAD  && structure.hits < structure.hitsMax });
                    //for( var struc in mostDamagedStructure){
                    //    console.log(mostDamagedStructure[struc]);
                    //}
                    mostDamagedStructure.sort(function(a, b) {return (b.hits)-(a.hits)});
                    if(mostDamagedStructure[mostDamagedStructure.length-1] && myTowers[tower].store.getUsedCapacity(RESOURCE_ENERGY) > myTowers[tower].store.getCapacity(RESOURCE_ENERGY)/2) {
                        myTowers[tower].repair(mostDamagedStructure[mostDamagedStructure.length-1]);
                    }
                //}
            }
        }
    }
};

module.exports = roleTower;