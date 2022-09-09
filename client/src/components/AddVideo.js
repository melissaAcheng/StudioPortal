import React from "react";

const AddVideo = ({ videoId, video, setVideo, handleSelect }) => {
  // const [selectVideoId, setSelectVideoId] = useState("");

  // const handleSelect = () => {
  //   setVideo(videoId);
  //   console.log(videoId);
  // };

  

  return (
    <div>
      <div>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          // frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          // allowfullscreen
        ></iframe>
      </div>
      <button onClick={handleSelect(videoId)}>{video.snippet.title}</button>
    </div>
  );
};

export default AddVideo;
