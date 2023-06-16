import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });

                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            });
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>



            <div className="hero min-h-screen">
  <div className="hero-content grid grid-cols-1 md:grid-cols-2">

    <div className="text-center  md:mr-12 text-white lg:text-left">
      {/* <img src={image} alt="" /> */}
     
    </div>


    <form  onSubmit={handleLogin}  className="card flex-shrink-0 md:w-96 shadow-2xl bg-base-100">
      <div className="card-body">

        <div className="form-control">
          <label className="label">
            <span>Email</span>
          </label>
          <input  type="email" name="email" placeholder="Email" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span >Password</span>
          </label>

          <input  type="password" name="password" placeholder="password" className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
                                <label style={{ fontWeight: 'bold', display: 'block' }}>
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" style={{ border: '1px solid #ccc', padding: '0.5rem', width: '100%' }} />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <input disabled={disabled} type="submit" value="Login" style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '0.25rem', cursor: 'pointer', width: '100%' }} />
                            </div>
        
      </div>
      
      
      {/* social login */}
      {/* <SocialLogin></SocialLogin> */}

      <p className='pb-5 mx-auto'>Create an account <Link className='text-orange-400' to='/signup'>Login</Link></p>
      
    
    <SocialLogin></SocialLogin>
    </form>



  </div>
</div>




            {/* <div>
                <div >
                    <h1>Login now!</h1>
                    <p >Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <div >
                        <form >
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ fontWeight: 'bold', display: 'block' }}>Email</label>
                                <input  placeholder="email" style={{ border: '1px solid #ccc', padding: '0.5rem', width: '100%' }} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ fontWeight: 'bold', display: 'block' }}>Password</label>
                                <input  placeholder="password" style={{ border: '1px solid #ccc', padding: '0.5rem', width: '100%' }} />
                                <label>
                                    <a href="#" style={{ textDecoration: 'none', color: '#6366f1', fontSize: '0.875rem', display: 'block', marginTop: '0.5rem' }}>Forgot password?</a>
                                </label>
                            </div>
                           
                        </form>
                        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                            <small>New Here? <Link to="/signup" style={{ color: '#6366f1', textDecoration: 'none' }}>Create an account</Link></small>
                        </p>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Login;
