import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { getColorDetails, updateColor, clearErrors } from '../../actions/productsActions'
import { UPDATE_COLOR_RESET } from '../../constants/productConstants'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

const UpdateColor = ({ history, match }) => {
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const alert = useAlert()
    const dispatch = useDispatch()
    const { error, color } = useSelector(state => state.colorDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.colors);
    const { user } = useSelector(state => state.auth)
    const colorId = match.params.id;
    useEffect(() => {
        if (color && color._id !== colorId) {
            dispatch(getColorDetails(colorId))
        } else {
            setName(color.name);
            setCode(color.code);
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            dispatch(getColorDetails(colorId))
            history.push('/admin/colors')
            alert.success('Color Updated successfully')
            dispatch({ type: UPDATE_COLOR_RESET })
        }
    }, [dispatch, alert, error, isUpdated, history, updateError, colorId, color])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('code', code)
        dispatch(updateColor(color._id, formData))
    }
    const per = [];
    user && user.permission && user.permission.map((p, i) => {
        return per.push(p);
    })
    return (
        <React.Fragment>
            {loading ? <Loader /> : (
                per.includes("22") ?
                    <React.Fragment>
                        <div className="row">
                            <div className="col-12 col-md-2">
                                <Sidebar />
                            </div>
                            <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
                                <div className="breadcrumb ptb_20">
                                    <h1>Update Color</h1>
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li className="active">Update Color</li>
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
                                                                <input type="text" id="name_field" className="form-control" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="row">
                                                                    <div className="col-sm-6 col-sm-offset-3">
                                                                        <input type="submit" name="register-submit" value="Update Color" id="register-submit" tabIndex={4} className="form-control btn btn-register" disabled={loading ? true : false} />
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
                    : <Redirect to="/admin/error" />
            )}
        </React.Fragment>
    )
}

export default UpdateColor
