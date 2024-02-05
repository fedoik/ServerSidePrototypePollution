const Routes = require('./routes');
module.exports = function(app,db) {
  Routes(app, db);
  // Тут, позже, будут и другие обработчики маршрутов 
};