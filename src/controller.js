import App from 'cerebral';
import Devtools from 'cerebral/devtools';
import defaultState from './cerebral/defaultState';
import sequences from './cerebral/sequences';
import providers from './cerebral/providers';

let app;

export default () => {
  if (app) return app;

  const state = defaultState({});
  const main = {
    state,
    modules: {
      // ...yourModulesHere
    },
    providers: {
      ...providers,
    },
    sequences: {
      ...sequences,
    },
    catch: [
      [
        Error,
        ({message, props: {error}}) => {
          console.log('Error happened', {Error, message, error});
        },
      ],
    ]
  };

  app = App(main, {
    devtools: process.env.NODE_ENV === 'production' ? null : Devtools({
      host: 'localhost:8585',
      reconnect: false,
    }),
    throwToConsole: false,
  });

  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    window.__APP_CONTROLLER__ = app;
  }

  return app;
};
