
var self;

module.exports = { //(aWorkOrder, aDocumentTuple)

    self:null,

    "handle": function(aDataTuple,aViewList){
        var data = {};
        for ( i = 3; i < aViewList.length; i++) {
            if (self.views[aViewList[i]]) {
                view = self.views[aViewList[i]].generateView(aDataTuple, aViewList[i]);
                data[ view.viewName] = view;
            }
        }
        return data;
    },

    ready: function (aDsl) {
        self = this;
        return self;
    }

}


