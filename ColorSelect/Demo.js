var Colors = [
    "BLACK",
    "WHITE",
    "RED",
    "YELLOW",
    "BLUE",
    "GREEN",
    "PURPLE",
    "GRAY",
    "PINK"
];

var LvlMapColumn = [2, 2, 2, 2, 3, 3, 3, 3, 3];

var TimeUp = 60;

var DismatchSpanID = -1;

var CurLvl = 1;

function GenerateLvlMap(lvl) {
    var countPerRow = LvlMapColumn[lvl];
    var spanCount = countPerRow * countPerRow;
    DismatchSpanID = Math.floor(Math.random() * spanCount);

    var tmpColors = ShuffleColorArray();
    for (var i = 0; i < spanCount; i++) {
        var row = Math.floor(i / countPerRow);
        var col = i % countPerRow;

        var spanId = "span_" + row + "_" + col;

        var spanItem = document.getElementById(spanId);
        spanItem.style.backgroundColor = tmpColors[i];
        spanItem.textContent = tmpColors[i];

        if (tmpColors[i] == "BLACK") {
            spanItem.style.color = "White";
        } else {
            spanItem.style.color = "Black";
        }

        if (i == DismatchSpanID) {
            spanItem.textContent = tmpColors[spanCount];
        }
    }

}

function Judge(eventSource) {
    var spanId = eventSource.id;
    var countPerRow = LvlMapColumn[CurLvl];

    var numbers = spanId.toString().match(/\d+/g);
    var row = new Number(numbers[0]);
    var col = new Number(numbers[1]);
    var globleId = row * countPerRow + col;
    if (globleId == DismatchSpanID) {
        GenerateLvlMap(CurLvl);
    }
}

function ShuffleColorArray() {
    var tmpColors = new Array(Colors.length);
    for (var i = 0; i < Colors.length; i++) {
        tmpColors[i] = Colors[i];
    }

    for (var j = tmpColors.length - 1; j >= 0; j--) {
        var n = Math.round(Math.random() * j);
        var tmp = tmpColors[j];
        tmpColors[j] = tmpColors[n];
        tmpColors[n] = tmp;
    }

    return tmpColors;
}

window.onload = function () {
    GenerateLvlMap(CurLvl);
}