var Config = require('../../shared/config.js');
var Utils = require('../../shared/utils.js');

exports.testGetDist = function(test) {
    test.ok(Utils.getDist([1,1], [2,2]) == Math.sqrt(2), 'diagonal dist incorrect');
    test.ok(Utils.getDist([1,1], [2,1]) == 1, 'horizontal line dist incorrect');
    test.done();
};

exports.testDeleteFromArrById = function(test) {
    var arr = [
        {id: 1, value:'orange'},
        {id: 2, value:'apple'},
        {id: 3, value:'banana'},
        {id: 5, value:'kiwi'},
        {id: 9, value:'boot'},
        {id: 2, value:'store'}
    ];
    arr = Utils.deleteFromArrById(1, arr);
    test.ok(arr.length == 5, 'length of arr incorrect');
    test.ok(arr[0].value == 'apple', 'not correct element deleted');
    arr = Utils.deleteFromArrById(55, arr);
    test.ok(arr.length == 5, 'length of arr incorrect after deleting non existing id');
    test.ok(arr[0].value == 'apple', 'element deleted, though id did not exist');
    arr = Utils.deleteFromArrById(2, arr);
    for (var i in arr) {
        if (arr[i].id == 1 || arr[i].id == 2) {
            test.ok(false, 'found deleted element');
        }
    }
    test.done();
};

exports.testDeleteFromArrByIndex= function(test) {
    var arr = ['dog', 'cat'];
    arr = Utils.deleteFromArrByIndex(1, arr);
    test.ok(arr.length == 1, 'length of arr incorrect');
    test.ok(arr[0].value == 'dog', 'not correct element deleted');
    arr = Utils.deleteFromArrByIndex(55, arr);
    test.ok(arr.length == 1, 'length of arr incorrect after deleting non existing index');
    test.ok(arr[0].value == 'dog', 'element deleted, though index did not exist');
    test.done();
};

exports.testDeleteFromArrByValue= function(test) {
    var arr = ['dog', 'cat'];
    arr = Utils.deleteFromArrByValue('none', arr);
    test.ok(arr.length == 2, 'length of arr incorrect after deleting non existing element');
    arr = Utils.deleteFromArrByValue('dog', arr);
    test.ok(arr[0] == 'cat', 'not correct element deleted');
    test.ok(arr.length == 1, 'length of arr incorrect after deleting element');
    arr = Utils.deleteFromArrByValue('cat', arr);
    test.ok(arr.length == 0, 'last element could not be deleted');
    test.done();
};


exports.testDeleteFromArrByIndex= function(test) {
    var arr = [
        [0,1],
        [1,0],
        [-2,6]
    ];
    var index = Utils.findPointIndexInArr([0,1], arr);
    test.ok(index == 0, 'incorrect index found');
    index = Utils.findPointIndexInArr([1,0], arr);
    test.ok(index == 1, 'incorrect index found 2');
    index = Utils.findPointIndexInArr([10,11], arr);
    test.ok(!index, 'Not existing element found');
    test.done();
};

exports.testClonePoint = function(test) {
    var point = [1,1];
    var point2 = Utils.clonePoint(point);
    point[0] = 5;
    test.ok(point2[0] == 1, 'Point was not cloned');
    test.ok(point[0] == 5, 'Value of point was not set. Strange!');
    test.done();
};

exports.testArePointsEq = function(test) {
    var point = [1,1];
    var point2 = [3,3];
    var point3 = [1,1];
    test.ok(Utils.arePointsEq(point, point3), 'Equal points are not equal');
    test.ok(!Utils.arePointsEq(point, point2), 'Non equal points are not equal');
    test.done();
};