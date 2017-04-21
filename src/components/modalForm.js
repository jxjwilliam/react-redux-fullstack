import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { Field, reduxForm } from 'redux-form'

const EditModal = ({show, close, onUpdate, user}) => {
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
      </Modal.Footer>
    </Modal>
  )
}

//<Field component={(props)=><input type="text" placeholder="Last Name" value={props.user.lastName} onChange={()=>{}} .../>
const renderField = ({input, label, fieldValue}) => {
  return (
    <div>
      <label>{label}</label>

      <div>
        <input {...input} placeholder={label} value={fieldValue}/>
      </div>
    </div>
  )
};


/**
 * handleSubmit(values => {
  this.props.onSubmit({
    ...values,
    myField: event.target.value
  });
})(); // add parentheses here
 */
let EditForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const user = props.user || {};
  return (
    <div className="row well" style={{marginTop:20}}>
      <form onSubmit={handleSubmit}>
        <Field name="firstName" fieldValue={user.firstName} label="First Name" component={renderField}/>
        <Field name="lastName" fieldValue={user.lastName} label="Last Name" component={renderField}/>
        <Field name="email" fieldValue={user.email} label="Email" component={renderField}/>
        <Field name="dob" fieldValue={user.dob} label="Date of Birth" component={renderField}/>
        <Field name="id" user={user} component={props=><input type="hidden" name="id" value={user._id} />}/>
        <button type="submit" className="btn btn-primary" disabled={submitting}>Update</button>
        <button type="button" className="btn btn-warning" disabled={pristine || submitting} onClick={reset}>Clear
          Values
        </button>
      </form>
    </div>
  )
};

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.user
  }
}

EditForm = reduxForm({
  form: 'editForm'  // a unique identifier for this form
}, mapStateToProps)(EditForm)

export default EditModal;
