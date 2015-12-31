
var self;

module.exports = {

    ready: function (aDsl) {
        self = this;
        self.logger.log('info', this.name + ' is ready');
        self.source.sink = {};
        self.source.sink = this.sink;
        return(self);
    },

    shutdown: function (aDsl) {

    },
    audit: function (aDsl) {

    }
}