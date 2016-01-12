
var self;

module.exports = { //(aWorkOrder, aDocumentTuple)
    self:null,
    "handle": function(aWorkTuple) {
        aWorkTuple.type = 'createDataSourceFuture';
        var stopAnalyticTimestamp =  Date.now();
        aWorkTuple.journey.analyzeTime = stopAnalyticTimestamp - aWorkTuple.journey.startAnalyzerTimestamp;
        aWorkTuple.timestamp = stopAnalyticTimestamp;
        if (!aWorkTuple.status)
            aWorkTuple.status = 'unknown';

        delete aWorkTuple.data;
        delete aWorkTuple.input;
        aWorkTuple.input = 'too much input to save';
        self.futuresDatabase.write( aWorkTuple.futureId, aWorkTuple, self.configuration.futuresDatabase);


        return 'successful';
    },
    ready: function (aDsl) {
        self = this;
        return self;
    }

}


