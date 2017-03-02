var api, M;
var baseUrl = "https://dev2.yeezan.com";
api = M = {
    "get_mp_info": "/api/data/get_mp_info",
    "get_mp_province_info": "/api/data/get_mp_province_info",
    "get_mp_recent_stat": "/api/data/get_mp_recent_stat"
}

function loopObj(obj) {
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            obj[p] = baseUrl + obj[p];
        }
    }
}

loopObj(M);

module.exports = M;