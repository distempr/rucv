import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import SentenceList from './SentenceList';

export default function App() {
	const initialPage = window.location.hash.substring(1);

	const [page, setPage] = useState(parseInt(initialPage) || 1);
	const [sentences, setSentences] = useState([]);
	const [meta, setMeta] = useState({});

	const urlBase = 'https://rucv.distempr.net/data/';

	useEffect(() => {
		axios.get(`${urlBase}${page}.json`)
			.then(response => {
				setSentences(response.data.sentences);
				setMeta(response.data.meta);
				window.history.replaceState(null, null, '#' + page);
				document.title = 'RUCV - Page ' + page;
			});
	}, [page]);

	useEffect(() => {
		window.addEventListener('hashchange', () => {
			const pageNumber = parseInt(window.location.hash.substring(1) || false);
			if (pageNumber) {
				setPage(pageNumber);
			}
		})
	}, [])

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	}

	return (
		<div className="container mx-auto w-75">
			<h1 className="text-center my-3">RUCV</h1>
			{sentences.length === 0 ||
				<Fragment>
					<nav>
						<ReactPaginate
							previousLabel=<FontAwesomeIcon icon={faCaretLeft} />
							nextLabel=<FontAwesomeIcon icon={faCaretRight} />
							breakLabel={'\u2026'}
							pageCount={meta.totalPages}
							activeClassName='page-item active'
							breakClassName='page-item'
							previousClassName='page-item'
							nextClassName='page-item'
							marginPagesDisplayed={1}
							pageRangeDisplayed={3}
							onPageChange={(page) => setPage(page.selected + 1)}
							forcePage={page - 1}
							containerClassName='pagination justify-content-center'
							breakLinkClassName='page-link'
							pageLinkClassName='page-link'
							previousLinkClassName='page-link'
							nextLinkClassName='page-link'
						/>
					</nav>
					<div className="mb-1 text-end text-secondary">
						Displaying {sentences.length} of {meta.totalSentences} sentences
					</div>
				</Fragment>
			}
			<SentenceList sentences={sentences} />
			<footer className="py-3 mb-3">
				{sentences.length > 16 &&
					<button className="rounded-0 float-end btn btn-lg btn-secondary" onClick={scrollToTop}>Scroll to top</button>
				}
				{sentences.length === 0 ||
					<div className="text-begin p-1 text-secondary">
						Clips and sentences are from Mozilla's Common Voice dataset. App built using React, Python, SQLite and Stanford NLP Group's Stanza package.
					</div>}
			</footer>
		</div>
	)
}
