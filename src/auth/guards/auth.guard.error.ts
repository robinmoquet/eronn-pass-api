export class AuthGuardError extends Error {
    name: string = 'auth.guard.error';
    message: string;

    constructor(message?: string) {
        super(message);
        if (!message) message = 'This user cannot access at this resource';
        this.message = message;
    }
}
