import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const UserData = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    return user;
  },
);

export default UserData;
