class AppError extends Error {
    status;
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}
export default AppError;
