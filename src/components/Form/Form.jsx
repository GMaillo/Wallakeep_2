import React from 'react';
import withForm from './withForm.js';

const Form = ({children, ...props}) => <form {...props}> {children} </form>;

export default withForm(Form);