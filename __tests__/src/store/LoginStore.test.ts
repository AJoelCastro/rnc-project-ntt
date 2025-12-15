
import { useLogin } from '@/store/LoginStore';

describe('LoginStore', () => {
    const initialState = {
        userData: null,
    };

    beforeEach(() => {
        useLogin.setState(initialState);
    });

    it('should have initial state null', () => {
        expect(useLogin.getState().userData).toBeNull();
    });

    it('should set user data correctly', () => {
        const mockUser = {
            idUser: 1,
            name: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            phone: '1234567890',
            token: 'token123',
        };

        useLogin.getState().setUserData(mockUser);
        expect(useLogin.getState().userData).toEqual(mockUser);
    });

    it('should clear user data correctly', () => {
        const mockUser = {
            idUser: 1,
            name: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            phone: '1234567890',
            token: 'token123',
        };

        useLogin.getState().setUserData(mockUser);
        expect(useLogin.getState().userData).toEqual(mockUser);

        useLogin.getState().clearUserData();
        expect(useLogin.getState().userData).toBeNull();
    });
});
