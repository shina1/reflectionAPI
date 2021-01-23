'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); //Success is not final; failure is not fatal: It is the courage to continue that counts. -- Winston S. Churchill


app.use(_express2.default.json());

app.get('/', function (req, res) {
    return res.status(200).send({
        'message': 'YAY!, Congratulations! Your first endpoint is working'
    });
});

app.listen(3500);

console.log('app running on port ', 3500);