'use strict';

const Wit = require('./').Wit;

const token = '4ZDYCE73ORQUHRL5JSZSMTQLGGKVECR5';

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const actions = {
  say(sessionId, context, message, cb) {
    console.log(message);
    cb();
  },
  merge(sessionId, context, entities, message, cb) {
    const loc = firstEntityValue(entities, 'location');
    const rate = firstEntityValue(entities, 'rate');
    if (loc) {
      context.loc = loc;
    }
    cb(context);
  },
  error(sessionId, context, error) {
    console.log(error.message);
  },
  ['fetch-rate'](sessionId,context,cb){
    context.rate = '$100';
    cb(context);
  },
};

const client = new Wit(token, actions);
client.interactive();
