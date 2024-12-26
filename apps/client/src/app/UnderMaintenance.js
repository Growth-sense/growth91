import React from 'react';
import { Link } from 'react-router-dom';

const MaintenancePage = () => {
    return (
        <div style={styles.container}>
            <div className="icons">
                <span className="icon icon-gear icon-spin right slow one"></span>
                <span className="icon icon-gear icon-spin left two"></span>
                <span className="icon icon-gear icon-spin left three"></span>
            </div>

            <article>
                <h1>Sorry, we’re currently down for maintenance.</h1>
                <div>
                    <p>We apologize for the inconvenience and will be back up shortly.</p>
                </div>
                <div>
                    <Link to="/">Back to Home</Link>
                </div>
            </article>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '150px 0',
        background: '#fff',
        fontFamily: 'Nunito, sans-serif',
        fontSize: '25px',
        lineHeight: '1.4',
        color: '#009bdb',
        fontWeight: 400,
        margin: '0 auto',
        maxWidth: '650px',
        padding: '0 10px',
        color: '#737373',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
};

export default MaintenancePage;
