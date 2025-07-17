import { BaseApiClient } from '@lib/api/base-api-client';
import { HttpClient } from '@services/http-client';

export class UsersApiClient extends BaseApiClient {
    constructor(httpClient: HttpClient) {
        super('api/users', httpClient);
    }

    // async updateProfile(data: Partial<User>): Promise<User> {
    //     return this.httpClient.patch<User>(this.buildEndpoint('/me'), data);
    // }
    //
    // async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    //     return this.httpClient.post<void>(this.buildEndpoint('/change-password'), {
    //         oldPassword,
    //         newPassword
    //     });
    // }
}
