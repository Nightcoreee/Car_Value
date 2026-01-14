import { 
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Next
} from "@nestjs/common";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        //Run something before a request is handled
        console.log('Its running before the handler', context);
        
        return handler.handle().pipe(
            map((data: any) => {
            //Run something before a response is sent out
            console.log('Its running before a response is sent out', data);    
            })
        )
    }
}