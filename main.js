var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSoldier = require('role.soldier');
var roleMaintenance = require('role.maintenance');

var createCreeps = require('create.creeps');
var createRepairAndAttack = require('create.repairandattack');

module.exports.loop = function () {
    createCreeps.run();
    createRepairAndAttack.run();

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
    }
}