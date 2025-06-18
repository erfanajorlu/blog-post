import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map(data => {
                function removePassword(obj) {
                    if (Array.isArray(obj)) {
                        return obj.map(removePassword);
                    }
                    if (obj && typeof obj === 'object') {
                        const { password, ...rest } = obj;
                        // Recursively remove password from nested user objects
                        for (const key in rest) {
                            rest[key] = removePassword(rest[key]);
                        }
                        return rest;
                    }
                    return obj;
                }
                return removePassword(data);
            })
        )
    }
}