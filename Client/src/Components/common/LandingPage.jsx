import React from 'react'
import Nav from './Nav'
import '../../Styles/LandingPage.css'
import { Button } from '@mui/material'
import image from '../../Assets/Blood.png' 
import { Link } from 'react-router-dom'
import BloodDonation from '../../Assets/donation.jpg'
import image2 from '../../Assets/5299507.jpg'
import image3 from '../../Assets/image-donatio.jpg'



function LandingPage() {
    return (
        <div>

            <Nav />
            <div className='landing-container'>
                <div className='image-container'>
                    <img src={image} alt="Blood donation" className='blood-image' />
                </div>
                <div className='welcome-container'>
                    <h1 className='welcome-title'>
                        Welcome to Blood <br />
                        Donation Portal
                    </h1>
                    <p className='welcome-text'>
                        Your donation can be the lifeline someone desperately needs. Join us in making a difference 🩸 one drop at a time!
                    </p>
                    <Link to='/register'>
                    <Button variant="contained" color="primary" className='register-button'>
                        Sign up
                    </Button>
                    </Link>
                </div>
            </div>

            <div className='info-section'>
               
                <div className='info-section-content'>
                    <h2 className='info-section-title'>
                        Why Your Donation <br />
                        Matters So Much
                    </h2>
                    <p className='info-section-text'>
                        Every two seconds, someone in the U.S. needs blood. From emergency situations to ongoing medical treatments for chronic illnesses, blood donations are a constant necessity. Your decision to donate can directly impact patients facing trauma, surgeries, chronic illnesses, and more. It's a simple act with profound implications for individuals and families in crisis.
                    </p>
                </div>
                 <div className='info-section-image-container'>
                    <img src={BloodDonation} alt="Impact of blood donation" className='info-section-image' />
                </div>
            </div>

            <div className='info-section reverse'>
               
                <div className='info-section-content'>
                    <h2 className='info-section-title'>
                        Where Does Your <br />
                        Precious Gift Go?
                    </h2>
                    <p className='info-section-text'>
                        Your generous blood donation is meticulously separated into its vital components: red cells, plasma, and platelets. Each component serves a unique, critical purpose. Red cells are used for anemia, plasma for burn victims and clotting disorders, and platelets are crucial for cancer patients and others with bleeding issues. Learn more about how your single donation makes a multifaceted difference.
                    </p>
                </div>
                 <div className='info-section-image-container'>
                    <img src={image2} alt="Blood components and uses" className='info-section-image' />
                </div>
            </div>

            <div className='info-section'>
               
                <div className='info-section-content'>
                    <h2 className='info-section-title'>
                        Your Easy Path to <br />
                        Lifesaving
                    </h2>
                    <p className='info-section-text'>
                        Donating blood is a straightforward process designed for your comfort and safety. It typically involves a quick registration, a confidential health screening, the donation itself (usually 8-10 minutes for whole blood), and a short recovery time with refreshments. Our dedicated team ensures a smooth and positive experience, making it easy for you to make an extraordinary difference.
                    </p>
                </div>
                 <div className='info-section-image-container'>
                    <img src={image3} alt="Steps of blood donation process" className='info-section-image' />
                </div>
            </div>

            <div className='info-section full-width-text'>
                <div className='info-section-content'>
                    <h2 className='info-section-title'>
                        Committed to Community Health
                    </h2>
                    <p className='info-section-text'>
                        At the Blood Donation Portal, our mission is to connect generous donors with patients in urgent need. We are dedicated to creating a seamless, secure, and encouraging environment for blood donation, fostering a healthier and more resilient community for all. Your involvement helps us build a stronger future, one life-saving donation at a time.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default LandingPage