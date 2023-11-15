const classNumber = 5;
const classTable = ['資工系', "資工所", "電資AI", "電資資安", "創新AI"];
const studentClassId = ["590", "598", "C52", "C53", "C71"];
var characterTable:String[] = [];

var csvData:string[][] = [];
var homeWorkNumber:number = 10;
var studentNumber:number = 15;
var csvText:string = "";

function downloadCsvFile() {
    console.log("觸發下載");
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csvText));
    element.setAttribute('download', "生成修課名單.csv");
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

//---------------------------------------------------
function buildCharacterTable():void{
    for(var i=48; i<=57; i++){
        characterTable.push( String.fromCharCode(i) );
    }
    for(var i=65; i<=90; i++){
        characterTable.push( String.fromCharCode(i) );
    }
    for(var i=97; i<=122; i++){
        characterTable.push( String.fromCharCode(i) );
    }
    console.log( characterTable );
}
//---------------------------------------------------
function generatrData():void{
    var titleRow = ["序號", "班級", "學號", "姓名", "GitHub"];
    for(var i=1; i<=homeWorkNumber; i++){
        titleRow.push( "作業" + i );
    }
    csvData.push( titleRow );
    for(var i=1; i<=studentNumber; i++){
        var classIndex:number = Math.floor( Math.random()*classNumber );
        var studentId:string = "";
        studentId += String( 110 + Math.floor( Math.random()*3 ) );
        studentId += studentClassId[ classIndex ];
        for(var j=0; j<3; j++)
        studentId += String( Math.floor( Math.random()*10 ) );
        var studentName:string = "";
        for(var j=0; j<3; j++)
        studentName += String.fromCharCode(Math.floor(Math.random() * 0x51ff + 0x4e00));
        var githubAccount:string = "";
        for(var j=0; j<10; j++)
        githubAccount += characterTable[ Math.floor( Math.random()*characterTable.length ) ];
        var currentRow:string[] = [
            String(i), // 序號
            classTable[ classIndex ], // 班級
            studentId, // 學號
            studentName, // 姓名
            githubAccount,
        ];
        for(var j=0; j<homeWorkNumber; j++){
            currentRow.push( String(Math.floor( Math.random()*11 )) );
        }
        csvData.push( currentRow );
    }
    console.log(csvData);
}
//--------------------------------------------------
function buildTableUi():void{
    var tableUi = document.createElement("table")as HTMLTableElement;
    for(var i=0; i<csvData.length ;i++){
        var currentRow = csvData[i];
        var rowElement = document.createElement("tr");
        for( var j=0; j<currentRow.length; j++ ){
            var cell = document.createElement("td");
            cell.style.border = "1px solid #000";
            cell.style.background = "#FFF";
            cell.style.textAlign = "center";
            cell.appendChild( document.createTextNode( currentRow[j] ) );
            rowElement.appendChild( cell );
        }
        tableUi.appendChild( rowElement );
    }
    document.body.appendChild( tableUi );
}
//---------------------------------------------------
function combineCsv():void{
    for(var i=0; i<csvData.length; i++){
        for(var j=0; j<csvData[i].length; j++){
            csvText += "\"" + csvData[i][j] + "\"";
            if( j<csvData[i].length-1 )
            csvText += ",";
        }
        csvText += "\n";
    }
}
//---------------------------------------------------
function createButton():void{
    var button : HTMLButtonElement = document.createElement("button");
    button.style.fontSize = "30px";
    button.textContent = "下載csv檔案";
    button.onclick = downloadCsvFile;
    document.body.appendChild( button );
}
//---------------------------------------------------
function main():void{
    buildCharacterTable();
    generatrData();
    buildTableUi();
    combineCsv();
    createButton();
}
//--------------------------------------------------
main();