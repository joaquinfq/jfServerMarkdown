/**
 * Pruebas del paquete jf-server-markdown.
 */
const assert = require('assert');
const jfServerMethodGet = require('jf-server/src/method/Get');
const jfServerMarkdown = require('.');

assert.ok(jfServerMethodGet.isPrototypeOf(jfServerMarkdown));
