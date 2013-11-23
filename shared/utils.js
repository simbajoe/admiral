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
    }
})(typeof exports === 'undefined'? this['Utils']={}: exports)
