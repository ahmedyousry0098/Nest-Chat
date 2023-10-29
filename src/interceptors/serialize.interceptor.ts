import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import {Observable, map} from 'rxjs'

interface EntityDTO {
  new (...args: any[]): {}
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private _Dto: EntityDTO) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data) => {
        return plainToInstance(this._Dto, data, {
          excludeExtraneousValues: true
        })
      })
    )
  }
}