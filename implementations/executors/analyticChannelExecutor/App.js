/*  Copyright (c) Data-Blitz, Inc.   All Rights Reserved  THIS IS PROPRIETARY SOURCE CODE OF Data-Blitz, Inc. (Data-Blitz)  This source code may not be copied, reverse engineered, or altered for any purpose.  This source code is to be used exclusively by approved users and customers of Data-Blitz.  */
var self;
module.exports = {
    execute: function (aFutureId, anAnalyticIndex, anInputTuple) {
        var inputTuple = {};
        var index = self.indexHandler.handle(anAnalyticIndex);
        inputTuple.input = self.inputHandler.handle(anInputTuple);
        if (aFutureId)
            inputTuple.futureId = aFutureId;
        var analyticChannel = self.analyticChannels[index];
        self.logger.log('info', this.name + 'found analyticChannel:' + analyticChannel);
        self.logger.log('info', this.name + 'parsing raw:' + anInputTuple);
        var workTuple = {};
        workTuple.input = JSON.parse(anInputTuple);
        workTuple.futureId = aFutureId;
        workTuple.journey = {};
        workTuple.journey.startAnalyzerTimestamp = Date.now();
        workTuple.status = 'executing';
        analyticChannel.analytic.analyze(workTuple, function (anErr, aData) {
            if (anErr) {
                self.logger.log('error', self.name + 'failed analyzing' + anErr.toString());
                workTuple.status = 'faulted';
                workTuple.reason = anErr.toString();
                self.futureHandler.handle(workTuple);
            }
            else if (aData) {
                workTuple.data = aData;
                workTuple.status = 'successful';
                workTuple.view = self.viewHandler.handle(aData, anAnalyticIndex);
                self.futureHandler.handle(workTuple);
            }
        });
    },
    ready: function (aDsl) {
        self = this;
        self.logger.log('info', self.name + ' is ready');
    }
}
