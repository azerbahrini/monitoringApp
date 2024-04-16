const Category = require("../models/Category");
const categoryService = require("../services/category");

//Add Category
exports.addCategory = async function (req, res) {
  const result = await categoryService.addCategory(req.body);
  if (result.status == "success")
    return res.status(201).json({ data: result.data });
  if (result.status == "error")
    return res.status(400).json({ message: result.err.message });
};

//Get All Category
exports.getAllCategory = async function (req, res) {
  let page = req.query.page;
  let size = req.query.size;
  let isActive = req.query?.isActive;
  let activeFilterObject = {}
  let searchValue = req.query.searchValue
  if(typeof isActive !== 'undefined') {
    activeFilterObject = {isActive: isActive};
  }
  const result = await categoryService.getAllCategoriesService(
    page,
    size,
    activeFilterObject,
    searchValue
  );

  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error")
    res.status(400).json({ message: result.err.message });
};

//Get category by Id
exports.getCategoryById = async function (req, res) {
  const result = await categoryService.getCategoryById(req.params.id);

  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error")
    res.status(400).json({ message: result.err.message });
};

exports.updateCategory = async function (request, res) {
  const filter = {
    _id: request.params.id,
  };

  const updateCateg = await categoryService.updateCategory(
    filter,
    request.body
  );
  if (updateCateg.status == "success")
    return res.status(201).json({ data: updateCateg.data });
  if (updateCateg.status == "error")
    return res
      .status(updateCateg.statusCode ? updateCateg.statusCode : 400)
      .json({ message: updateCateg.err.message });
};

//exports.updateSystemCategory = async function (request, response) {
// const token = request.header("x-auth-token");

// const id = request.params.id;

//  const category = request.body.category;

/*if (!token) {
    return response.sendStatus(401);
  }
*/
// validate request data
// `active` boolean is not asserted, because it will always contain a value
/* if (!category || !id) {
    return response.sendStatus(400);
  }

  const filter = {
    _id: request.params.id,
  };

  try {
    const categoryDocument = await Category.findOneAndUpdate(
      filter,
      request.body
    );

    if (!categoryDocument) {
      return response.sendStatus(404);
    }

    const updatedCategoryDocument = await Category.findOne(filter);

    response.status(201).json({ data: updatedCategoryDocument });
  } catch (e) {
    return response.sendStatus(501);
  }
};
 */
