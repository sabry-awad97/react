import { useAppSelector, useActions } from "../hooks";

const SongList = () => {
  const songs = useAppSelector(({ songs }) => songs);

  const { selectSong } = useActions();
  return (
    <div className="ui divided list">
      {songs.map(song => {
        return (
          <div className="item" key={song.title}>
            <div className="right floated content">
              <button
                className="ui button primary"
                onClick={() => selectSong(song)}
              >
                Select
              </button>
            </div>
            <div className="content">{song.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SongList;
