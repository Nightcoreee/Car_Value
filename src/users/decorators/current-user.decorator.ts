import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        // Lấy giá trị currentUser đã được gán trong interceptor
        return request.currentUser;
    }
)