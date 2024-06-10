import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FormGroup, Input, Label } from 'reactstrap';

function UpdateList(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <React.Fragment>
            <Button variant='info' onClick={(evt) => {
                handleShow();
                props.getList(evt, props.elementId);
            }}>
                Edit
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Label for="title" className='h5 mt-3'> Book Title</Label>
                        <Input
                            type='text'
                            name='title'
                            id='title'
                            value={props.singledata.title}
                            onChange={props.handleChange}
                            className='d-block'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="author" className='h5 mt-3'>Author</Label>
                        <Input
                            type='text'
                            name='author'
                            id='author'
                            value={props.singledata.author}
                            onChange={props.handleChange}
                            className='d-block'
                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='primary' onClick={(event) => {
                        handleClose();
                        props.updateList(event, props.elementId);
                    }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default UpdateList;