import React from 'react'
import Header from '../../components/Header'
import './about.css'

const About = () => {
    return (
        <>
            <Header />
            <div className="about_container">
                <p>
                    Online Bidding App : An application of online auction in which user can
                    auction their items and get decent price for it.
                </p>
            </div>
        </>
    )
}

export default About