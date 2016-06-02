'use strict';

const Wit = require('./').Wit;

const token = '4ZDYCE73ORQUHRL5JSZSMTQLGGKVECR5';
// const token = (() => {
//   if (process.argv.length !== 3) {
//     console.log('usage: node examples/quickstart.js <wit-token>');
//     process.exit(1);
//   }
//   return process.argv[2];
// })();

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
    // Retrieve the location entity and store it into a context field
    const loc = firstEntityValue(entities, 'location');
    const name = firstEntityValue(entities, 'name');

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
