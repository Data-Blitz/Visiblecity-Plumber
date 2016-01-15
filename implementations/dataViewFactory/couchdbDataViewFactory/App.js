var self;

module.exports = {


    createView: function (aViewIndex) {
        var designDocument = {};
        designDocument._id = '_design/' + aViewIndex.name;
        designDocument.views = {};
        for (viewKey in aViewIndex.views) {
            designDocument.views[viewKey] = {};
            designDocument.views[viewKey].map = 'function(doc) { if (doc.' + aViewIndex.views[viewKey].keyAttributeName + ') { emit(doc.' + aViewIndex.views[viewKey].keyAttributeName + ', doc.' + aViewIndex.views[viewKey].valueAttributeName + ') } }'
           //  designDocument.views[viewKey].reduce = 'function (aKeys, aValues) { return sum(aValues) }';
            designDocument.views[viewKey].reduce = '_count';
        }
        return JSON.stringify(designDocument);
    },


    ready: function (aDsl) {
        self = this;
    },

    shutdown: function (aDsl) {

    },
    audit: function (aDsl) {

    }
}


var f = function (doc) {
    if (doc.lastchanged) {
        emit(doc.lastchanged, doc.lastchanged)
    }
}

