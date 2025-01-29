import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const resourceOwnerId = request.params.id;

        if (!user) {
            throw new ForbiddenException('User not authenticated');
        }

        if (!resourceOwnerId) {
            throw new ForbiddenException('Resource owner ID not provided');
        }

        if (user.id !== +resourceOwnerId) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return user.id === +resourceOwnerId;
    }
}