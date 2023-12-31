import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresqlConfig } from './config/postgresql.config';
import { DeviceModule } from './device/device.module';
import { SectionButtonsModule } from './section-buttons/section-buttons.module';
import { ButtonDeviceModule } from './button-device/button-device.module';
import { RowButtonsModule } from './row-buttons/row-buttons.module';
import { HttpModule } from '@nestjs/axios';
import { getAxiosConfig } from './config/axios.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getPostgresqlConfig,
      inject: [ConfigService],
    }),
    {
      ...HttpModule.registerAsync({
        imports: [ConfigModule],
        useFactory: getAxiosConfig,
        inject: [ConfigService],
      }),
      global: true,
    },
    DeviceModule,
    SectionButtonsModule,
    ButtonDeviceModule,
    RowButtonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
