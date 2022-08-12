import React from 'react';
import Uni from '../assets/uni.png';

class HelloUniverse extends React.Component{
    render() {
        return (
            <div>
                <img src={Uni} width="100%">

                </img>
            </div>
        );
    }
}

export default HelloUniverse;