const populateTable = (tableId, data) => {
  const tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  data.forEach(({ symbol, EMA_dist, price24hPcnt }) => {
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.textContent = symbol;
    row.onclick = () => graph(series, symbol, emaSeries, volumeSeries);
    // round texContent to 2 decimal places and add % symbol
    cell2.textContent = `${EMA_dist.toFixed(2)}%`;
    cell3.textContent = `${price24hPcnt}%`;
    row.style.cursor = 'pointer';
    if (0 < price24hPcnt) {
      cell3.classList.add('text-green-200');
    }
    else {
      cell3.classList.add('text-red-200');
    }    
    cell2.classList.add('bg-gray-800');
    row.classList.add('hover:bg-gray-600');

  });
};
