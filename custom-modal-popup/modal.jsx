

export default function Modal({id, header, body, footer, close}){
    return(
        <div id = {id || "modal"}className="modal">
          <div className="content">
            <div className="header">
                <span onClick ={close} className="close-modal-icon">&times;</span>
                <h2>{header ? header : "Header"}</h2>
            </div>
            <div className="body">
                <p>{body? body : "This is the Modal body" }</p>
            </div>
            <div className="footer">
                <h3>{footer? footer : "Footer"}</h3>
            </div>
          </div>
        </div>
    )
}