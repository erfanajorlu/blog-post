import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            catchError(err => {
                if (err instanceof HttpException) {
                    return throwError(() => err);
                }
                return throwError(
                    () => {
                        new HttpException({
                            status: HttpStatus.INTERNAL_SERVER_ERROR,
                            error: "مشکل داخلی پیش اومده."
                        },
                            HttpStatus.INTERNAL_SERVER_ERROR
                        )
                    }
                )
            })
        );
    }
}