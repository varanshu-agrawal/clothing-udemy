import React from 'react';

import Directory from '../../components/directory/directory.component';
import MenuItem from '../../components/menu-item/menu-item.component';

import {HomePageContainer} from './homepage.styles.jsx'

const HomePage = ({history}) => (
    <HomePageContainer>
        <Directory/>
    </HomePageContainer>
)

export default HomePage;