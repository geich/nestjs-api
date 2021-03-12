import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './configs/typeorm.config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggerInterceptor } from './interceptors/logger.interceptor'
import { MailerModule } from '@nestjs-modules/mailer'
import { WinstonModule } from 'nest-winston'
import { mailerConfig } from './configs/mailer.config'
import { winstonConfig } from './configs/winston.config'
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath:
                process.env.NODE_ENV === 'development'
                    ? '.env.development'
                    : '.env'
        }),
        WinstonModule.forRoot(winstonConfig),
        MailerModule.forRoot(mailerConfig()),
        TypeOrmModule.forRoot(typeOrmConfig()),
        UsersModule,
        AuthModule
    ],
    controllers: [],
    providers: [{ provide: APP_INTERCEPTOR, useClass: LoggerInterceptor }]
})
export class AppModule {}
