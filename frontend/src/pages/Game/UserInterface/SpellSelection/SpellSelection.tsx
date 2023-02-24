import Button from "../../../../components/Button/Button";
import { Character } from "../../../../interfaces/Character";
import { Spell } from "../../../../interfaces/Spell";
import { Room } from "../../../../interfaces/Room";
import { User } from "../../../../interfaces/User";
import "./SpellSelection.css";

interface SpellSelectionProps {
  characters: Character[];
  currentPlayer: Character | undefined;
  actualUser: User | undefined;
  actualRoom: Room | undefined;
  isGameStarted: boolean;
  isChoosingTarget: boolean;
  chooseTarget: boolean;
  handleTargetSelection: (character: Character) => void;
  handleChoseSpell: (spellId: number) => void;
}

export const SpellSelection = (props: SpellSelectionProps) => {
  const {
    characters,
    currentPlayer,
    actualUser,
    actualRoom,
    isGameStarted,
    isChoosingTarget,
    chooseTarget,
    handleTargetSelection,
    handleChoseSpell,
  } = props;

  const isActualUser = (character: Character) => {
    return (
      character.id === actualUser?.id && character.id === currentPlayer?.id
    );
  };

  return (
    <div className="spell-target-selection-container">
      {!isChoosingTarget ? (
        <>
          <div className="game-spells-container">
            {isGameStarted &&
              currentPlayer &&
              characters.map((character: Character) => {
                if (character.id === currentPlayer.id)
                  return (
                    <div key={character.id}>
                      {isActualUser(character) ? (
                        <div className="character-turn">
                          <h2>{character.firstname}, c'est à toi !</h2>
                        </div>
                      ) : (
                        <div className="character-turn">
                          <h2>
                            {character.firstname} est en train de jouer,
                            patiente un peu !
                          </h2>
                        </div>
                      )}

                      <div key={character.id} className="game-spells">
                        {character.spells.map((spell: Spell) => {
                          return (
                            <Button
                              key={spell.id}
                              onClick={() => {
                                handleChoseSpell(spell.id);
                              }}
                              className={`${spell.type}-button`}
                              label={spell.name}
                              spell={spell}
                              disabled={!isActualUser(character)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
              })}
          </div>
        </>
      ) : (
        chooseTarget && (
          <div className="target-container">
            {actualRoom &&
              characters.map((character: Character) => {
                return (
                  <Button
                    className="button-target"
                    key={character.id}
                    label={
                      character.id === currentPlayer?.id
                        ? `${character.firstname} (You)`
                        : character.firstname
                    }
                    onClick={() => handleTargetSelection(character)}
                  />
                );
              })}
          </div>
        )
      )}
    </div>
  );
};
