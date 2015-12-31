
var self;// plumber scope

module.exports = {

    self : null,

    sink:function(aFutureId, anInputIndex, anInputTuple){
        self.executor.execute (aFutureId, anInputIndex, anInputTuple);
        self.logger.log('info', self.name + ' is executing:' + aFutureId + '::' + anInputIndex + ':::TupleSize:' + anInputTuple.length);
        return {completionCode:'ok'}
    },

    ready:function(aDsl) {
        self = this;
        self.logger.log('info',this.name+' is ready');
        return(self);
    },


    shutdown: function(aDsl) {

    },
    audit : function(aDsl){

    }
}
