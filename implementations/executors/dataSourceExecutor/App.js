/*  Copyright (c) Data-Blitz, Inc.   All Rights Reserved  THIS IS PROPRIETARY SOURCE CODE OF Data-Blitz, Inc. (Data-Blitz)  This source code may not be copied, reverse engineered, or altered for any purpose.  This source code is to be used exclusively by approved users and customers of Data-Blitz.  */
var self;
module.exports = {
    execute: function (aFutureId, aCommandIndex, anInputTuple) {
        var workOrderTuple = {};
        workOrderTuple.journey = {};
        workOrderTuple.journey.startAnalyzerTimestamp = Date.now();
        var index = self.indexHandler.handle(aCommandIndex);
        workOrderTuple.index = aCommandIndex;
        workOrderTuple.input = self.inputHandler.handle(anInputTuple);
        if (aFutureId)
            workOrderTuple.futureId = aFutureId;
        var command = self.commands[index];
        self.logger.log('info', this.name + 'found command:' + workOrderTuple.index);
        command.execute(workOrderTuple, function (anErr, aDataSource) {
            if (aDataSource) {
                workOrderTuple['dataSource'] = {};
                workOrderTuple['dataSource'] = aDataSource;
                workOrderTuple.status = 'successful';
                self.futureHandler.handle(workOrderTuple);
            }
            else if (anErr)
                self.futureHandler.handle(anErr);

        });
        self.logger.log('info', self.name + 'executing command with results:' + workOrderTuple.index);
    },
    ready: function (aDsl) {
        self = this;
        self.logger.log('info', self.name + ' is ready');
    }
}