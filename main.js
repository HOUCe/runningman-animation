var hasClass = function (ele, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) {
        return false;
    }
    return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
}

var addClass = function (ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
    }
};

var animateHandler = function () {
    var runningmanEle = document.getElementById('man');
    var runningmanWrapperEle = document.getElementById('man-wrapper');
    addClass(runningmanEle, 'running');
    setTimeout(function(){
        addClass(runningmanWrapperEle, 'run-level1');
    }, 300);
};

animateHandler();

