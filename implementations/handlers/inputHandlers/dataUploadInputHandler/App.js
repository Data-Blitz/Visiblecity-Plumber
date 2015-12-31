
var self;

module.exports = {

    "handle": function(aTuple ){
       // var index = (aTuple.index)
        var workOrderTuple = {};
        workOrderTuple.input = aTuple;
        return workOrderTuple;
    },

    ready: function (aDsl) {
        self = this;
    }

}