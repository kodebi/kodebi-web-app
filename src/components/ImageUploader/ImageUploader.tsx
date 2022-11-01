import React from 'react';
import { FaFileImage } from 'react-icons/fa';

interface ImageUploaderProps {
	bookImage: any;
	imageChange: (e?: any) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
	bookImage,
	imageChange,
}): JSX.Element => {
	return (
		<>
			<div className="image-upload">
				<label htmlFor="image" id="image" className="upload-icon">
					<FaFileImage />
				</label>
				<input
					type="file"
					id="image"
					name="image"
					className="file-input"
					onChange={imageChange}
				/>
				<p className="file-info">Lade hier ein Bild deines Buches hoch</p>
				<p className="file-name">
					{bookImage ? bookImage.name : 'Kein Bild ausgewählt'}
				</p>
			</div>
		</>
	);
};
