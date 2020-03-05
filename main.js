// TODO
// -build better defense
// -rebuild ruins
// -build road between controller and closest source
// - pickup dropped sources
// - calculate path to dying miner to build new miner before old one dies

var roleHarvester       = require('role.harvester');
var roleUpgrader        = require('role.upgrader');
var roleBuilder         = require('role.builder');
var roleSoldier         = require('role.soldier');
var roleMaintenance     = require('role.maintenance');
var roleTower           = require('role.tower');
var roleMiner           = require('role.miner');
var roleLorry           = require('role.lorry');

var createCreeps        = require('create.creeps');
var createStructures    = require('create.structures');


module.exports.loop = function () {
    createCreeps.run();
    if (Game.time % 100 == 0) {  // TODO undo comment
        createStructures.run();
    }

    roleTower.run();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'soldier'){
            roleSoldier.run(creep);
        }
        if(creep.memory.role == 'maintenance'){
            roleMaintenance.run(creep);
        }
        if(creep.memory.role == 'miner'){
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'lorry'){
            roleLorry.run(creep);
        }
    }
}