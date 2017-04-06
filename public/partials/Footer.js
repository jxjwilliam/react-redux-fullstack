import React, { Component } from 'react'

class Footer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <p class="text-center text-muted">© Copyright 2017 William Jiang</p>
        )
    }
}
export default Footer;

export const Foot = () => (
    <section>
        <p class="text-center text-muted">
            &copy; Copyright 2017, William Jiang
        </p>
    </section>
)