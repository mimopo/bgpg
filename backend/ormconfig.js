/**
 * TYPEORM CONFIGURATION
 * Put configuration here instead of AppModule so we can use share it with typeorm bin
 *
 * @see https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md#using-ormconfigjs
 */
module.exports = {
  type: process.env.BGPG_TYPEORM_CONNECTION || 'mongodb',
  host: process.env.BGPG_TYPEORM_HOST || 'localhost',
  port: process.env.BGPG_TYPEORM_PORT || 27017,
  database: process.env.BGPG_TYPEORM_DATABASE || 'bgpg',
  syncronize: process.env.BGPG_TYPEORM_SYNCHRONIZE || false,
  logging: process.env.BGPG_TYPEORM_LOGGING || false,
  entities: [process.env.NODE_ENV === 'test' ? __dirname + '/src/entities/**/*.entity.ts' : __dirname + '/dist/entities/**/*.entity.js'],
  useUnifiedTopology: true,
};
