/*
 Copyright (c) Data-Blitz, Inc.   All Rights Reserved
 THIS IS PROPRIETARY SOURCE CODE OF Data-Blitz, Inc. (Data-Blitz)
 This source code may not be copied, reverse engineered, or altered for any purpose.
 This source code is to be used exclusively by approved users and customers of Data-Blitz.
 */

var self;

module.exports = {

    self: null,


    analyze: function (aWorkTuple, aCallback) {
        // self.database.view('getters', 'byNeighborhood', 'msp-2015-crimes', workTuple.input,
        self.database.view(self.configuration.views[0].designDoc,
            self.configuration.views[0].view,
            self.configuration.views[0].database,
            aWorkTuple.input,
            function (anErr, aDocs) {
                if (anErr)
                    self.logger.log('error', self.name + ' error analyzing ' + aDocs + ' error:' + anErr.toString());
                else if (aDocs) {
                    //self.logger.log('info', self.name + ' successfully got view ' + JSON.stringify(aDocs));
                    aCallback(null, aDocs);
                }
            }
        );
    },
    ready: function (aDsl) {
        self = this;
        self.logger.log('info', self.name + ' CrimeAnalytic is ready');
        return (self);
    },

    shutdown: function (aDsl) {

    },
    audit: function (aDsl) {

    }
}
