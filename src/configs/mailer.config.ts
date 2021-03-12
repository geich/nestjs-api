import { MailerOptions } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import * as path from 'path'

export const mailerConfig = (): MailerOptions => {
    const { MAIL_USER, MAIL_PASS, MAIL_HOST, MAIL_PORT } = process.env
    return {
        template: {
            dir: path.resolve(__dirname, '..', '..', 'templates'),
            adapter: new EjsAdapter(),
            options: {
                extName: '.ejs',
                layoutsDir: path.resolve(__dirname, '..', '..', 'templates')
            }
        },
        transport: {
            host: MAIL_HOST,
            port: Number(MAIL_PORT),
            secure: true,
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS
            }
        }
    }
}
