var cradle = require('cradle');
var self;
module.exports = {
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
                    self.logger.log('info', self.name + ' successfully wrote: ' + aRecord + ' to:' + self.database.name);
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