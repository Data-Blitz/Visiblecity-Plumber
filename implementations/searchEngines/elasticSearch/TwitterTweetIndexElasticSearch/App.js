var searchEngine = require('elasticsearch');

var self;

module.exports = {

    get: function (aUri) {

    },

    search: function (anId, aCallback) {

    },

    index: function (anId, aRecord) {
        self.client.index({
            index: self.configuration.index,
            type: self.configuration.type,
            id: anId,
            body: aRecord
        }, function (error, response) {
            if (error)
                self.logger.log('error', this.name + 'failed to index: ' + anId);
            else
                self.logger.log('info', this.name + ' successfully indexed: ' + anId);
        });
    },
    ready: function (aDsl) {
        self = this;
        self.client = new searchEngine.Client({
            host: 'localhost:9200',
            log: 'trace'
        });
        return (self);
    },
    shutdown: function (aDsl) {

    },
    audit: function (aDsl) {

    }
}