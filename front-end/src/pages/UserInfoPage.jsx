import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useToken from "../auth/useToken";
import useUser from "../auth/useUser";
import Button from "kromac-ui/dist/Button";
import Panel from "kromac-ui/dist/Panel";

export const UserInfoPage = () => {
  const user = useUser();
  const [token, setToken] = useToken();
  const { id, email, info, isVerified } = user;
  const history = useHistory();
  const [favoriteFood, setFavoriteFood] = useState(info.favoriteFood || "");
  const [hairColor, setHairColor] = useState(info.hairColor || "");
  const [bio, setBio] = useState(info.bio || "");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const saveChanges = async () => {
    try {
      const response = await axios.put(
        `/api/users/${id}`,
        {
          favoriteFood,
          hairColor,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { token: newToken } = response.data;
      setToken(newToken);
      setShowSuccessMessage(true);
    } catch (error) {
      setShowErrorMessage(true);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  const resetValues = () => {
    setFavoriteFood(info.favoriteFood);
    setHairColor(info.hairColor);
    setBio(info.bio);
  };

  return (
    <div>
      <Panel>
      <h1>Info for {email}</h1>
      {!isVerified && (
        <section className="info">
          You won't be able to make any changes until you verify your email
        </section>
      )}
      {showSuccessMessage && (
        <div className="success">Successfully saved user data!</div>
      )}
      {showErrorMessage && (
        <div className="fail">
          Uh oh... something went wrong and we couldn't save changes
        </div>
      )}
      <label>
        Favorite Food:
        <input
          disabled={!isVerified}
          onChange={(e) => setFavoriteFood(e.target.value)}
          value={favoriteFood}
        />
      </label>
      <label>
        Hair Color:
        <input
          disabled={!isVerified}
          onChange={(e) => setHairColor(e.target.value)}
          value={hairColor}
        />
      </label>
      <label>
        Bio:
        <input
          disabled={!isVerified}
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />
      </label>
      <hr />
      <Button onClick={saveChanges}>Save Changes</Button>
      <Button onClick={resetValues} color="dark">
        Reset Values
      </Button>
      <Button onClick={logOut} color="error">
        Log Out
      </Button>
      </Panel>
    </div>
  );
};
