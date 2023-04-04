import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';




@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (roles.includes(user.role) == false){
      throw new HttpException(
        `The user does not have the necessary permissions to execute the action`,
        HttpStatus.FORBIDDEN);
    }


    return roles.includes(user.role)

  }
}
