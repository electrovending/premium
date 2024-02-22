
var chart = null;
var series = null;
var emaSeries = null;
var volumeSeries = null;
var longSymbols = [];
var shortSymbols = [];
var tickers = null;

const set_symbol = (symbol) => {
  document.getElementById('symbol').textContent = symbol;
}

const signals = (kline, symbol, emaDist) => {
  const ordered = convertirDatos(kline).reverse();   
  const rsi = RSI(ordered.map(entry => entry.open), 14);
  // set conditional for rsi crossing down below 75 
  if (rsi[0] < rsi[1] && rsi[1] > 75 && emaDist > 3 ) {
    notifyMe(symbol, 'SHORT ⛔');
  } else if (rsi[0] > rsi[1] && rsi[1] < 25 && emaDist < -3) {
    notifyMe(symbol, 'LONG 🟢');
  }
}
// request permission on page load
document.addEventListener('DOMContentLoaded', function() {
  if (!Notification) {
   alert('Desktop notifications not available in your browser.');
   return;
  }
 
  if (Notification.permission !== 'granted')
   Notification.requestPermission();
 });
 
 function notifyMe(symbol, message) {
  if (Notification.permission !== 'granted')
   Notification.requestPermission();
  else {
    // add symbol to notification
   var notification = new Notification(symbol+' Alert 🚨! ⚠️', {
    icon: '/assets/favicon.ico',
    body: ''+message,
   });
   notification.onclick = function() {
    window.open('/');
   };
  }
 };
const loopFunct = () => {
  analyzeCoins();
  const currentsymbol = document.getElementById('symbol').textContent;
  graph(series, currentsymbol, emaSeries, volumeSeries);
}
window.onload = (event) => {
  graphSeries('BTCUSDT');
  analyzeCoins();
  setInterval(loopFunct, 60000);
  
};
