function ImagePopup() {
    return(
        <div className="popup popup_fullscreen" id="fullscreen-card">
            <div className="popup__cards">
                <button
                    type="button"
                    aria-label="Close"
                    className="popup__close popup__close_type_fullscreen cursor"
                />
                <figure className="popup__cards">
                    <img src=".." alt="" className="popup__image" />
                    <figcaption className="popup__caption" />
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup