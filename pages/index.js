import axios from "axios";
import { useState } from "react";
import UserCard from "../components/UserCard";

export default function Home() {
  const [getamout, setGetamout] = useState(1);
  const [users, setusers] = useState([]);

  const genUsers = async () => {
    if (getamout <= 0) {
      alert("Invlid number of user");
      return;
    } else {
      const resp = await axios.get(
        `https://randomuser.me/api/?results=${getamout}`
      );

      const newUsers = [];
      for (const x of resp.data.results) {
        newUsers.push({
          name: x.name.first + " " + x.name.last,
          email: x.email,
          imgUrl: x.picture.large,
          adress: `${x.location.city} ${x.location.state} ${x.location.country} ${x.location.postcode}`,
        });
      }
      setusers(newUsers);
    }
  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      {/* App Header */}
      <p className="display-4 text-center fst-italic m-4">
        Multiple Users Generator
      </p>

      {/* Input Section */}
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          value={getamout}
          onChange={(event) => setGetamout(event.target.value)}
        />
        <button class="btn btn-dark" onClick={() => genUsers()}>
          Generate
        </button>
      </div>
      {users.map((x) => (
        <UserCard
          key={x.name}
          name={x.name}
          email={x.email}
          imgUrl={x.imgUrl}
          adress={x.adress}
        />
      ))}

      {/* made by section */}
      <p className="text-center mt-3 text-muted fst-italic">
        made by Sirawich Pintana 640612099
      </p>
    </div>
  );
}
