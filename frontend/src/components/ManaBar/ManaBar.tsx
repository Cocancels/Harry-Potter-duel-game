import "./ManaBar.css";

const ManaBar = (props: { mana: number; maxMana: number }) => {
  const { mana, maxMana } = props;

  const fillWidth = `${(mana / maxMana) * 100}%`;

  return (
    <div className="mana-bar">
      <div className="mana-bar__fill" style={{ width: fillWidth }} />
      <div className="mana-bar__label">{`${mana}/${maxMana}`}</div>
    </div>
  );
};

export default ManaBar;
