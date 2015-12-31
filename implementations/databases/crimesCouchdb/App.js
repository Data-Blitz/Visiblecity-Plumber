
/*
 Copyright (c) Data-Blitz, Inc.   All Rights Reserved
 THIS IS PROPRIETARY SOURCE CODE OF Data-Blitz, Inc. (Data-Blitz)
 This source code may not be copied, reverse engineered, or altered for any purpose.
 This source code is to be used exclusively by approved users and customers of Data-Blitz.
 */

var cradle = require('cradle');
//var self;
module.exports = {

    self:null,

    get: function (anId, aCallback) {
        self.database.get(anId, function (err, doc) {
            if (err)
                aCallback(err, null);
            else
                aCallback(null, doc);
        });
    },
    write: function (anId, aRecord) {
        self.database.save(anId,
            aRecord, function (anErr, aResult) {
                if (anErr)
                    self.logger.log('error', self.name + ' has failed to write:' + aRecord + ' because ' + anErr);
                else
                    self.logger.log('debug', self.name + ' successfully wrote: ' + aRecord + ' to:' + self.database.name);
            });
    },
    ready: function (aDsl) {
        self = this;
        self.database = new (cradle.Connection)().database(self.configuration.databaseName);
        self.logger.log('info', self.name + ' has created connection to:' + self.database.name);
        return (self);
    },
    shutdown: function (aDsl) {
        self.database.close();
    },
    audit: function (aDsl) {
    }
}