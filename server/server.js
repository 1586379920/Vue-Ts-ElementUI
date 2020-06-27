const express = require('express');
const app = express();

// 静态资源托管
app.use('/', express.static('public'));
// 解决跨域问题
app.use(require('cors')());
// 允许express处理json数据
app.use(express.json());

require('./plugins/db.js')(app)
require('./routes/index.js')(app);

app.listen(3001, ()=> {
	console.log('3001 port has been starting...')
});