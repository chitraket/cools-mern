import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, getUserDetails, updateUser} from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import Sidebar from './Sidebar'

const UpdateUser = ({ history , match }) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [role,setRole] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,isUpdated } = useSelector(state => state.user)
    const { user } = useSelector(state => state.userDetails)
    const userId = match.params.id;
    useEffect(() => {
        if(user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        }else{
           setName(user.name);
           setEmail(user.email);
           setRole(user.role);
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success('User updated successfully')

            history.push('/admin/users')
            dispatch({
                type: UPDATE_USER_RESET
            })
        }

    }, [dispatch,alert,error,history,isUpdated,user,userId])
    const submitHandler = (e) => {
        e.preventDefault();

        const formData =  new FormData();
        formData.set('name',name);
        formData.set('email',email);
        formData.set('role',role);
        dispatch(updateUser(user._id,formData))
    }
    return (
        <React.Fragment>
                         <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
                <div className="breadcrumb ptb_20">
              <h1>Update User</h1>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li className="active">Update User</li>
              </ul>
            </div>
                <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel-login">
            <div className="panel-body">
              <div className="row">
                <div className="col-lg-12">
                  <form  onSubmit={submitHandler} encType='multipart/form-data'>
                    <div className="form-group">
                      <input type="text" name="name"
                       id="username" tabIndex={1} className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <input type="email" name="email" id="email" tabIndex={1} className="form-control" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                    {/* <div className='form-group'>
                            <div className='d-flex align-items-center'>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="iamges/*"
                                        onChange={onChange}
                                    />
                                </div>
                                
                            </div> */}
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="register-submit" value="Update User" id="register-submit" tabIndex={4} className="form-control btn btn-register" disabled={loading ? true:false} />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            </div>
            </div>
            </React.Fragment>
    )
}

export default UpdateUser
