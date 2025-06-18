import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'نام باید یک رشته باشد' })
    @IsNotEmpty({ message: 'نام نباید خالی باشد' })
    username: string;

    @IsString({ message: 'رمز عبور باید یک رشته باشد' })
    @MinLength(6, { message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' })
    password: string;
}