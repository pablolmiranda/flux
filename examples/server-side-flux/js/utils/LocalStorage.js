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

function onServer() {
    return (typeof window === 'undefined');
}

/*
 * !!! Please Note !!!
 * We are just trying to simulate a storage mechanism in the server side.
 * We know it is not correct to override a localStorage implementation like that. And 
 * we don't recommend you to use this code.
 * Replace this code with a abstraction that will, in the server side, talk with some storage
 * like Redis or Mongo, and will, in the client side, talk to localStorage or IndexDB. 
 *  
 */
var localStorage = onServer() ? {} : window.localStorage;

if (onServer()) {
  localStorage = {
    clear: function(){
      this.app_data = {};
    },
    setItem: function(key, data){
      this.app_data = this.app_data || {};
      this.app_data[key] = data;
    },
    getItem: function(key) {
      if(this.app_data && this.app_data[key]) {
        return this.app_data[key];
      }
      return null;
    }
  };
}

module.exports = localStorage;
