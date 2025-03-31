import { Module } from '@nestjs/common';
import { DevicesModule } from './devices/devices.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';

@Module({
  imports: [DevicesModule, MongooseModule.forRoot(envs.databaseUrl)],
})
export class AppModule {}
