
const imageTable = {
    "10":"../images/APlus.png",
    "9":"../images/A.png",
    "8":"../images/A.png",
    "7":"../images/B.png",
    "6":"../images/B.png",
    "5":"../images/C.png",
    "4":"../images/C.png",
};

d3.csv("../studentTable.csv", data=>{buildScoreTableUi(data);});

//---------------------------------------------------------------
function createCell(text){
    var cell = document.createElement("td");
    cell.style.borderStyle = "groove";
    cell.style.fontSize = "18pt";
    cell.style.textAlign = "center";
    cell.style.padding = "3pt";
    cell.style.background = "#DDD";
    cell.appendChild( document.createTextNode(text) );
    return cell;
}
//---------------------------------------------------------------
function buildScoreTableUi(scoreData){
    console.log(scoreData);
    var scoreTable = document.createElement("table");
    scoreTable.style.borderSpacing = "0";
    var titleRow = document.createElement("tr");
    scoreTable.appendChild( titleRow );
    const titleText = ["序號", "班級", "學號", "姓名", "Github"];
    for(var i=0; i<titleText.length; i++){
        var cell = createCell( titleText[i] );
        cell.style.background = "#111";
        cell.style.color = "#EEE";
        titleRow.appendChild(cell);
    }

    var maxHomeWorkNumber = 0;
    for(var i=0; i<scoreData.length; i++){
        var current = scoreData[i];
        var row = document.createElement("tr");

        var numberCell = createCell( current.序號 );

        var classCell = createCell( current.班級 );

        var idCell = createCell( current.學號 );

        var nameCell = createCell( current.姓名 );

        var githubCell = createCell( current.GitHub );

        row.appendChild( numberCell );
        row.appendChild( classCell );
        row.appendChild( idCell );
        row.appendChild( nameCell );
        row.appendChild( githubCell );

        var hwCounter = 1;
        while( true ){
            var key = "作業"+hwCounter;
            if( !(key in current) )break;
            
            var scoreCell = createCell( current[key] );
            var scoreImage = document.createElement("img");
            if( current[key]in imageTable )
                scoreImage.src = imageTable[ current[key] ];
            //else
                //scoreImage.hidden = "hidden";
            scoreImage.width = "50";
            scoreImage.height = "50";
            scoreCell.appendChild( scoreImage );
            row.appendChild(scoreCell);
            hwCounter++;
            if( hwCounter>maxHomeWorkNumber )
            maxHomeWorkNumber = hwCounter;
        }
        scoreTable.appendChild( row );
    }
    for(var i=1; i<maxHomeWorkNumber; i++){
        var cell = createCell("作業"+i);
        cell.style.background = "#333";
        cell.style.color = "#FFF";
        titleRow.appendChild( cell );
    }
    document.body.appendChild(scoreTable);
}
//---------------------------------------------------------------