import React from 'react';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Loading from './Layout/Loading';
import Transfers from './Transfers'

const Layout = props => {

    const { state } = props

    return (

        <main>

            <Header />

            {
                !state.loading 
                    ? <Transfers {...props} />
                    : <Loading />
            }

            <Footer />

        </main>

    )

}

export default Layout;