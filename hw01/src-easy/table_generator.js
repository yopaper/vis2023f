"use strict";
const classNumber = 5;
const classTable = ['資工系', "資工所", "電資AI", "電資資安", "創新AI"];
const studentClassId = ["590", "598", "C52", "C53", "C71"];
var characterTable = [];
var csvData = [];
var homeWorkNumber = 10;
var studentNumber = 155;
var csvText = "";
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
function buildCharacterTable() {
    for (var i = 48; i <= 57; i++) {
        characterTable.push(String.fromCharCode(i));
    }
    for (var i = 65; i <= 90; i++) {
        characterTable.push(String.fromCharCode(i));
    }
    for (var i = 97; i <= 122; i++) {
        characterTable.push(String.fromCharCode(i));
    }
    console.log(characterTable);
}
//---------------------------------------------------
function generatrData() {
    var titleRow = ["序號", "班級", "學號", "姓名", "GitHub"];
    for (var i = 1; i <= homeWorkNumber; i++) {
        titleRow.push("作業" + i);
    }
    csvData.push(titleRow);
    for (var i = 1; i <= studentNumber; i++) {
        var classIndex = Math.floor(Math.random() * classNumber);
        var studentId = "";
        studentId += String(110 + Math.floor(Math.random() * 3));
        studentId += studentClassId[classIndex];
        for (var j = 0; j < 3; j++)
            studentId += String(Math.floor(Math.random() * 10));
        var studentName = "";
        for (var j = 0; j < 3; j++)
            studentName += String.fromCharCode(Math.floor(Math.random() * 0x51ff + 0x4e00));
        var githubAccount = "";
        for (var j = 0; j < 10; j++)
            githubAccount += characterTable[Math.floor(Math.random() * characterTable.length)];
        var currentRow = [
            String(i),
            classTable[classIndex],
            studentId,
            studentName,
            githubAccount,
        ];
        for (var j = 0; j < homeWorkNumber; j++) {
            currentRow.push(String(Math.floor(Math.random() * 11)));
        }
        csvData.push(currentRow);
    }
    console.log(csvData);
}
//--------------------------------------------------
function buildTableUi() {
    var tableUi = document.createElement("table");
    for (var i = 0; i < csvData.length; i++) {
        var currentRow = csvData[i];
        var rowElement = document.createElement("tr");
        for (var j = 0; j < currentRow.length; j++) {
            var cell = document.createElement("td");
            cell.style.border = "1px solid #000";
            cell.style.background = "#FFF";
            cell.style.textAlign = "center";
            cell.appendChild(document.createTextNode(currentRow[j]));
            rowElement.appendChild(cell);
        }
        tableUi.appendChild(rowElement);
    }
    document.body.appendChild(tableUi);
}
//---------------------------------------------------
function combineCsv() {
    for (var i = 0; i < csvData.length; i++) {
        for (var j = 0; j < csvData[i].length; j++) {
            csvText += "\"" + csvData[i][j] + "\"";
            if (j < csvData[i].length - 1)
                csvText += ",";
        }
        csvText += "\n";
    }
}
//---------------------------------------------------
function createButton() {
    var button = document.createElement("button");
    button.style.fontSize = "30px";
    button.textContent = "下載csv檔案";
    button.onclick = downloadCsvFile;
    document.body.appendChild(button);
}
//---------------------------------------------------
function main() {
    buildCharacterTable();
    generatrData();
    buildTableUi();
    combineCsv();
    createButton();
}
//--------------------------------------------------
main();
