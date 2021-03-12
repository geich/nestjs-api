import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    Get,
    UseGuards,
    Param,
    Patch,
    UnauthorizedException,
    Query
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/createUser.dto'
import { CredentialsDto } from './dto/credentials.dto'
import { AuthGuard } from '@nestjs/passport'
import { User } from '../users/user.entity'
import { GetUser } from './getUser.decorator'
import { ChangePasswordDto } from './dto/changePassword.dto'
import { UserRole } from 'src/users/userRoles.enum'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe) createUserDto: CreateUserDto
    ): Promise<{ message: string }> {
        await this.authService.signUp(createUserDto)
        return {
            message: 'Cadastro realizado com sucesso'
        }
    }

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) credentiaslsDto: CredentialsDto
    ): Promise<{ token: string }> {
        return await this.authService.signIn(credentiaslsDto)
    }

    @Get('/me')
    @UseGuards(AuthGuard())
    getMe(@GetUser() user: User): User {
        return user
    }

    @Post('/send-recover-email')
    async sendRecoverPasswordEmail(
        @Body('email') email: string
    ): Promise<{ message: string }> {
        await this.authService.sendRecoverPasswordEmail(email)
        return {
            message:
                'Foi enviado um email com instruções para resetar sua senha'
        }
    }

    @Get('/email-confirmation')
    async confirmEmail(@Query('token') token: string) {
        await this.authService.confirmEmail(token)

        return {
            message: 'Email confirmado'
        }
    }

    @Get('/reset-password')
    async resetPassword(
        @Query('token') token: string,
        @Body(ValidationPipe) changePasswordDto: ChangePasswordDto
    ): Promise<{ message: string }> {
        await this.authService.resetPassword(token, changePasswordDto)

        return {
            message: 'Senha alterada com sucesso'
        }
    }

    @Patch(':id/change-password')
    @UseGuards(AuthGuard())
    async changePassword(
        @Param('id') id: string,
        @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
        @GetUser() user: User
    ) {
        if (user.role !== UserRole.ADMIN && user.id.toString() !== id)
            throw new UnauthorizedException(
                'Você não tem permissão para realizar esta operação'
            )

        await this.authService.changePassword(id, changePasswordDto)
        return {
            message: 'Senha alterada'
        }
    }
}
