import React from 'react';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state={
            email:'',
            password: '',

        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({ email:'', password:'' });
        }catch(error){
            console.log(error)
        }

    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({ [name] : value });
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign In with your Email and Password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" handleChange={this.handleChange} label="Email" value={this.state.email} required/>
                    <FormInput name="password" type="password" handleChange={this.handleChange} label="Password" value={this.state.password} required/>
                    
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn={true}>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;