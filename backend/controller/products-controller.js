const { Product, Category } = require("../models");

exports.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user.id;
    const {
      name,
      code,
      quantity,
      bprice,
      sprice,
      categoryCode,
      sname,
      semail,
      scontact,
    } = req.body;

    const category = await Category.findOne({ where: { code: categoryCode } });

    if (!category) {
      return res.json({
        success: false,
        message: "Category does not exist",
      });
    }

    const existingProduct = await Product.findOne({ where: { code: code } });

    if (existingProduct) {
      return res.json({
        success: false,
        message: "Product already exists",
      });
    }

    if (quantity > category.volume) {
      return res.json({
        success: false,
        message: "Product quantity is more than the volume of the category",
      });
    }

    const product = await Product.create({
      name: name,
      code: code,
      quantity: quantity,
      bprice: bprice,
      sprice: sprice,
      categoryCode: categoryCode,
      userId: userId,
      sname: sname,
      semail: semail,
      scontact: scontact,
    });

    res.json({
      success: true,
      message: "Product listed",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Error creating product",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const body = req.body;
  const userId = req.user.id;

  const existingProduct = await Product.findOne({ where: { id: body.id } });

  if (!existingProduct) {
    res.json({
      status: true,
      message: "Product doesnot exist.",
    });
  } else {
    if (userId == existingProduct || req.user.roles == "ADMIN") {
      existingProduct.name = body.name;
      existingProduct.code = body.code;
      existingProduct.categoryCode = body.categoryCode;
      existingProduct.quantity = body.quantity;
      existingProduct.bprice = body.bprice;
      existingProduct.sprice = body.sprice;
      existingProduct.sname = body.sname;
      existingProduct.semail = body.semail;
      existingProduct.scontact = body.scontact;
      await existingProduct.save();

      res.json({
        status: true,
        message: "Updated",
      });
    } else {
      res.json({
        status: false,
        message: "You don't have permission to update this product",
      });
    }
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.body;
  const existingProduct = await Product.findOne({ where: { id } });
  const existingUser = req.user.id;

  if (!existingProduct) {
    res.json({
      success: false,
      message: "Product doesnot exist",
    });
  } else {
    if (existingUser == existingProduct.userId || req.user.roles == "ADMIN") {
      await existingProduct.destroy();
      res.json({
        success: true,
        message: "Product deleted",
      });
    } else {
      res.json({
        success: false,
        message: "You don't have permission to delete this product",
      });
    }

    res.json({
      success: true,
      message: "Product deleted",
    });
  }
};

exports.getAllProduct = async (req, res) => {
  const product = await Product.findAll();

  if (!product) {
    res.json({
      status: false,
      message: "Product not found.",
    });
  } else {
    res.json({
      success: true,
      product,
    });
  }
};
exports.getAllRecentProduct = async (req, res) => {
  try {
    const latestPurchase = await Product.findAll({
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order (latest first)
    });

    res.json({
      success: true,
      purchase: latestPurchase,
    });
  } catch (error) {
    console.error("Error fetching latest Purchase:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching latest Purchase",
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  const { id } = req.query;
  const product = await Product.findOne({ where: { id } });

  if (!product) {
    res.json({
      status: false,
      message: "Product not found.",
    });
  } else {
    res.json({
      success: true,
      product,
    });
  }
};
