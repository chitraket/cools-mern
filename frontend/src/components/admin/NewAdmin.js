import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, addAdmins } from '../../actions/userActions'
import { ADD_ADMINS_RESET } from '../../constants/userConstants'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

const NewAdmin = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { error, loading, success } = useSelector(state => state.addAdmin)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imagesPreview, setImagesPreview] = useState([])
    const [checked, setChecked] = useState([]);
    const [images, setImages] = useState([])

    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            history.push('/admin/admins')
            alert.success('Admin created successfully')
            dispatch({ type: ADD_ADMINS_RESET })
        }
    }, [dispatch, alert, error, success, history])
    const per = [];
    user && user.permission && user.permission.map((p, i) => {
        return per.push(p);
    })
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', images);
        formData.set('permission', checked);
        dispatch(addAdmins(formData))
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
    return (
        <React.Fragment>
            {loading ? <Loader /> : (
                per.includes("50") ?
                    <React.Fragment>
                        <div className="row">
                            <div className="col-12 col-md-2">
                                <Sidebar />
                            </div>
                            <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
                                <div className="breadcrumb ptb_20">
                                    <h1>New Admin</h1>
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li className="active">New Admin</li>
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
                                                                <input type="text" id="name_field" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="email" id="name_field" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="text" id="name_field" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                            </div>
                                                            <div className='form-group'>
                                                                <div className='d-flex align-items-center'>
                                                                    <input
                                                                        type='file'
                                                                        name='product_images'
                                                                        className='form-control'
                                                                        id='customFile'
                                                                        accept="iamges/*"
                                                                        onChange={onChanges}
                                                                    />
                                                                </div>
                                                                <img src={imagesPreview} key={imagesPreview} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                                            </div>
                                                            <div className="form-group">
                                                                <p><input type="checkbox" name="email" id="email" value="1" onChange={(e) => handleToggle(e.target.value)} /> Product Add</p>
                                                                <p><input type="checkbox" name="email" id="email" value="2" onChange={(e) => handleToggle(e.target.value)} /> Product Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="3" onChange={(e) => handleToggle(e.target.value)} /> Product Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="4" onChange={(e) => handleToggle(e.target.value)} /> Shape Add</p>
                                                                <p><input type="checkbox" name="email" id="email" value="5" onChange={(e) => handleToggle(e.target.value)} /> Shape Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="6" onChange={(e) => handleToggle(e.target.value)} /> Shape Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="7" onChange={(e) => handleToggle(e.target.value)} /> Brand Add</p>
                                                                <p><input type="checkbox" name="email" id="email" value="8" onChange={(e) => handleToggle(e.target.value)} /> Brand Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="9" onChange={(e) => handleToggle(e.target.value)} /> Brand Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="10" onChange={(e) => handleToggle(e.target.value)} /> Slider Add</p>
                                                                <p><input type="checkbox" name="email" id="email" value="11" onChange={(e) => handleToggle(e.target.value)} /> Slider Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="12" onChange={(e) => handleToggle(e.target.value)} /> Slider Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="13" onChange={(e) => handleToggle(e.target.value)} /> Orders View</p>
                                                                <p><input type="checkbox" name="email" id="email" value="14" onChange={(e) => handleToggle(e.target.value)} /> Orders Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="15" onChange={(e) => handleToggle(e.target.value)} /> Orders Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="16" onChange={(e) => handleToggle(e.target.value)} /> Orders PDF</p>
                                                                <p><input type="checkbox" name="email" id="email" value="17" onChange={(e) => handleToggle(e.target.value)} /> Payment</p>
                                                                <p><input type="checkbox" name="email" id="email" value="18" onChange={(e) => handleToggle(e.target.value)} /> Users Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="19" onChange={(e) => handleToggle(e.target.value)} /> Users Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="20" onChange={(e) => handleToggle(e.target.value)} /> Review</p>
                                                                <p><input type="checkbox" name="email" id="email" value="21" onChange={(e) => handleToggle(e.target.value)} /> Color Add</p>
                                                                <p><input type="checkbox" name="email" id="email" value="22" onChange={(e) => handleToggle(e.target.value)} /> Color Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="23" onChange={(e) => handleToggle(e.target.value)} /> Color Delete</p>
                                                                <p><input type="checkbox" name="email" id="email" value="50" onChange={(e) => handleToggle(e.target.value)} /> Admin Add</p>
                                                                <p><input type="checkbox" name="email" id="email" value="51" onChange={(e) => handleToggle(e.target.value)} /> Admin Update</p>
                                                                <p><input type="checkbox" name="email" id="email" value="52" onChange={(e) => handleToggle(e.target.value)} /> Admin Delete</p>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="row">
                                                                    <div className="col-sm-6 col-sm-offset-3">
                                                                        <input type="submit" name="register-submit" value="Add Admin" id="register-submit" tabIndex={4} className="form-control btn btn-register" disabled={loading ? true : false} />
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

export default NewAdmin
