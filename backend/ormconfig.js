/**
 * TYPEORM CONFIGURATION
 * Put configuration here instead of AppModule so we can use share it with typeorm bin
 *
 * @see https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md#using-ormconfigjs
 */
module.exports = {
  type: process.env.BGPG_TYPEORM_CONNECTION,
  host: process.env.BGPG_TYPEORM_HOST,
  port: process.env.BGPG_TYPEORM_PORT,
  database: process.env.BGPG_TYPEORM_DATABASE,
  syncronize: process.env.BGPG_TYPEORM_SYNCHRONIZE,
  logging: process.env.BGPG_TYPEORM_LOGGING,
  entities: [process.env.NODE_ENV === 'test' ? __dirname + '/src/entities/**/*.entity.ts' : __dirname + '/dist/entities/**/*.entity.js'],
  useUnifiedTopology: true,
};
