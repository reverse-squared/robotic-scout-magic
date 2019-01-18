var getHashPath = function() {
    var href = location.href;
    var hashIndex = href.indexOf('#');
    return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};
var pushHashPath = function(path) {
    return (window.location.hash = path);
};
var replaceHashPath = function(path) {
    var href = location.href;
    var hashIndex = href.indexOf('#');
    location.replace(location.href.slice(0,hashIndex >= 0 ? hashIndex : 0) + path);
};
var getState = function(path) {
    var pathname = path ? path : getHashPath();
    return { pathname, search: '' };
};
var resolveInitialState = function(state) {
    if(state.pathname === '') {
        replaceHashPath('#');
    }
};
var createHashSource = function() {
    var state = getState();
    resolveInitialState(state);
    return {
        get location() {
            return getState();
        },
        listen(name, fn) {
            window.addEventListener(name, fn);
        },
        unlisten(name, fn) {
            window.removeEventListener(name, fn);
        },
        navigate(uri) {
            state = getState(uri);
            pushHashPath(uri);
        },
        history: {
            get state() { return state; },
        }
    };
};
export default createHashSource;