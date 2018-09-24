function getData() {
    var data;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', false);
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        data = JSON.parse(xhr.responseText);
        return data;
    }
}

function createPlayerStats() {
    var statCan = document.getElementById('player-statistics');
    var statCtx = statCan.getContext('2d');
    var canvasWidth = 800;
    var canvasHeight = 200;
    statCan.width = canvasWidth;
    statCan.height = canvasHeight;

    var flag = true;
    for (var i = 0; i < data.info.length; i++) {
        var color = flag ? '#59606d' : '#a0c370';
        statCtx.beginPath();
        statCtx.arc(
            canvasHeight * i + canvasHeight * 0.35,
            canvasHeight / 2,
            canvasHeight * 0.3,
            0,
            Math.PI * 2
        );
        statCtx.lineWidth = 12;
        statCtx.strokeStyle = '#d2d3d6';
        statCtx.stroke();
        for (var key in data.info[i]) {
            var textKey = data.info[i][key];
            var radian = (2 * Math.PI * textKey) / 100;
        }
        statCtx.beginPath();
        statCtx.arc(
            canvasHeight * i + canvasHeight * 0.35,
            canvasHeight / 2,
            canvasHeight * 0.3,
            1.5 * Math.PI,
            radian + 1.5 * Math.PI,
            false
        );
        statCtx.lineWidth = 12;
        statCtx.strokeStyle = color;
        statCtx.stroke();

        statCtx.font = '20px Lato';
        statCtx.fillStyle = '#6e747d';
        statCtx.textAlign = 'center';
        statCtx.fillText(
            key,
            canvasHeight * i + canvasHeight * 0.35,
            canvasHeight - 5
        );

        statCtx.font = 'bold 30px Lato';
        statCtx.fillStyle = '#383c43';
        statCtx.textAlign = 'center';
        statCtx.fillText(
            textKey,
            canvasHeight * i + canvasHeight * 0.35 - 5,
            canvasHeight / 2 + 10
        );

        statCtx.font = 'bold 20px Lato';
        statCtx.fillStyle = '#383c43';
        statCtx.textAlign = 'center';
        statCtx.fillText(
            '%',
            canvasHeight * i + canvasHeight * 0.35 + 20,
            canvasHeight / 2 + 4
        );

        flag = !flag;
    }
}

function createGraph(canvasId, data, myspan) {
    function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    }

    function getMinOfArray(numArray) {
        return Math.min.apply(null, numArray);
    }
    function getNumArr(data) {
        var nums = [];
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                nums.push(data[i][key]);
            }
        }
        return nums;
    }

    function getKeys() {
        var keys = [];
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                keys.push(key);
            }
        }
        return keys;
    }

    var canvas = document.getElementById(canvasId),
        canvasWidth = 800,
        canvasHeight = 300,
        context = canvas.getContext('2d'),
        numArr = getNumArr(data),
        maxNum = getMaxOfArray(numArr),
        minNum = getMinOfArray(numArr),
        maxNumGraph =
            maxNum > 100
                ? Math.ceil(maxNum / 100) * 100
                : Math.ceil(maxNum / 10) * 10,
        minNumGraph =
            maxNum > 100
                ? Math.floor(minNum / 100) * 100
                : Math.floor(minNum / 10) * 10,
        startmove = 50,
        heightProportion = (canvasHeight - 2 * startmove) / maxNumGraph,
        widthProportion = (canvasWidth - 3.5 * startmove) / (numArr.length - 1),
        colorLine = '#4e7d7c',
        addColorLine = '#cacac9';

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    function createMainLine() {
        context.beginPath();
        context.moveTo(
            startmove * 2,
            canvas.height - heightProportion * numArr[0] - startmove
        );
        for (var i = 0; i < numArr.length; i++) {
            context.lineTo(
                //startmove + widthProportion + i * widthProportion,
                startmove * 2 + widthProportion * (i + 1),
                canvasHeight - heightProportion * numArr[i + 1] - startmove
            );
        }
        context.lineWidth = 2;
        context.strokeStyle = colorLine;
        context.stroke();
    }

    function createBg() {
        context.beginPath();
        context.moveTo(2 * startmove, canvasHeight - startmove);
        context.lineTo(
            2 * startmove,
            canvas.height - heightProportion * numArr[0] - startmove
        );
        for (var i = 0; i < numArr.length; i++) {
            context.lineTo(
                startmove * 2 + widthProportion * (i + 1),
                canvas.height - heightProportion * numArr[i + 1] - startmove
            );
        }
        context.lineTo(canvasWidth - startmove * 1.5, canvasHeight - startmove);
        context.fillStyle = 'rgba(0,0,0,.08)';
        context.fill();
    }

    function createDots() {
        for (var i = 0; i < numArr.length; i++) {
            //createVerticalLines
            context.beginPath();
            context.strokeStyle = addColorLine;
            context.setLineDash([1, 1]);
            context.moveTo(
                startmove * 2 + widthProportion * i,
                canvasHeight - startmove
            );
            context.lineTo(startmove * 2 + widthProportion * i, startmove / 2);
            context.stroke();
            context.closePath();

            //createDots
            context.beginPath();
            context.setLineDash([]);
            context.arc(
                startmove * 2 + widthProportion * i,
                canvas.height - heightProportion * numArr[i] - startmove,
                5,
                0,
                Math.PI * 2
            );
            context.lineWidth = 2;
            context.strokeStyle = colorLine;
            context.fillStyle = 'rgb(232,235,235)';
            context.fill();
            context.stroke();
            context.closePath();
        }
    }

    function createText() {
        var keys = getKeys();
        var dist = (canvasWidth - 3.5 * startmove) / (keys.length - 1);
        context.beginPath();
        context.strokeStyle = addColorLine;
        context.setLineDash([]);
        context.moveTo(
            dist / 2 - dist + 2 * startmove,
            canvasHeight - startmove
        );
        context.lineTo(
            dist / 2 - dist + 2 * startmove,
            canvasHeight - startmove + 20
        );
        context.stroke();
        context.closePath();

        for (var i = 0; i < keys.length; i++) {
            context.font = '18px Lato';
            context.fillStyle = '#6e747d';
            context.textAlign = 'center';
            context.fillText(
                keys[i],
                2 * startmove + dist * i,
                canvasHeight - startmove * 0.5
            );

            //createSeparatingVerticalLines
            context.beginPath();
            context.strokeStyle = addColorLine;
            context.setLineDash([]);
            context.moveTo(
                dist / 2 + 2 * startmove + dist * i,
                canvasHeight - startmove
            );
            context.lineTo(
                dist / 2 + 2 * startmove + dist * i,
                canvasHeight - startmove + 20
            );
            context.stroke();
            context.closePath();
        }

        console.log(dist);
    }

    function createAsideNumsAndLines() {
        var flag = 0;
        for (var i = 1; i <= 4; i++) {
            if (maxNumGraph % i == 0) {
                flag++;
            }
        }
        var flag2 = 0;
        var dist = canvasHeight - 2 * startmove;
        for (var i = 1; i <= 4; i++) {
            if (maxNumGraph % i == 0) {
                context.font = '18px Lato';
                context.fillStyle = '#6e747d';
                context.textAlign = 'center';
                context.beginPath();
                var dist = canvasHeight - 2 * startmove;
                context.fillText(
                    maxNumGraph / i,
                    startmove * 0.5,
                    startmove + (dist / flag) * flag2
                );
                context.beginPath();
                context.setLineDash([3, 2]);
                context.strokeStyle = addColorLine;
                context.moveTo(startmove, startmove + (dist / flag) * flag2);
                context.lineTo(canvasWidth, startmove + (dist / flag) * flag2);
                context.stroke();
                context.setLineDash([]);
                context.closePath();

                flag2++;
            }
        }
    }

    function createAddlines() {
        context.beginPath();
        context.strokeStyle = addColorLine;
        context.moveTo(startmove / 2, canvasHeight - startmove);
        context.lineTo(canvasWidth, canvasHeight - startmove);
        context.stroke();
    }

    function getStatsOnMove() {
        var dotsOffsetX = numArr.map(function(item, index) {
            return Math.floor(2 * startmove + widthProportion * index);
        });
        var dotsOffsetY = numArr.map(function(item) {
            return Math.floor(
                canvas.height - startmove - heightProportion * item
            );
        });

        canvas.onmousemove = function(e) {
            dotsOffsetY.forEach(function(item, i) {
                if (
                    e.offsetY >= dotsOffsetY[i] - 10 &&
                    e.offsetY <= dotsOffsetY[i] + 10 &&
                    e.offsetX >= dotsOffsetX[i] - 10 &&
                    e.offsetX <= dotsOffsetX[i] + 10
                ) {
                    var percent = Math.floor(
                        (numArr[i] / numArr[i - 1]) * 100 - 100
                    )
                        ? ' | ' +
                          Math.floor((numArr[i] / numArr[i - 1]) * 100 - 100) +
                          ' %'
                        : '';
                    var span = document.getElementById(myspan);
                    span.style.display = 'block';
                    span.textContent = numArr[i] + percent;
                    span.style.left = dotsOffsetX[i] + 'px';
                    span.style.top = dotsOffsetY[i] + 'px';
                    canvas.onmouseout = function() {
                        span.style.display = 'none';
                    };
                }
            });
        };
    }

    getStatsOnMove();
    createText();
    createAsideNumsAndLines();
    createAddlines();
    createMainLine();
    createBg();
    createDots();
}

const data = getData();
createPlayerStats();
createGraph('active-players', data.players, 'main-span-players');
createGraph('active-tournaments', data.tournaments, 'main-span-tournaments');
