import React, { PropsWithChildren } from 'react';
import { Modal, Button } from "react-bootstrap";
import { Left } from 'react-bootstrap/lib/Media';
import image from "../Admin/Page/images/Load.gif";
type Iprop<T>={
    displayname: string;
    modalshow:boolean;
    handleClose:()=>void;
    
  }

const ModalComponent=<T,>(props:PropsWithChildren<Iprop<T>>) => {
  
return(
    <Modal
    show={props.modalshow}
    onHide={props.handleClose}
    dialogClassName="my-modal"
    className="modal" >

    <Modal.Header className="modal-header" closeButton>
      <Modal.Title> {props.displayname}</Modal.Title>
    </Modal.Header>


    <Modal.Body className="modal-body">

       {props.children}
    </Modal.Body>

    {/* <Modal.Footer>
      <Button onClick={props.handleClose}>Close</Button>
   
    </Modal.Footer> */}

  </Modal>

)


}


export default ModalComponent;