import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ErrorInterceptor } from './interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ErrorInterceptor())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const messages = errors.flatMap(
        err => Object.values(err.constraints || {})
      )
      return new BadRequestException({
        message: messages,
        error: "درخواست نامعتبر",
        statusCode: HttpStatus.BAD_REQUEST
      })
    }
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
