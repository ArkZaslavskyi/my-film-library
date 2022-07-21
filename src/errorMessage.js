export function showErrorMsg() {
    const errorRef = document.querySelector('.form__error');
    errorRef.classList.remove('is-hidden');
};

export function hideErrorMsg() {
    const errorRef = document.querySelector('.form__error');
    errorRef.classList.add('is-hidden');
};

