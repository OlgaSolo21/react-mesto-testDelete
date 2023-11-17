import PopupWithForm from "./PopupWithForm.jsx";
import {useEffect, useRef} from "react";

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {

    const avatarRef = useRef() // используем реф, чтобы получить прямой доступ к DOM-элементу инпута и его значению
    useEffect(() => { // монтируем эффект и указывает значение пустую строку
        avatarRef.current.value = "";
    }, [isOpen])
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
        e.target.reset() // очищаем инпут попапа для последующиего обновления аватара
    }

    return (
        <PopupWithForm
            name='avatar-profile'
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={onClose}
            buttonText='Обновить'
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                name="AvatarLink"
                id="avatar-input"
                defaultValue=""
                className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку"
                required=""
                ref={avatarRef}
            />
            <span
                id="AvatarLink-error"
                className="popup__span-error avatar-input-error"
            />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;