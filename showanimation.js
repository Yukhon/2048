function showNumberwithAmimation(x, y ,num){
    var numberCell = $('#number-cell-' + x + '-' + y);
    
    numberCell.css('background-color', getNumberBackgroundColor( num ));
    numberCell.css('color', getNumberColor(num));
    numberCell.text( num );

    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(x, y),
        left: getPosLeft(x,y)
    }, 50);
}



function showMoveAnimation(fromx, fromy, tox, toy){
    var numberCell = $('#number-cell-' + fromx + '-' + fromy)

    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}

function updateScore (score){
    var Score = $('#score')
    Score.text(score)
}