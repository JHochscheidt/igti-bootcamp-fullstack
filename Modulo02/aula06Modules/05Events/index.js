import ev from './events.js';

ev.emit('testeEvent', 'bla bla bla');

ev.on('testeEvent', () => {
  console.log('ouviu tambem');
});
