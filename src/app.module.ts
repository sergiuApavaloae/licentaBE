import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { PinModule } from './pin/pin.module';
import { Pin } from './pin/entities/pin.entity';
import { FeedbackModule } from './feedback/feedback.module';
import { Feedback } from './feedback/entities/feedback.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'ec2-34-246-227-219.eu-west-1.compute.amazonaws.com',
    port: 5432,
    username: 'urhysadqyihowwsr',
    password: 'f64dd3fc137283ea752581087716307f3fa6c07c77b7096e43ccc2967c3c0878srg',
    database: 'd806ar2dqrmpbu',
    schema: 'public',
    entities: [User,Pin,Feedback],
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    }
  }),
  UsersModule,
  AuthModule,
  PinModule,
  FeedbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
