
const graph = async (series, symbol, emaSeries, volumeSeries) => {
    set_symbol(symbol);
    const url = `https://api.bybit.com/v5/market/kline?category=linear&symbol=${symbol}&interval=1&limit=1000`;
    const response = await fetch(url);
    const data = await response.json();
    const kline = data.result.list;
    const datosConv1 = convertirDatos(kline);
    const numericValues = kline.map(entry => parseFloat(entry[1]));
    const ema = EMA(numericValues, 59).reverse();
    const emaDist = (numericValues[0] -ema[ema.length - 1]) / numericValues[0] * 100
    const emaData = datosConv1.slice(0, ema.length).map((entry, index) => ({
      time: entry.time,
      value: ema[index].toFixed(5),
    }));
    const volumeData = datosConv1.slice(0, datosConv1.length).map((entry, index) => ({
      time: entry.time,
      value: entry.volume,
    }));
    chart.applyOptions({
      watermark: {
        visible: true,
        fontSize: 44,
        horzAlign: 'center',
        vertAlign: 'center',
        color: 'rgba(71, 102, 188, 0.397)',
        text: symbol + ' ' + emaDist.toFixed(2) + '%',
      },
      
    })
    volumeSeries.setData(volumeData);
    emaSeries.setData(emaData);
    series.setData(datosConv1);
  
  }
  
const graphSeries = async (symbol) => {
    chart = LightweightCharts.createChart(document.getElementById('chart'), {
      width: 600,
      height: 400,
      watermark: {
        visible: true,
        fontSize: 50  ,
        horzAlign: 'center',
        vertAlign: 'center',
        color: 'rgba(171, 71, 188, 0.5)',
        text: 'La Alquimia',
      },
      timeScale: {
        timeVisible: true,
        borderColor: '#D1D4DC',
      },
  
      rightPriceScale: {
        borderColor: '#D1D4DC',
      },
      layout: {
        background: {
          type: 'solid',
          color: '#000',
        },
        textColor: '#FFFFFF',
      },
      grid: {
        horzLines: {
          color: '#ffffff20',
        },
        vertLines: {
          color: '#f0f3fa1a',
        },
      },
    });
    
    chart.applyOptions({
      priceFormat: {
        type: 'custom',
        minMove: '0.00000001',
        formatter: (price) => {
          if (price < 0.001) return parseFloat(price).toFixed(8)
          else if (price >= 0.001 && price < 1) return parseFloat(price).toFixed(5)
          else return parseFloat(price)
        }
      }, priceScale: {
        autoScale: true
      },
      localization: {
        locale: 'en-US',
        priceFormatter: (price) => {
          if (price < 0.001) return parseFloat(price).toFixed(8)
          else if (price >= 0.001 && price < 1) return parseFloat(price).toFixed(6)
          else return parseFloat(price)
        }
      },
    });
    
    series = chart.addCandlestickSeries({
      upColor: 'rgb(38,166,154)',
      downColor: 'rgb(255,82,82)',
      wickUpColor: 'rgb(38,166,154)',
      wickDownColor: 'rgb(255,82,82)',
      borderVisible: false,
    });
    emaSeries = chart.addLineSeries({
      color: 'rgba(74, 80, 191, 0.569)',
      lineWidth: 2,
    });
    volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });
    
    chart.priceScale('').applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
    
    graph(series, symbol, emaSeries, volumeSeries);
  };



