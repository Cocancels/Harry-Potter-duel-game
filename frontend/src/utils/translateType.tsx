export const translate = (type: string | undefined) => {
  switch (type) {
    case "damage":
      return "Dégâts";
    case "defense":
      return "Défense";
    case "status":
      return "Status";
    default:
      return type;
  }
};
