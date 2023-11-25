class AppError extends Error {
    status: any;
    constructor(message: string,status: any) {
    super()
    this.message = message;
    this.status = status;
} 
}

export default AppError  