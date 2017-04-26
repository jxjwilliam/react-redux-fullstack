import React, {Component} from 'react';
import ContactForm from '../components/ContactForm';

class Contact extends Component {
    constructor(props) {
      super(props);
      this.submit = this.submit.bind(this);
    }

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
            </div>
        );
    }
}

export default Contact;