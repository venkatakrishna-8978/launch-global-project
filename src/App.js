import React, { useState } from "react";

function App() {
  const [shows, setShonnws] = useState([]);
  const [pollVotes, setPollVotes] = useState({
    Action: 0,
    Comedy: 0,
    Drama: 0,
  });
  const [dark, setDark] = useState(false);
  const [filter, setFilter] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "Watching",
    total: "",
    genre: "",
  });

  const addShow = () => {
    const newShow = {
      ...form,
      total: parseInt(form.total),
      watched: 0,
      reviews: [],
    };
    setShows([...shows, newShow]);
  };

  const watchEpisode = (i) => {
    const updated = [...shows];
    if (updated[i].watched < updated[i].total) {
      updated[i].watched++;
    }
    setShows(updated);
  };

  const deleteShow = (i) => {
    setShows(shows.filter((_, index) => index !== i));
  };

  const addReview = (i) => {
    const review = prompt("Enter review");
    if (!review) return;
    const updated = [...shows];
    updated[i].reviews.push(review);
    setShows(updated);
  };

  const vote = (type) => {
    setPollVotes({ ...pollVotes, [type]: pollVotes[type] + 1 });
  };

  const filteredShows = filter
    ? shows.filter((s) => s.genre === filter)
    : shows;

  const totalWatched = shows.reduce((sum, s) => sum + s.watched, 0);

  const shareList = () => {
    let text = "My Watchlist:\n";
    shows.forEach((s) => {
      text += `${s.title} (${s.watched}/${s.total})\n`;
    });
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div style={{ padding: "20px", background: dark ? "#1e1e1e" : "#fff", color: dark ? "#fff" : "#000" }}>
      <h1>Anime & TV Series Tracker</h1>

      <button onClick={() => setDark(!dark)}>Dark / Light</button>

      <h2>Add Show</h2>

      <input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, category: e.target.value })}>
        <option>Watching</option>
        <option>Completed</option>
        <option>On Hold</option>
        <option>Dropped</option>
        <option>Plan to Watch</option>
      </select>
      <input type="number" placeholder="Episodes" onChange={(e) => setForm({ ...form, total: e.target.value })} />
      <input placeholder="Genre" onChange={(e) => setForm({ ...form, genre: e.target.value })} />

      <button onClick={addShow}>Add</button>

      <hr />

      <input placeholder="Filter Genre" onChange={(e) => setFilter(e.target.value)} />
      <button onClick={() => setFilter("")}>Reset</button>

      <hr />

      <h2>Watchlist</h2>

      {filteredShows.map((s, i) => (
        <div key={i} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{s.title}</h3>
          <p>{s.category}</p>
          <p>{s.genre}</p>
          <p>{s.watched}/{s.total}</p>

          <button onClick={() => watchEpisode(i)}>Watch</button>
          <button onClick={() => addReview(i)}>Review</button>
          <button onClick={() => deleteShow(i)}>Delete</button>

          <div>
            {s.reviews.map((r, idx) => (
              <div key={idx}>{r}</div>
            ))}
          </div>
        </div>
      ))}

      <hr />

      <h2>Poll</h2>
      <button onClick={() => vote("Action")}>Action</button>
      <button onClick={() => vote("Comedy")}>Comedy</button>
      <button onClick={() => vote("Drama")}>Drama</button>

      <p>
        Action: {pollVotes.Action} | Comedy: {pollVotes.Comedy} | Drama: {pollVotes.Drama}
      </p>

      <hr />

      <h2>Stats</h2>
      <p>Total Shows: {shows.length} | Episodes Watched: {totalWatched}</p>

      <hr />

      <button onClick={shareList}>Share</button>
    </div>
  );
}
export default App;
