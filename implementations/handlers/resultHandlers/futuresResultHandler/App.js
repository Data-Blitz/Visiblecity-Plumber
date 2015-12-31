
var self;

module.exports = { //(aWorkOrder, aDocumentTuple)


    self:null,

    "handle": function(aWorkOrder, aResultTuple){
        aWorkOrder.result = aResultTuple.json;
        self.futuresDatabase.write(aWorkOrder.futureId, aWorkOrder);
        return aWorkOrder;
    },

    ready: function (aDsl) {
        self = this;
        return self;
    }

}


