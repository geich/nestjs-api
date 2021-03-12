import { registerAs } from '@nestjs/config'

export default registerAs('mail', () => ({
    user: process.env.MAIL_USER
}))
