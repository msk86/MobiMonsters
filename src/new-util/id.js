module.exports = (function() {
    var idSpace = {};

    function nextId(namespace) {
        if(!idSpace[namespace]) {
            idSpace[namespace] = 0;
        }

        idSpace[namespace] = idSpace[namespace] + 1;
        return '' + idSpace[namespace];
    }

    return {
        next : nextId
    }

})();