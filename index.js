/**
 * @format
 */

global.Buffer = global.Buffer || require('buffer').Buffer;
// global.assert = global.assert || require('assert').assert;
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
