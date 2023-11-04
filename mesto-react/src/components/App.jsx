import '../index.css'
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import api from "../utils/api.js";
import {useState, useEffect} from "react";

function App() {
    //пишем [переменные is и их внутреннее состояние setIs] для открытия попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    //const [isDeleteCard, setIsDeleteCard] = useState(false) //попап удаления своей карточки

    //функции обработчики событий, которые изменяют внутреннее состояние
    function handleEditProfileClick() { //редактирование профиля
        setIsEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick() { //добавление картинки
        setIsAddPlacePopupOpen(true)
    }
    function handleEditAvatarClick() { //редактирование аватара
        setIsEditAvatarPopupOpen(true)
    }

    // function handleDeleteCard() { //попап удаления своей карточки заготовка
    //     setIsDeleteCard(true)
    // }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCard({})
    }

    // переменная состояния имени, о себе и аватара для запроса их с сервера
    const [userData, setUserData] = useState({
        name: '',
        about: '',
        avatar: ''
    })

    // переменная состояния для массива карточек и запрос на сервер за ними
    const [cardItem, setCardItem] = useState([])

    useEffect(() => { //используем хук для монтирования данных на страницу
        api.getUserProfile() //данные пользователя
            .then((data) => {
                setUserData({
                    name: data.name,
                    about: data.about,
                    avatar: data.avatar
                })
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            });
        api.getInitialCards() // данные карточек
            .then((data) => {
                setCardItem(data)
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            });
    }, []);

    //стейт-переменная открытия карточки на весь экран
    const [isSelectedCard, setSelectedCard] = useState({})
    function handleOpenFullScreenCard(card) {
        setSelectedCard(card)
    }

  return (
      <>
          <Header/>
          <Main
              onEditProfile={handleEditProfileClick} //редактирование профиля
              onAddPlace={handleAddPlaceClick} //добавление картинки
              onEditAvatar={handleEditAvatarClick} //редактирование аватара
              cardItem={cardItem}
              userData={userData}
              onCardClick={handleOpenFullScreenCard}
              //onDeleteCard={handleDeleteCard} //попап удаления своей карточки
          />
          <Footer/>
          <PopupWithForm
              name="edit-profile"
              title='Редактировать профиль'
              //в коде App значение isOpen каждого из трёх попапов
              //должно задаваться с помощью соответствующей переменной состояния (из тз 10пр для понимания)
              isOpen={isEditProfilePopupOpen} //переменная состояния
              onClose={closeAllPopups}
          >
              <input
                  type="text"
                  name="UserName"
                  defaultValue=""
                  id="name-input"
                  className="popup__input popup__input_type_name"
                  minLength={2}
                  maxLength={40}
                  required=""
                  placeholder="Введите имя"
              />
              <span
                  id="UserName-error"
                  className="popup__span-error name-input-error"
              />
              <input
                  type="text"
                  name="UserJob"
                  defaultValue=""
                  id="job-input"
                  className="popup__input popup__input_type_job"
                  minLength={2}
                  maxLength={200}
                  required=""
                  placeholder="Коротко о себе"
              />
              <span
                  id="UserJob-error"
                  className="popup__span-error job-input-error"
              />
          </PopupWithForm>

          <PopupWithForm
              name='avatar-profile'
              title='Обновить аватар'
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
          >
              <input
                  type="url"
                  name="AvatarLink"
                  id="avatar-input"
                  defaultValue=""
                  className="popup__input popup__input_type_link"
                  placeholder="Ссылка на картинку"
                  required=""
              />
              <span
                  id="AvatarLink-error"
                  className="popup__span-error avatar-input-error"
              />
          </PopupWithForm>

          <PopupWithForm
              name='add-card'
              title='Новое место'
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
          >
              <input
                  type="text"
                  name="UserPlace"
                  defaultValue=""
                  id="place-input"
                  className="popup__input popup__input_type_place"
                  placeholder="Название"
                  minLength={2}
                  maxLength={30}
                  required=""
              />
              <span
                  id="UserPlace-error"
                  className="popup__span-error place-input-error"
              />
              <input
                  type="url"
                  name="UserLink"
                  defaultValue=""
                  id="link-input"
                  className="popup__input popup__input_type_link"
                  placeholder="Ссылка на картинку"
                  required=""
              />
              <span
                  id="UserLink-error"
                  className="popup__span-error link-input-error"
              />
          </PopupWithForm>

          {/*<PopupWithForm*/}
          {/*    name='delete-card'*/}
          {/*    title='Вы уверены?'*/}
          {/*    isOpen={isDeleteCard}*/}
          {/*    onClose={closeAllPopups}*/}
          {/*>*/}
          {/*</PopupWithForm>*/}

          <ImagePopup
              card={isSelectedCard}
              onClose={closeAllPopups}
              isOpen={isSelectedCard._id !== undefined}
          />
      </>
  )
}

export default App
