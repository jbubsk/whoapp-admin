class ErrorHandler {

    constructor() {
        this.errors = {
            1062: 'Данный интерес уже существует',
            1451: 'Данный интерес используется',
            400: 'Неверные логин/пароль',
            401: 'Неверные логин/пароль',
            500: 'Извините, временые проблемы на сервере',
            503: 'Сервер не доступен'
        };
        this.errorMessage = '';
    }

    handleError(errorCode) {
        var error = this.errors[errorCode];

        if(!error){
            error = errorCode;
        }
        this.errorMessage = error;
    }

    hideError() {
        this.errorMessage = '';
    }

}

export default ErrorHandler;