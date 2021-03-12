import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig = (): TypeOrmModuleOptions => {
    const { DB_USER, DB_PASS, DB_DATABASE, DB_PORT, DB_HOST } = process.env
    return {
        type: 'postgres',
        host: DB_HOST,
        port: Number(DB_PORT),
        username: DB_USER,
        password: DB_PASS,
        database: DB_DATABASE,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true
    }
}
