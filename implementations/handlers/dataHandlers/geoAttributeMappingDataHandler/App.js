
//var self;

module.exports = {

    self: null,

    "handle": function(aDocument, anIndex ){
        var latitude = anIndex[3];
        var longitude = anIndex[4];
        if (aDocument[latitude] && aDocument[longitude]) {
            aDocument['latitude'] = aDocument[latitude];
            aDocument['longitude'] = aDocument[longitude];
        }
        return aDocument;
    },

    ready: function (aDsl) {
        self = this;
    }

}