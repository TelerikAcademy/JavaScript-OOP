var Collections;
(function (Collections) {
    var List = (function () {
        function List() {
        }
        List.prototype.add = function (item) {
            this._collection.push(item);
        };

        List.prototype.remove = function (item) {
        };

        Object.defineProperty(List.prototype, "count", {
            get: function () {
                return this._collection.length;
            },
            enumerable: true,
            configurable: true
        });
        return List;
    })();
    Collections.List = List;
})(Collections || (Collections = {}));
//# sourceMappingURL=list.js.map
