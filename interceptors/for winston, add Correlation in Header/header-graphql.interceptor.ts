 
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Header } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


/*
* Interceptor for add Correlation id of Headers.
* Only GraphQl
*/

export const CORRELATION_ID_HEADER = 'X-Correlation-Id'

@Injectable()
export class HeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const id = randomUUID();

    // Context GraphQl
    const ctx = GqlExecutionContext.create(context);

    console.log('Before...');

   // return next.handle();

     return next
    .handle()
    .pipe(
      tap(() => {

        const response = ctx.getContext().res
        /* if ((context.getType() as string) === 'graphql'){
        } */
        // SET HEADERS
        response.header(CORRELATION_ID_HEADER, id)

        //console.log(response)

      }))
  }
}
