import React, { useState } from 'react';
import './ProfileImages.scss'

import ProfileImage from './ProfileImage/ProfileImage'
import ProfileImagesIndicator from './ProfileImagesIndicator/ProfileImagesIndicator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import IProfileImage from 'typescript-types/IProfileImage'

const ProfileImages: React.FunctionComponent<{profileImages: IProfileImage[], imageIndex: number, setImageIndex: any;}> = props => {
	const imageIndex = props.imageIndex;
	const [isFirstImage, setIsFirstImage] = useState(imageIndex <= 0);
	const [isLastImage, setIsLastImage] = useState(imageIndex >= props.profileImages.length - 1);

	const prevImage = function() {
		var newImageIndex = imageIndex;
		if (imageIndex > 0) {
			newImageIndex = imageIndex - 1;
			setIsFirstImage(newImageIndex <= 0);
			setIsLastImage(newImageIndex >= props.profileImages.length - 1);
			if (props.setImageIndex) {
				props.setImageIndex(newImageIndex);
			}
		}
	}

	const nextImage = function() {
		var newImageIndex = imageIndex;
		if (imageIndex < props.profileImages.length - 1) {
			newImageIndex = imageIndex + 1;
			setIsFirstImage(newImageIndex <= 0);
			setIsLastImage(newImageIndex >= props.profileImages.length - 1);
			if (props.setImageIndex) {
				props.setImageIndex(newImageIndex);
			}
		}
	}

	var profileImagesElements = props.profileImages.map((profileImage, index) => (
		<ProfileImage key={index} index={index} visibleIndex={imageIndex} profileImage={profileImage}></ProfileImage>
	))

	return (
		<div className="profile-images">
			<div className="profile-images-inner">
				<ProfileImagesIndicator index={imageIndex} profileImages={props.profileImages}></ProfileImagesIndicator>
				{profileImagesElements}
				<div className={`profile-images-controls ${isFirstImage ? "first-image" : ""} ${isLastImage ? "last-image" : ""}`}>
					<div className="profile-images-left-control" onClick={prevImage}>
						<FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
					</div>
					<div className="profile-images-right-control" onClick={nextImage}>
						<FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
					</div>
				</div>
			</div>
			
		</div>
	);
}

export default ProfileImages;