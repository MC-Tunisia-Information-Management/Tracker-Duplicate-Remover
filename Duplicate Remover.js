function removeDuplicateRowsGT() {
  // Get the sheet named "OGV"
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OGTa/e");

  // Get all data in column A starting from row 5
  var data = sheet.getRange("A5:A").getValues();

  // Create an object to track IDs and their row indices
  var idTracker = {};
  var rowsToDelete = [];

  // Loop through the data
  for (var i = 0; i < data.length; i++) {
    var id = data[i][0]; // Get the ID from column A
    if (id) {
      // Check if the cell is not empty
      if (idTracker[id] === undefined) {
        idTracker[id] = i + 5; // Store the row index (adjusting for the starting row)
      } else {
        rowsToDelete.push(i + 5); // Store the duplicate row index for deletion
      }
    }
  }

  // Delete rows with duplicate IDs, starting from the bottom to avoid index shifting
  rowsToDelete.sort(function (a, b) {
    return b - a;
  });
  for (var j = 0; j < rowsToDelete.length; j++) {
    sheet.deleteRow(rowsToDelete[j]);
  }
}
