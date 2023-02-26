import Button from "../../../../components/Button/Button";
import { Character } from "../../../../interfaces/Character";
import { Spell } from "../../../../interfaces/Spell";
import "./SpellSelection.css";
import { useState } from "react";
import { useSelector } from "react-redux";

interface SpellSelectionProps {
  characters: Character[];
  isGameStarted: boolean;
  socket: any;
  hasChosenSpell: boolean;
  setHasChosenSpell: (hasChosenSpell: boolean) => void;
}

export const SpellSelection = (props: SpellSelectionProps) => {
  const actualRoom = useSelector((state: any) => state.ActualRoom);
  const actualUser = useSelector((state: any) => state.User);

  const {
    characters,
    isGameStarted,
    socket,
    hasChosenSpell,
    setHasChosenSpell,
  } = props;

  const [isChoosingTarget, setIsChoosingTarget] = useState<boolean>(false);
  const [selectedSpell, setSelectedSpell] = useState<Spell>();

  const handleCastSpell = (spellId: number | undefined, target: Character) => {
    setHasChosenSpell(true);
    socket.emit("castSpell", actualRoom, actualUser, target, spellId);
    setIsChoosingTarget(false);
  };

  const handleChoseSpell = (spell: Spell) => {
    setIsChoosingTarget(true);
    setSelectedSpell(spell);
  };

  const getOpponent = (character: Character) => {
    return characters.find((c) => c.id !== character.id);
  };

  return (
    <div className="spell-target-selection-container">
      {!isChoosingTarget ? (
        <>
          <div className="game-spells-container">
            {isGameStarted &&
              characters.map((character: Character) => {
                if (character.id === actualUser?.id)
                  return (
                    <div key={character.id}>
                      {!hasChosenSpell ? (
                        <div className="character-turn">
                          <h2>{character.firstname}, choisis un sort !</h2>
                        </div>
                      ) : (
                        <div className="character-turn">
                          <h2>
                            Attends que {getOpponent(character)?.firstname}{" "}
                            choisisse ... !
                          </h2>
                        </div>
                      )}

                      {!hasChosenSpell && (
                        <div key={character.id} className="game-spells">
                          {character.spells.map((spell: Spell) => {
                            return (
                              <Button
                                key={spell.id}
                                onClick={() => handleChoseSpell(spell)}
                                className={`${spell.type}-button`}
                                label={spell.name}
                                spell={spell}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                return null;
              })}
          </div>
        </>
      ) : (
        isChoosingTarget && (
          <div className="target-container">
            {actualRoom &&
              characters.map((character: Character) => {
                return (
                  <Button
                    className="button-target"
                    key={character.id}
                    label={
                      character.id === actualUser?.id
                        ? `${character.firstname} (You)`
                        : character.firstname
                    }
                    onClick={() => {
                      handleCastSpell(selectedSpell?.id, character);
                    }}
                  />
                );
              })}
          </div>
        )
      )}
    </div>
  );
};
