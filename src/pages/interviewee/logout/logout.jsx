import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';


const Logout = () => {
    const [isLoading, setIsLoading] = useState(false);




    useEffect(() => {
        setTimeout(() => {
            localStorage.clear();
            window.location = '/login'
        }, 1000);
    }, []);


    return (
        <div>
            {isLoading == false ?
                <div className="spinner">
                    <Spin />
                </div> : null}
        </div>
    );
};

export default Logout;