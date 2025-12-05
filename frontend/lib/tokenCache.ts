// TokenManager.ts
class TokenManager {
    private readonly accessTokenKey = 'access_token';
    private readonly refreshTokenKey = 'refresh_token';

    getAccessToken(): string | null {
        return this.getCookie(this.accessTokenKey);
    }

    getRefreshToken(): string | null {
        return this.getCookie(this.refreshTokenKey);
    }

    clearTokens(): void {
        this.setCookie(this.accessTokenKey, '', -1);
        this.setCookie(this.refreshTokenKey, '', -1);
    }

    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }

    private getCookie(name: string): string | null {
        if (typeof document === 'undefined') return null; // SSR safety
        
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const cookieValue = parts.pop()?.split(';').shift();
            return cookieValue || null;
        }
        return null;
    }

    private setCookie(name: string, value: string, days: number): void {
        if (typeof document === 'undefined') return;
        
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/; Secure; SameSite=Lax`;
    }
}

export const tokenManager = new TokenManager()