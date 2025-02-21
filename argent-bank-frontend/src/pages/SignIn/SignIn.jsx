import React from 'react';
import Loginform from '../../components/Loginform/Loginform.jsx';
import "./SignIn.css";




/* Login page */
function SignIn () {
    return (
        <div className='signin-page'>
            <main className='bg-dark'>
            
                {/* Returns form component */}
                < Loginform />
            </main>
            
        </div>
        
    )
}

export default SignIn;