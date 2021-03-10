var board = new Array();
var score = 0;

$(document).ready(function(){
    newgame();
});

$(document).keydown( function(event){
    switch(event.key){
        case 'a':// left
            
            if(moveLeft()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300);
            }
            break;
        case 'w': // up

            if(moveUp()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300);
            }
            break;

        case 'd': //right
            if(moveRight()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300);
            }
            break;
        case 's': //down
            if(moveDown()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300);
            }
            break;
        default:
            break;
        
    } 
});

function newgame(){
    //initialize the grid
    init();
    //initialize the number 
    generateOneNumber();
    generateOneNumber();
}



function init(){
    for ( var i = 0; i< 4; i++){
        for (var j = 0; j<4; j++){
            var gridCell = $('#grid-'+ i + '-' + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }
    for ( var i = 0; i< 4; i++){
        board[i] = new Array();
        for (var j = 0; j<4; j++){
            board[i][j] = 0;
        }
    }

    updateBoardVeiw();
}

function updateBoardVeiw(){
    $(".number-cell").remove();
    for ( var i = 0; i < 4; i++ ){
        for(var j = 0; j< 4; j++ ){

            $('#grid-container').append('<div class = "number-cell" id = "number-cell-' + i + '-' + j+ '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);
            if( board[i][j] == 0){
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i,j)+50);
                theNumberCell.css('left', getPosLeft(i,j)+50);
            }
            else{
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i,j));
                theNumberCell.css('left', getPosLeft(i,j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
    }
    
}


function generateOneNumber(){
    if(noSpace(board) == true){
        return false;
    }
    //generate a random position
    var randx = parseInt(Math.floor( Math.random() * 4));
    var randy = parseInt(Math.floor( Math.random() * 4));
    while(true){
        if(board[randx][randy] == 0){
            break;
        }
        randx = parseInt(Math.floor( Math.random() * 4));
        randy = parseInt(Math.floor( Math.random() * 4));
    }

    //generate a number
    
    var randnum = Math.random()< 0.5? 2: 4;
    
    //view on board

    board[randx][randy] = randnum;
    showNumberwithAmimation(randx, randy, randnum);
    return true;

}


function moveLeft(){
    if (canMoveLeft(board) == false){
        return false;
    }

    //move left
    for (var i = 0; i< 4; i++){
        for(var j = 1; j<4 ; j++){
            if (board[i][j] != 0){
                for (var k = 0; k< j ; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)){
                        //move 
                        
                        showMoveAnimation(i,j,i,k);
                        // add
                        board[i][k] += board[i][j]
                        //add
                        score += board[i][k]
                        updateScore(score)
                        board[i][j] = 0;

                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardVeiw()", 200);
    return true;
}

function moveRight(){
    if (canMoveRight(board) == false){
        return false;
    }

    //move right
    for (var i = 0; i< 4; i++){
        for(var j = 2; j>=0 ; j--){
            if (board[i][j] != 0){
                for (var k = 3; k>j ; k--){
                    if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)){
                        //move 
                        
                        showMoveAnimation(i,j,i,k);
                        // add
                        board[i][k] += board[i][j]
                        score += board[i][k]
                        updateScore(score)
                        board[i][j] = 0;

                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardVeiw()", 200);
    return true;
}
function moveDown(){
    if (canMoveDown(board) == false){
        return false;
    }

    //move down
    for (var i = 0; i< 4; i++){
        for(var j = 2; j>=0 ; j--){
            if (board[j][i] != 0){
                for (var k = 3; k>j ; k--){
                    if(board[k][i] == 0 && noBlockVertical(i, j, k, board)){
                        // move
                        showMoveAnimation(j, i, k, i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    }
                    else if (board[k][i] == board[j][i] && noBlockVertical(i, j, k, board)){
                        //move 
                        
                        showMoveAnimation(j,i,k,i);
                        // add
                        board[k][i] += board[j][i]
                        score += board[k][i]
                        updateScore(score)
                        board[j][i] = 0;

                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardVeiw()", 200);
    return true;
}

function moveUp(){
    if (canMoveUp(board) == false){
        return false;
    }

    //move up
    for (var i = 0; i< 4; i++){
        for(var j = 1; j<4 ; j++){
            if (board[j][i] != 0){
                for (var k = 0; k< j ; k++){
                    if(board[k][i] == 0 && noBlockVertical(i, k, j, board)){
                        // move
                        showMoveAnimation(j, i, k, i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    }
                    else if (board[k][i] == board[j][i] && noBlockVertical(i, k, j, board)){
                        //move 
                        
                        showMoveAnimation(j,i,k,i);
                        // add
                        board[k][i] += board[j][i]
                        score += board[k][i]
                        updateScore(score);
                        board[j][i] = 0;

                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardVeiw()", 200);
    return true;
}


function isgameover(){
    if ( noSpace(board) && nomove(board)){
        gameover();
    }
}

