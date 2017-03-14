var canRun = true;

var throttle = function (fn, context, delay, args) {
    if (!canRun) {
        return;
    }
    canRun = false;
    setTimeout(function(){
        fn.call(context, args);
        canRun = true;
    }, delay)
};

var hasClass = function (ele, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) {
        return false;
    }
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

var addClass = function (ele, cls) {
    if (!hasClass(elem, cls)) {
        ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
    }
};

var animateHandler = function () {
    var runningmanEle = document.getElementById('man');
    addClass(runningmanEle, 'running')
};

window.onscroll = function (e) {
    throttle(animateHandler, null, 200, e);
}
