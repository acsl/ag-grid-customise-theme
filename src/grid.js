require('./styles.scss');
var Grid = require('ag-grid-community').Grid;
require('ag-grid-enterprise');

// create cols, one for each letter
var columnDefs = [];
'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach( function(letter) {
    columnDefs.push({field: letter, resizable: true });
});

// create 100 rows, and fill with random numbers
var rowData = [];
for (var i = 0; i<100; i++) {
    var item = {};
    columnDefs.forEach( function(colDef) {
        item[colDef.field] = Math.floor(Math.random() * 100000);
    });
    rowData.push(item);
}

var gridOptions = {

    // we do not hide the menu icons, so easier to see any style changes that impact the icons
    suppressMenuHide: false,

    defaultColDef: {
        // make all cols more narrow
        width: 100,
        filter: 'number',
        headerCheckboxSelection: isFirstColumn,
        checkboxSelection: isFirstColumn
    },

    // enable these, so they can be demonstrated
    enableSorting: true,
    enableFilter: true,
    enableStatusBar: true,
    enableRangeSelection: true,
    headerHeight: 32,
    rowHeight: 32,
    rowSelection: 'multiple',
    columnDefs: columnDefs,
    rowData: rowData
};

function isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
}

// noinspection JSCheckFunctionSignatures
new Grid(document.querySelector('#myGrid'), gridOptions);
