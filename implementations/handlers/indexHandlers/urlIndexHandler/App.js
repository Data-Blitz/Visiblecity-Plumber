
var self;

module.exports = {

    handle:function(anIndexToken) {
        self.token = anIndexToken;
        return self.token[0];
    },

    ready:function(aDsl) {
        self = this;
;

    },

    shutdown: function(aDsl) {

    },
    audit : function(aDsl){

    }
}