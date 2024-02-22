const populateTable = (tableId, data) => {
    const tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
  
    data.forEach(({ symbol, EMA_dist }) => {
      const row = tableBody.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      cell1.textContent = symbol;
      row.onclick = () => graph(series, symbol, emaSeries, volumeSeries);
      // round texContent to 2 decimal places and add % symbol
      cell2.textContent = `${EMA_dist.toFixed(2)}%`;
      row.style.cursor = 'pointer';
      
    });
  };
  