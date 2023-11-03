function PopupWithForm({title, name, children, isOpen, onClose}) {
    return(
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id={name}>
            <div className="popup__container">
                <button
                    type="button"
                    aria-label="Close"
                    className={`popup__close popup__close_type_${name} cursor`}
                    onClick={onClose}
                />
                <h2 className={`popup__title`}>{title}</h2>
                <form
                    className="popup__content"
                    id={name}
                    name={name}
                    noValidate=""
                >
                    {children}
                    <button type="submit" className="popup__submit">
                        Сохранить
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm