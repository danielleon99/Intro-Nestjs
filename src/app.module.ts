import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'daga',
      database: 'Knowing_Cuba_Nestjs',
      entities: [__dirname + './**/**/*entity{.ts,.js}'],
      migrationsRun: true,
      migrations: [__dirname, '../migration/**/*{.ts,.js}'],
      migrationsTableName: 'migrations_typeorm',
      cli: {
        migrationsDir: 'src/migration',
      },
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
