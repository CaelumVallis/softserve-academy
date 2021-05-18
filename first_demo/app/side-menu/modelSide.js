export default class ModelSide {
  getCategories = (data) => {
    return [...data.reduce((acc, { CATEGORY }) => acc.add(CATEGORY), new Set())];
  };
}
