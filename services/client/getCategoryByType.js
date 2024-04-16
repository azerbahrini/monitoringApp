const Type = require("../../models/Type");
const System = require("../../models/System");
module.exports = async () => {
  try {
    const types = await Type.find({}).select("type");
    const listCategory = types.slice(0, 3).map(async (type) => {
      const systemItems = await System.find({ type: type._id })
        .select("category")
        .populate({ path: "category", select: "category" });
      let listCategorieId = [
        ...systemItems.map((elem) => {
          return elem.category._id.toString();
        }),
      ];
      let listCategorie = [
        ...systemItems
          .map((elem) => {
            return elem.category;
          })
          .filter((category, i) => {
            return listCategorieId.indexOf(category._id.toString()) === i;
          }),
      ];
      //console.log(listCategorie);
      let listSystemAndCategorie = listCategorie.map(async (category) => {
        const listSystemBycategory = await System.find({
          category: category,
        }).select("system");
        return {
          category: category,
          listSystem: listSystemBycategory,
        };
      });
      const listSystemAndCategoriePromise = Promise.all(
        listSystemAndCategorie
      ).then((res) => {
        return res;
      });
      const listSystemAndCategorieValue = await listSystemAndCategoriePromise;

      return {
        type: type,
        listCategory: [...listSystemAndCategorieValue],
      };
    });
    const value = Promise.all(listCategory).then((res) => {
      return res;
    });
    var merged = [].concat.apply([], await value);

    return {
      data: merged,
      status: "success",
    };
  } catch (err) {
    return {
      err,
      status: "error",
    };
  }
};
