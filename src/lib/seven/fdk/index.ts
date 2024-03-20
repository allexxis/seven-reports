import builder from './builder';

export default {
   ...builder('/currencies', 'currencies'),
   ...builder('/agencies', 'agencies'),
   ...builder('/markets', 'markets'),
   ...builder('/prices', 'prices'),
   ...builder('/rooms/usage', 'rooms', 'roomUsage'),
   ...builder('/rooms/type', 'rooms', 'roomType'),
};
