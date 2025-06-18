import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";
import { User } from "../entities/user.entity";

@Injectable()
export class UserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map(data => {
                if(Array.isArray(data)){
                    return data.map(user => {
                        const {password , ...rest} = user;
                        return rest; 
                    })
                }
                if(data && typeof data === "object"){
                    const {password , ...rest} = data;
                    return rest;
                }
                return data;
            })
        );
    }
}