/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

'use strict';

var path        = require('path');
var fs          = require('fs');
var express     = require('express');
var ejs         = require('ejs');
var React       = require('react');
var nodejsx     = require('node-jsx').install();
var ChatApp     = require('../js/components/ChatApp.react');
var ChatExampleData = require('../js/ChatExampleData');
var ChatWebAPIUtils = require('../js/utils/ChatWebAPIUtils');

var development = process.env.NODE_ENV !== 'production';
var INDEX_TEMPLATE = __dirname + '/index.ejs';

function renderApp(req, res, next) {
    var index = fs.readFileSync(INDEX_TEMPLATE).toString(),
        renderedApp = null;

    ChatExampleData.init(); // load example data into localstorage
    ChatWebAPIUtils.getAllMessages();
    renderedApp = React.renderComponentToString(new ChatApp());
    res.send(ejs.render(index, {app: renderedApp}));
}

var app = express();

app
  .use('/assets', express.static(path.join(__dirname, 'assets')))
  .use('/favicon.ico', function(){})
  .use(renderApp)
  .listen(3000, function() {
    console.log('Point your browser at http://localhost:3000');
  });
