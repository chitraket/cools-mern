import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, getUserDetails, loadUser, updateUser } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'

const UpdateAdmin = ({ history, match }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [checked, setChecked] = useState([]);
    const [oldImages, setOldImages] = useState([])
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, isUpdated } = useSelector(state => state.user)
    const { user } = useSelector(state => state.userDetails)
    const { user: users } = useSelector(state => state.auth)
    const userId = match.params.id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name);
            setEmail(user.email);
            setPermissionArray(user.permission);
            setOldImages(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success('User updated successfully')
            dispatch(getUserDetails(userId))
            dispatch(loadUser())
            history.push('/admin/admins')
            dispatch({
                type: UPDATE_USER_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated, user, userId])

    const setPermissionArray = permission => {
        const p = [];
        permission.map((c, i) => {
            return p.push(c)
        })
        setChecked(p)
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('permission', checked);
        formData.set('avatar', images)
        dispatch(updateUser(user._id, formData))
    }
    const handleToggle = (e) => {
        const all = [...checked]
        const clickedCategory = checked.indexOf(e)
        if (clickedCategory === -1) {
            all.push(e)
        }
        else {
            all.splice(clickedCategory, 1)
        }
        setChecked(all)
    }
    const findPermission = (e) => {
        const result = checked.indexOf(e)
        if (result !== -1) {
            return true;
        }
        else {
            return false;
        }
    }
    const onChanges = e => {

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagesPreview(reader.result)
                setImages(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    const per = [];
    users && users.permission && users.permission.map((p, i) => {
        return per.push(p);
    })
    return (
        <React.Fragment>
            {loading ? <Loader /> : (
                per.includes("52") ?
                    <React.Fragment>
                        <div className="row">
                            <div className="col-12 col-md-2">
                                <Sidebar />
                            </div>
                            <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
                                <div className="breadcrumb ptb_20">
                                    <h1>Update Admin</h1>
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li className="active">Update Admin</li>
                                    </ul>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-md-offset-3">
                                        <div className="panel-login">
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <form onSubmit={submitHandler} encType='multipart/form-data'>
                                                            <div className="form-group">
                                                                <input type="text" name="name"
                                                                    id="username" tabIndex={1} className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="email" name="email" id="email" tabIndex={1} className="form-control" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                            </div>
                                                            <div className='form-group'>
                                                                <div className='d-flex align-items-center'>
                                                                    <input
                                                                        type='file'
                                                                        name='product_images'
                                                                        className='form-control'
                                                                        id='customFile'
                                                                        onChange={onChanges}
                                                                    />
                                                                </div>
                                                                {
                                                                    imagesPreview.length ? <img src={imagesPreview} key={imagesPreview} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" /> : <img src={oldImages} key={oldImages} alt={oldImages} className="mt-3 mr-2" width="55" height="52" />
                                                                }
                                                            </div>
                                                            <div className="form-group">
                                                                <p><input type="checkbox" name="email" id="email" value="1" checked={findPermission("1")} onChange={(e) => handleToggle(e.target.value)} /> Product Add</p>
                                                                <p><input type="checkbox" name="email" id="email" value="2" checked={findPermission("2")} onChange={(e) => handleToggle(e.target.value)} /> Product Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="3" checked={findPermission("3")} onChange={(e) => handleToggle(e.target.value)} /> Product Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="4" checked={findPermission("4")} onChange={(e) => handleToggle(e.target.value)} /> Shape Add</p>
                                                                <p><input type="checkbox" name="email" id="email" value="5" checked={findPermission("5")} onChange={(e) => handleToggle(e.target.value)} /> Shape Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="6" checked={findPermission("6")} onChange={(e) => handleToggle(e.target.value)} /> Shape Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="7" checked={findPermission("7")} onChange={(e) => handleToggle(e.target.value)} /> Brand Add</p>
                                                                <p><input type="checkbox" name="email" id="email" value="8" checked={findPermission("8")} onChange={(e) => handleToggle(e.target.value)} /> Brand Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="9" checked={findPermission("9")} onChange={(e) => handleToggle(e.target.value)} /> Brand Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="10" checked={findPermission("10")} onChange={(e) => handleToggle(e.target.value)} /> Slider Add</p>
                                                                <p><input type="checkbox" name="email" id="email" value="11" checked={findPermission("11")} onChange={(e) => handleToggle(e.target.value)} /> Slider Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="12" checked={findPermission("12")} onChange={(e) => handleToggle(e.target.value)} /> Slider Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="13" checked={findPermission("13")} onChange={(e) => handleToggle(e.target.value)} /> Orders View</p>
                                                                <p><input type="checkbox" name="email" id="email" value="14" checked={findPermission("14")} onChange={(e) => handleToggle(e.target.value)} /> Orders Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="15" checked={findPermission("15")} onChange={(e) => handleToggle(e.target.value)} /> Orders Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="16" checked={findPermission("16")} onChange={(e) => handleToggle(e.target.value)} /> Orders PDF</p>
                                                                <p><input type="checkbox" name="email" id="email" value="17" checked={findPermission("17")} onChange={(e) => handleToggle(e.target.value)} /> Payment</p>
                                                                <p><input type="checkbox" name="email" id="email" value="18" checked={findPermission("18")} onChange={(e) => handleToggle(e.target.value)} /> Users Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="19" checked={findPermission("19")} onChange={(e) => handleToggle(e.target.value)} /> Users Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="20" checked={findPermission("20")} onChange={(e) => handleToggle(e.target.value)} /> Review</p>
                                                                <p><input type="checkbox" name="email" id="email" value="21" checked={findPermission("21")} onChange={(e) => handleToggle(e.target.value)} /> Color Add</p>
                                                                <p><input type="checkbox" name="email" id="email" value="22" checked={findPermission("22")} onChange={(e) => handleToggle(e.target.value)} /> Color Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="23" checked={findPermission("23")} onChange={(e) => handleToggle(e.target.value)} /> Color Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="50" checked={findPermission("50")} onChange={(e) => handleToggle(e.target.value)} /> Admin Add</p>
                                                                <p><input type="checkbox" name="email" id="email" value="51" checked={findPermission("51")} onChange={(e) => handleToggle(e.target.value)} /> Admin Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="52" checked={findPermission("52")} onChange={(e) => handleToggle(e.target.value)} /> Admin Delete</p>

                                                            </div>

                                                            <div className="form-group">
                                                                <div className="row">
                                                                    <div className="col-sm-6 col-sm-offset-3">
                                                                        <input type="submit" name="register-submit" value="Update User" id="register-submit" tabIndex={4} className="form-control btn btn-register" disabled={loading ? true : false} />
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
                    :
                    <Redirect to="/admin/error" />
            )}
        </React.Fragment>
    )
}

export default UpdateAdmin
