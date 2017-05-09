import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
const { DOM: { input } } = React
import 'react-widgets/dist/css/react-widgets.css'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const SubmitValidationForm = (props) => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit(props.onSubmit)} className="login-form form-inline">
      <div className="form-group">
        <Field name="account" type="text" component={renderField} label="Username"/>
      </div>
      <div className="form-group">
        <Field name="pass" type="password" component={renderField} label="Password"/>
      </div>
      <div className="form-group">
        {error && <strong>{error}</strong>}
      </div>
      <div className="form-group">
        <button type="submit" disabled={submitting} className="btn btn-success">Log In</button>
        <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-warning">Clear
          Values
        </button>
      </div>
    </form>
  )
}


export default reduxForm({
  form: 'submitValidation',
  fields: ['account', 'pass'] // we send only field names here
})(SubmitValidationForm)
