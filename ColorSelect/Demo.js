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

var CurtimeCount = new Number(60);

var timer = setInterval("OnTimeCountingDown()", 1000);

var curScore = new Number(0);

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
        OnRightColorClick();
    } else {
        OnWrongColorClick();
    }
}

var combo = new Number(0);
function OnRightColorClick() {
    combo++;
    if (combo > 10) {
        combo = 10;
    }
    curScore += combo;

    SetScoreCountSpanTextWithAction("+" + combo);
    GenerateLvlMap(CurLvl);
}

function OnWrongColorClick() {
    CurtimeCount -= 5;
    if (CurtimeCount < 0) {
        CurtimeCount = 0;
    }
    SetTimeCountSpanTextWithAction("-5");
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

function OnTimeCountingDown() {
    CurtimeCount = CurtimeCount - 1;
    SetTimeCountSpanText();
}

function SetTimeCountSpanText() {
    var timeCountSpan = document.getElementById("timeCount");
    timeCountSpan.textContent = CurtimeCount;
    if (CurtimeCount < 10 && CurtimeCount > 0) {
        timeCountSpan.className = "Danger";
    }
    else if (CurtimeCount == 0) {
        document.getElementById("box").style.display = "none";
        clearTimeout(timer);
    }
}

var TimeActionSpanDisapearTimer;

function SetTimeCountSpanTextWithAction(actionString) {
    SetTimeCountSpanText();
    var timeActionSpan = document.getElementById("timeAction");
    timeActionSpan.textContent = actionString;

    TimeActionSpanDisapearTimer = setTimeout(DisapearTimeActionTextInOneSec, 1000);
}

function DisapearTimeActionTextInOneSec() {
    var timeActionSpan = document.getElementById("timeAction");
    timeActionSpan.textContent = "";
    clearTimeout(TimeActionSpanDisapearTimer);
}

var ScoreActionSpanDisapearTimer;

function SetScoreCountSpanTextWithAction(actionString) {
    var scoreSpan = document.getElementById("score");
    scoreSpan.textContent = curScore;
    var scoreAction = document.getElementById("scoreAction");
    scoreAction.textContent = actionString;

    ScoreActionSpanDisapearTimer = setTimeout(DisapearScoreActionTextInOneSec, 300);
}

function DisapearScoreActionTextInOneSec() {
    var scoreAction = document.getElementById("scoreAction");
    scoreAction.textContent = "";
    clearTimeout(ScoreActionSpanDisapearTimer);
}


window.onload = function () {
    GenerateLvlMap(CurLvl);
}