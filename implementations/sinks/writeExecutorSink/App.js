
var self;// plumber scope

module.exports = {

    execute: function (aFutureId, aCommandIndex, aTuple) {
        self.executor.execute (aFutureId, aCommandIndex, aTuple);
        self.logger.log('info', this.name + ' is executing:' + aFutureId + '::' + aCommandIndex + ':::TupleSize:' + aTuple.length);
        return {completionCode:'ok'}
    },

    sink:function(afutureId, anIndexInput, aTuple){
        return(self.execute(afutureId, anIndexInput, aTuple));
    },

    ready:function(aDsl) {
        self = this;
        self.logger.log('info',this.name+' is ready');
        return(this);
    },


    shutdown: function(aDsl) {

    },
    audit : function(aDsl){

    }
}
