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
            var mostDamagedCreep = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, { filter: (creep) => /*structure.structureType == STRUCTURE_WALL  &&*/ creep.hits < creep.hitsMax });
            mostDamagedCreep.sort(function(a, b) {return (b.hitsMax - b.hits)-(a.hitsMax - a.hits)});
            if(closestHostile) {
                myTowers[tower].attack(closestHostile);
            }else if(mostDamagedCreep[0]){
                myTowers[tower].heal(mostDamagedCreep[0]);
            }else{
                //console.log('tower: ' + myTowers[tower].pos);
                var closestDamagedStructure = myTowers[tower].pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => structure.structureType != STRUCTURE_WALL  && structure.hits < structure.hitsMax });
                if(closestDamagedStructure) {
                    myTowers[tower].repair(closestDamagedStructure);
                }else{
                    //var closestDamagedStructure2 = myTowers[tower].pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_WALL  && structure.hits < structure.hitsMax });
                    //if(closestDamagedStructure2) {
                    //    myTowers[tower].repair(closestDamagedStructure2);
                    //}
                    var mostDamagedStructure = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, { filter: (structure) => /*structure.structureType == STRUCTURE_WALL  &&*/ structure.hits < structure.hitsMax });
                    //for( var struc in mostDamagedStructure){
                    //    console.log(mostDamagedStructure[struc]);
                    //}
                    mostDamagedStructure.sort(function(a, b) {return (b.hitsMax - b.hits)-(a.hitsMax - a.hits)});
                    if(mostDamagedStructure[0]) {
                        myTowers[tower].repair(mostDamagedStructure[0]);
                    }
                }
            }
        }
    }
};

module.exports = roleTower;
