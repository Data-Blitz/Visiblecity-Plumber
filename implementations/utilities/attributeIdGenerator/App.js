
var uuid = require('node-uuid');

module.exports = {

    "createId": function(aDocument, anIdNameList){
        var idList = [];
        for ( i = 0; i < anIdNameList.length; i++) {
            if (aDocument[anIdNameList[i]]) {
                idList.push(aDocument[anIdNameList[i]]);
            }
        }
        id = idList.concat();
        return id;
    },

    ready: function (aDsl) {
    },
    shutdown: function (aDsl) {

    },
    audit: function (aDsl) {

    }
}
