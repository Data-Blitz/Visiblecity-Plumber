var self = null;
var Twit = require('twit');

module.exports = {

    ready: function (aDsl) {
        self = this;
        self.twitter =  new Twit(self.configuration.twitterAccess);
        if (self.configuration.location)
          self.stream =  self.twitter.stream('statuses/filter', { locations: self.configuration.location });
        else if (self.configuration.place)
            self.stream =  self.twitter.stream('statuses/filter', self.configuration.place);

        self.logger.log('info', this.name + ' successfully aquired twitter access:'+ self.twitter.config);
    },

    run: function () {
        self.logger.log('info', this.name + ' is listening to from tweets');
        self.stream.on('tweet', function (aTweet) {;
            self.sink.sink(aTweet);
        })
    },
    shutdown: function (aDsl) {

    },
    audit: function (aDsl) {

    }
}





