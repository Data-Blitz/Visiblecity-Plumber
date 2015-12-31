
var self;

module.exports = {

    handle:function(anIndexTokens) {
        self.token = anIndexTokens;
        return self.token[1];
    },

    ready:function(aDsl) {
        self = this;
    },

    shutdown: function(aDsl) {

    },
    audit : function(aDsl){

    }
}