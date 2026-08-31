import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SpeciesModule } from './species/species.module';
import { IdentificationsModule } from './identifications/identifications.module';
import { LearningModule } from './learning/learning.module';
//backend launching 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI') || 'mongodb://localhost:27017/redback_db',
      }),
    }),
    AuthModule,
    SpeciesModule,
    IdentificationsModule,
    LearningModule,
  ],
})
export class AppModule {}

