export default () => ({
  DB_CONN_STRING: process.env.DB_CONN_STRING || 'mongodb://root:example@localhost:27017',
});
