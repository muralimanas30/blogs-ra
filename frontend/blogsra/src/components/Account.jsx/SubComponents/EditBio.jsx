import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './EditBio.css';
import { useAuthContext } from '../../../context/AuthContext';

const EditBio = ({ accountInfo, setAccountInfo, setIsEditingBio, onCancel }) => {
    const { authToken, editAccount } = useAuthContext();
    const [bioText, setBioText] = useState(accountInfo.user.bio || ''); // Track bio input
    const [image, setImage] = useState(null); // Track profile picture
    const [loading, setLoading] = useState(false);

    // Update bioText when the bio is changed
    const handleBioChange = (e) => setBioText(e.target.value);

    // Handle profile image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file); // Update the selected image state
    };

    // Handle form submission
    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target; // Create FormData from the form element
        

        try {
            const res = await editAccount(authToken, form);
            setAccountInfo((prevState) => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    bio: res.user.bio,
                    profilePicture: res.user.profilePicture,
                    updatedAt: res.user.updatedAt,
                },
            }));
            setIsEditingBio(false); // Exit editing mode
        } catch (error) {
            console.error('Error updating account:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        return () => {
            if (image) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);

    return (
        <div className="edit-bio-container">
            <h2>Edit Your Bio</h2>
            <form onSubmit={handleSave} className="edit-bio-form" encType="multipart/form-data">
                {/* Textarea for editing bio */}
                <textarea
                    name="bio"
                    value={bioText} // Control the bio value through state
                    onChange={handleBioChange} // Update the bio on change
                    placeholder="Write your bio..."
                    className="edit-bio-textarea"
                    autoFocus
                    wrap="soft"
                    tabIndex="4"
                    maxLength="50"
                    minLength="1"
                    disabled={loading} // Disable while loading
                />

                {/* File input for profile picture */}
                <div className="edit-bio-image-container">
                    {image && (
                        <img src={URL.createObjectURL(image)} alt="Profile Preview" className="edit-bio-preview" />
                    )}
                    <input
                        name="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange} // Handle image selection
                        className="edit-bio-file-input"
                        disabled={loading} // Disable while loading
                    />
                </div>

                {/* Action buttons */}
                <div className="edit-bio-actions">
                    <button
                        type="submit"
                        disabled={loading || (bioText === accountInfo.user.bio && !image)} // Disable button if bio is unchanged and no image is selected
                        className="edit-bio-save-button"
                    >
                        {loading ? 'Updating...' : 'Save'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="edit-bio-cancel-button"
                        disabled={loading} // Disable while loading
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

EditBio.propTypes = {
    accountInfo: PropTypes.object.isRequired,
    setAccountInfo: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    setIsEditingBio: PropTypes.func.isRequired,
};

export default EditBio;