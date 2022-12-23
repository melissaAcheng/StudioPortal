import React, { useState } from "react";
import axios from "axios";
import { URL } from "../App";

const SearchVideo = ({ video, setVideo }) => {
	const [keyword, setKeyword] = useState("");
	const [videoList, setVideoList] = useState([]);

	const searchVideos = (e) => {
		e.preventDefault();
		axios
			.get(`${URL}/api/videos/${keyword}`)
			.then((res) => {
				console.log(res.data);
				const ids = res.data.map((video) => video.id.videoId);
				setVideoList(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSelect = (videoId) => {
		setVideo(videoId);
		console.log(video);
		setVideoList([]);
		// setKeyword("");
	};

	return (
		<div>
			<div>
				<label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
				<div className="relative">
					<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<svg
							aria-hidden="true"
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						></svg>
					</div>
					<input
						type="search"
						onChange={(e) => setKeyword(e.target.value)}
						value={keyword}
						id="default-search"
						className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Search for video..."
						required
					/>
					<button
						onClick={searchVideos}
						className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Search
					</button>
				</div>
			</div>

			<div>
				<div>
					{videoList.map((video, i) => {
						return (
							<div key={i}>
								<iframe
									width="100%"
									height="50%"
									src={`https://www.youtube.com/embed/${video.id.videoId}`}
									title="YouTube video player"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
								<button
									className="underline text-blue-600"
									type="button"
									onClick={() => handleSelect(video.id.videoId)}
								>
									{video.snippet.title}
								</button>
								;
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default SearchVideo;
