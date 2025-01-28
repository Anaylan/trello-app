import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        // const request = context.switchToHttp().getRequest();
        // const user = request.user;
        // const resourceOwnerId = request.params.userId;
        return true;
    }
}