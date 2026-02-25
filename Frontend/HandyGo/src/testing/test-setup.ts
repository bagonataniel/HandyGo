import { Provider } from "@angular/core";
import { AuthService } from "../app/services/auth.service";

export const authServiceMock: Provider = {
    provide: AuthService,
    useValue: {
        isLoggedIn: () => true,
        getToken: () => "mock-token",
        login: () => {},
        logout: () => {},
        setVerified: (verified: boolean) => null,
        isVerified: () => true
    }
}