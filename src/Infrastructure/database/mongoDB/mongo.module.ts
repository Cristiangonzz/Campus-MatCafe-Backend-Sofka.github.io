import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@retofinal.sm6dqqu.mongodb.net/test',
      {
        autoCreate: true,
      },
    ),
  ],

  controllers: [],
  providers: [],
  exports: [],
})
export class MongoModule {}
