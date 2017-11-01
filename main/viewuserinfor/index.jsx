import React, {
    Component
} from 'react';
import ZmitiCompanyApp from '../components/companyinfo/index.jsx'

import {
    Link
} from 'react-router';
import MainUI from '../components/Main.jsx';

import {
    ZmitiValidateUser
} from '../public/validate-user.jsx';


class ZmitiViewUserInforApp extends Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {

        var mainComponent =
            <div>
				<ZmitiCompanyApp></ZmitiCompanyApp>
			</div>

        return (
            <MainUI component={mainComponent}></MainUI>
        );
    }


}

export default ZmitiValidateUser(ZmitiViewUserInforApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/