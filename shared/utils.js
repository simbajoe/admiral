(function(exports){
    exports.arePointsEq = function(point, point2) {
        return point[0] == point2[0] && point[1] == point2[1];
    };
    exports.clonePoint = function(point) {
        return [
            point[0],
            point[1]
        ];
    };
    exports.findPointIndexInArr = function(point, arr) {
        for (var i in arr) {
            if (this.arePointsEq(arr[i], point)) {
                return i;
            }
        }
        return null;
    };
    exports.deleteFromArrById = function(id, arr) {
        return arr.filter(function(element){
            return id != element.id;
        });
    };
    exports.deleteFromArrByIndex = function(index, arr) {
        delete arr[index];
        arr.splice(index, 1);
        return arr;
    };
    exports.getDist = function(point1, point2) {
        return Math.sqrt(Math.pow((point1[0] - point2[0]),2) + Math.pow((point1[1] - point2[1]),2));
    };
    exports.cloneArray = function(arr) {
        return arr.slice(0);
    };
    exports.cloneOneStoryHash = function(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    };
    exports.areArraysEq = function(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    };
})(typeof exports === 'undefined'? this['Utils']={}: exports)
