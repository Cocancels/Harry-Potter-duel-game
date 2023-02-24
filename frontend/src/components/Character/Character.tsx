import { useEffect, useState } from "react";
import { Character } from "../../interfaces/Character";
import { User } from "../../interfaces/User";
import HealthBar from "../HealthBar/HealthBar";
import ManaBar from "../ManaBar/ManaBar";
import "./Character.css";
import { StatusBar } from "./StatusBar/StatusBar";

interface CharacterProps {
  character: Character;
  flip?: boolean;
  isAttacking?: boolean;
  actualUser?: User | undefined;
}

const CharacterComponent = (props: CharacterProps) => {
  const { character, flip, isAttacking, actualUser } = props;

  const [image, setImage] = useState<string>("/images/hr-debout.gif");

  const handleAttack = () => {
    setImage("/images/hr-sort.gif");
    setTimeout(() => {
      setImage("/images/hr-debout.gif");
    }, 1000);
  };

  useEffect(() => {
    if (isAttacking) {
      handleAttack();
    }
  }, [isAttacking]);

  useEffect(() => {
    console.log("character", character);
  }, [character]);

  return (
    <div className="character-container">
      <div className="character">
        <div className={`character-name-container`}>
          <h2 className="character-name">
            {character.firstname} {character.lastname}{" "}
            {actualUser?.id === character.id && "(You)"}
          </h2>
        </div>
        <div className="character-image-container">
          <img
            className={`character-image ${flip ? "flipped" : ""}`}
            src={image}
            alt={""}
          />
          <div className="character-info">
            <StatusBar status={character.status} />
            <div className="character-info-bar">
              <HealthBar
                health={character.health}
                maxHealth={character.maxHealth}
              />
              <ManaBar mana={character.mana} maxMana={character.maxMana} />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CharacterComponent;
