import React, {Component} from 'react';
import ContactForm from '../components/ContactForm';
import SimpleForm from '../components/SimpleForm'

class Contact extends Component {
    submit = (values) => {
        // Do something with the form values
        console.log(values);
    }

    render() {
        return (
            <div className="container">
                <h3><a href="http://redux-form.com/6.6.2/docs/GettingStarted.md/">Redux Form</a></h3>

                <div className="row">
                    <ContactForm onSubmit={this.submit}/>
                </div>
                <h3><a href=" http://redux-form.com/6.6.1/examples/simple/">Redux SimpleForm</a></h3>

                <div className="row">
                    <SimpleForm onSubmit={this.submit}/>
                </div>
            </div>
        );
    }
}

export default Contact;