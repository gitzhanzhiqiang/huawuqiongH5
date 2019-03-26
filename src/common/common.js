var Common = {};
Common.dealImage = function (path, callback) {
    var img = new Image();
    img.src = path;
    let maxW = 600;
    img.onload = function () {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        if (img.width > maxW) {
            img.height *= maxW / img.width;
            img.width = maxW;
        }
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this, 0, 0, img.width, img.height);
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', 1);
        // 回调函数返回base64的值
        if (typeof callback == 'function') {
            callback(base64);
        }
    };
}
Common.getBlobBydataURI2 = function (dataURI,type) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new File([new Uint8Array(array)], {type:type });
}
Common.getBlobBydataURI = function (dataURI,filename) {
        var arr = dataURI.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
}
export {
    Common
}