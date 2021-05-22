import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGenderless, faMars, faVenus, faPlay, faDownload } from '@fortawesome/free-solid-svg-icons';

const genderMap = {
	'male': faMars,
	'female': faVenus,
	'other': faGenderless,
	'unknown': faGenderless
}

export default function SentenceList(props) {
	const playClip = (e) => {
		let clip = new Audio(`clips/${e.currentTarget.dataset.filename}`);
		clip.play();
	}

	const sentenceNodes = props.sentences.map((sentence, index) =>
		<div className="row border my-3" key={index}>
			<div className="col-sm-9 p-3">
				<div className="d-inline m-3 fs-5 text-secondary">
					{index + 1}
				</div>
				<div className="d-inline fs-3">
					{sentence.text}
				</div>
			</div>
		{/*	<div className="col-sm-2 text-center">
		 {sentence.speakers.length > 1 &&
 				 <Speaker position={2} meta={sentence.speakers[1]} />}
			</div> */}
			<div className="col-sm-3 g-0">
				<div className="d-flex h-100 align-items-stretch">
					<a href={`clips/${sentence.speakers[0].filename}`} download className="d-flex p-3 fs-5 text-lignt bg-secondary align-items-center justify-content-center">
						<FontAwesomeIcon icon={faDownload} color="white" fixedWidth />
					</a>
					<div onClick={playClip} data-filename={sentence.speakers[0].filename} className="play-button p-3 d-flex bg-primary text-white align-items-center flex-fill justify-content-center">
						<FontAwesomeIcon className="fs-2" icon={genderMap[sentence.speakers[0].gender]} fixedWidth />
						<FontAwesomeIcon className="fs-4" icon={faPlay} fixedWidth />
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className="sentence-list">
			<div>{sentenceNodes}</div>
		</div>
	)
}
