import PopupWithForm from "./PopupWithForm.jsx";
import card from "./Card.jsx";

function DeleteCardPopup({isOpen, onClose, onDeleteCard}) {

    // function handleDeleteCard (e) {
    //     // Запрещаем браузеру переходить по адресу формы
    //     e.preventDefault();
    //
    //     onDeleteCard(card._id)
    // }

    return(
        <PopupWithForm
            name='delete-card'
            title='Вы уверены?'
            buttonText='Да'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onDeleteCard}
        />
    )
}

export default DeleteCardPopup