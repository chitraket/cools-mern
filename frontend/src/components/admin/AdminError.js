import React from 'react'
import MetaData from '../layout/MetaData'
function AdminError() {
    return (
        <React.Fragment>
            <MetaData title={'You Are Not Allowed to Access This Page'} />
            <React.Fragment>
                <div className=" text-center">
                    <img src="../../images/admin-error.png" style={{ height: "400px" }} alt="You Are Not Allowed to Access This Page" />
                    <h2 className={`mb_40`} >Sorry, You Are Not Allowed to Access This Page</h2>
                </div>
            </React.Fragment>
        </React.Fragment>
    )
}

export default AdminError
