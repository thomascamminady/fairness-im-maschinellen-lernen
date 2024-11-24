// Paste your CSV data here as a string
const csvString = `
name,score
Ehrenfried Weigert,F
Eddie Nießen,D
Alberto Seiffert,E
Dina Fritzsche,A
Marlies Traut,B
Wolfram Göbel,D
Cemil Heiland,F
Gesine Stolze,A
Carolin Johann,A
Hans-Karl Gödecke,B
`;

// Parse the CSV string into an array of objects
const parseCSV = (csv) => {
    const lines = csv.trim().split("\n"); // Split by line and trim excess whitespace
    const [header, ...rows] = lines; // Extract header and rows
    const keys = header.split(","); // Extract keys from the header

    return rows.map((row) => {
        const values = row.split(","); // Split row into values
        return keys.reduce((obj, key, index) => {
            obj[key.trim()] = values[index].trim(); // Map keys to values
            return obj;
        }, {});
    });
};

const csvData = parseCSV(csvString);

// Render the table dynamically
const tableBody = document.querySelector("#sortable-table tbody");
csvData.forEach((entry) => {
    const row = document.createElement("tr");
    Object.values(entry).forEach((cellValue) => {
        const cell = document.createElement("td");
        cell.textContent = cellValue;
        row.appendChild(cell);
    });
    tableBody.appendChild(row);
});

// Add sorting functionality
function sortTable(columnIndex) {
    const rows = Array.from(tableBody.rows);
    const isAscending = tableBody.getAttribute("data-sort") !== "asc";
    tableBody.setAttribute("data-sort", isAscending ? "asc" : "desc");

    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent.trim();
        const bText = b.cells[columnIndex].textContent.trim();
        return isAscending
            ? aText.localeCompare(bText)
            : bText.localeCompare(aText);
    });

    rows.forEach((row) => tableBody.appendChild(row));
}
