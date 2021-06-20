import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig = (): TypeOrmModuleOptions => {
    const {
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        POSTGRES_DB,
        DB_PORT,
        DB_HOST
    } = process.env
    return {
        type: 'postgres',
        host: DB_HOST,
        port: Number(DB_PORT),
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true
    }
}
