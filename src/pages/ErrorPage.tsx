const ErrorPage = () => {
    return (
        <div className="max-w-screen-lg mx-auto px-1 py-4 text-xl">
            <p><strong>Сталася помилка!</strong></p>
            <p>
                Якщо ваша ласка, надішліть листа на поштову адресу <strong>
                    <a href="mailto:bkovtunovych@gmail.com">bkovtunovych@gmail.com</a>
                </strong>. Опишіть детально ваші операції з додатком. Це значно допоможе знайти причину проблеми.
                Вибачте за незручності {":("}
            </p>
        </div>
    );
};

export default ErrorPage;
