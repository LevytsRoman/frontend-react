import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { ProfileType } from '../../types';
import TintedHeader from '../misc/TintedHeader';
import TextInput from '../fields/Text';
import TextArea from '../fields/TextArea';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from '../../constants/utils';
import { required } from '../../constants/validation';

class ProfileEdit extends React.Component {
    static propTypes = {
        profile: ProfileType,
        initialValues: PropTypes.object,
        onSubmit: PropTypes.func,
        handleSubmit: PropTypes.func,
    }

    render() {
        const renderProjects = ({ fields, meta: { error } }) => (
            <div className="row">
                {fields.map((project, index) => (
                    <div key={index} className="row">
                        <div className="col-sm-6">
                            <Field
                                name={`${project}.name`}
                                type="text"
                                component={ TextInput }
                                label={`Project #${index + 1} Name`}
                                placeholder="Name" />
                        </div>
                        <div className="col-sm-5 col-xs-5">
                            <Field
                                name={`${project}.url`}
                                type="text"
                                component={ TextInput }
                                label="Url"
                                placeholder="Url"/>
                        </div>
                        <div className="col-xm-1 col-xs-1">
                            <button
                                type="button"
                                className="btn btn-danger pull-right"
                                title="Remove Project"
                                onClick={() => fields.remove(index)}>
                                <span>-</span>
                            </button>
                        </div>
                        <div className="col-xs-12">
                            <Field
                                name={`${project}.description`}
                                type="text"
                                component={ TextInput }
                                label="Description"
                                placeholder="Short description" />
                        </div>
                    </div>
                )
                )}
                {error && <li className="error">{error}</li>}
                <div>
                    <button type="button" className="btn btn-primary" onClick={() => fields.push()}>
                        + Add Project
                    </button>
                </div>
            </div>
        );

        const { profile = { avatar: {}, profile: {}}, onSubmit, handleSubmit } = this.props;
        return (
            <div>
                <TintedHeader title="Edit Profile" />
                <section className="form">
                    <div className="container">
                        <Link to="/profile" className="btn"><i className="icon-left-1" />Profile</Link>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="row">
                                <div className="col-sm-7">
                                    <Field name="avatar.url"
                                        validate={[ required('Please enter an url for your profile picture.')]}
                                        component={ TextInput } label="Avatar Url" type="text" />
                                    <Field name="name"
                                        validate={[ required('Please enter your name.')]}
                                        component={ TextInput } label="Name" type="text" />
                                    <Field name="profile.tagline"
                                        component={ TextInput } label="Tagline" type="text" />
                                </div>
                                <div className="col-sm-5">
                                    {profile.avatar && <img className="img-rounded" height="100" src={profile.avatar.url} alt={profile.name} />}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-7">
                                    <Field name="profile.bio"
                                        component={ TextArea } label="Bio" type="text" />
                                    <Field name="profile.company"
                                        component={ TextInput } label="Company" type="text" />
                                    <Field name="profile.twitter_url"
                                        placeholder="https://twitter.com/david"
                                        component={ TextInput } label="Twitter" type="text" />
                                    <Field name="profile.linkedin_url"
                                        placeholder="https://linkedin.com/in/david"
                                        component={ TextInput } label="LinkedIn" type="text" />
                                    <Field name="profile.blog"
                                        placeholder="https://medium.com/@dvidsilva"
                                        component={ TextInput } label="Blog" type="text" />
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <h2>Projects</h2>
                                <p>Add links to the projects you feel the most proud of, and want others to see in your profile.</p>
                                <FieldArray name="projects" component={ renderProjects } />
                            </div>
                            <div className="col-xs-12">
                                <Link to="/profile" className="btn"><i className="icon-cancel" />Discard</Link>
                                <button type="submit" className="btn btn-primary"><i className="icon-thumbs-up-1" /> Submit</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const defaults = { projects: [] };
    const profile = Object.assign({}, defaults, ownProps.profile);
    return {
        profile,
        initialValues: profile,
        onSubmit: ownProps.onSubmit || noop,
    };
};

export default connect(mapStateToProps, null)(reduxForm({
    form: 'profile/edit',
})(ProfileEdit));
