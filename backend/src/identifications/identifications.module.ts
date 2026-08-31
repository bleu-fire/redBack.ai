import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentificationsController } from './identifications.controller';
import { IdentificationsService } from './identifications.service';
import { Identification, IdentificationSchema } from '../schemas/identification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Identification.name, schema: IdentificationSchema },
    ]),
  ],
  controllers: [IdentificationsController],
  providers: [IdentificationsService],
  exports: [IdentificationsService],
})
export class IdentificationsModule {}

