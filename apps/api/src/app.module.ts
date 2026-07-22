import { Module } from '@nestjs/common';
import { QualityModule } from './modules/quality/quality.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.default'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'brainos',
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production', // Only sync in dev
        logging: ['error', 'warning', 'migration'],
      }),
    }),
    QualityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
