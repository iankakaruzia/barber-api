import { ROLES_KEY } from '@infra/http/decorators/roles.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@shared/enums/role.enum';
import { User } from '@core/domain/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user }: { user: User } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user.role === role);
  }
}
