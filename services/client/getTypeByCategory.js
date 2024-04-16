const Category = require("../../models/Category");
const System = require("../../models/System");
module.exports = async () => {
  try {
    const categories = await Category.find({}).select("category");
    const listTypes = categories.slice(0, 3).map(async (category) => {
      const systemItems = await System.find({ category: category._id })
        .select("type")
        .populate({ path: "type", select: "type" });
      let listTypeId = [
        ...systemItems.map((elem) => {
          return elem.type._id.toString();
        }),
      ];
      let listType = [
        ...systemItems
          .map((elem) => {
            return elem.type;
          })
          .filter((type, i) => {
            return listTypeId.indexOf(type._id.toString()) === i;
          }),
      ];
     // console.log(listType);
      let listSystemAndType = listType.map(async (type) => {
        const listSystemByType = await System.find({
          type: type,
        }).select("system");
        return {
          type: type,
          listSystem: listSystemByType,
        };
      });
      const listSystemAndTypePromise = Promise.all(listSystemAndType).then(
        (res) => {
          return res;
        }
      );
      const listSystemAndTypeValue = await listSystemAndTypePromise;

      return {
        category: category,
        listType: [...listSystemAndTypeValue],
      };
    });
    const value = Promise.all(listTypes).then((res) => {
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
