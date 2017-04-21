import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { Field, reduxForm } from 'redux-form'

const EditModal = ({show, close, save, onUpdate, user}) => {
  debugger;
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EditForm onSubmit={onUpdate} user={user}/>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={close}>Close</Button>
        <Button bsStyle="primary" onClick={save}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}

let EditForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const user = props.user || {};
  debugger
  return (
    <div className="row well" style={{marginTop:20}}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name{user.firstName}</label>

          <div>
            <Field name="firstName" component="input" type="text" placeholder="First Name" value={user.firstName} />
          </div>
        </div>
        <div>
          <label>Last Name{user._id}</label>

          <div>
            <Field name="lastName" component="input" type="text" placeholder="Last Name" value={user.lastName}/>
          </div>
        </div>
        <div>
          <label>Email</label>

          <div>
            <Field name="email" component="input" type="email" placeholder="Email" value={user.email}/>
          </div>
        </div>
        <div>
          <label>Data Of Birth</label>

          <div>
            <Field name="dob" component="input" type="text" placeholder="Date Of Birth" value={user.dob}/>
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Update</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    </div>
  )
}

EditForm = reduxForm({
  form: 'editForm'  // a unique identifier for this form
})(EditForm)

export default EditModal;
