
var self;

module.exports = {
    handle:function(aFutureTuple) {
        return aFutureTuple.view;
    },

    ready:function(aDsl) {
        self = this;
    },

    shutdown: function(aDsl) {

    },
    audit : function(aDsl){

    }
}