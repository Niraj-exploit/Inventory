const { Product, Sales } = require("../models");

exports.sale = async (req, res) => {
  try {
    const productId = req.params.id;
    const { quantity, bname, bemail, bcontact, baddress } = req.body;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.json({
        success: false,
        message: "Product does not exist",
      });
    }

    if (quantity <= 0 || quantity > product.quantity) {
      return res.json({
        success: false,
        message: "Invalid quantity or insufficient stock for sale",
      });
    }

    // Update the quantity of the product after the sale
    const quantityPrice = quantity * product.sprice;
    const updatedQty = product.quantity - quantity;


    // Save the updated quantity to the database
    product.quantity = updatedQty;
    await product.save();

    const sale = await Sales.create({
      productId: productId,
      userId: req.user.id,
      quantity: quantity,
      detail: product.name,
      bname: bname,
      bemail: bemail,
      bcontact: bcontact,
      baddress: baddress,
      totalPrice: quantityPrice,
    });


    return res.json({
      success: true,
      message: "Product sold successfully",
      soldPrice: quantityPrice,
      remainingQty: updatedQty,
      sale
    });
  } catch (error) {
    console.error("Error selling product:", error);
    res.status(500).json({ success: false, message: "Error selling product" });
  }
};

exports.getLatestSales = async (req, res) => {
    try {
      const latestSales = await Sales.findAll({
        order: [["createdAt", "DESC"]], // Sort by createdAt in descending order (latest first)
      });

      res.json({
        success: true,
        sales: latestSales,
      });
    } catch (error) {
      console.error("Error fetching latest sales:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching latest sales",
      });
    }
  };

  exports.getHighestSelling = async (req, res) => {
    try {
      const latestSales = await Sales.findAll({
        order: [["quantity", "DESC"]], // Sort by createdAt in descending order (latest first)
      });

      res.json({
        success: true,
        sales: latestSales,
      });
    } catch (error) {
      console.error("Error fetching latest sales:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching latest sales",
      });
    }
  };


  exports.getSales = async (req, res) => {
    try {
      const sales = await Sales.findAll();
  
      res.json({
        success: true,
        sales: sales,
      });
    } catch (error) {
      console.error("Error fetching sales:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching sales",
      });
    }
  }


  exports.saleCount = async (req, res) => {
    try {
      const sales = await Sales.count();
      res.json({
        success: true,
        sales: sales,
      });

  }catch (error) {
    console.error("Error fetching sales:", error);
  }
}



exports.calculateRevenueAndProfit = async (req, res) => {
  try {
    const sales = await Sales.findAll();

    let totalRevenue = 0;
    let totalProfit = 0;

    for (const sale of sales) {
      const product = await Product.findOne({ where: { id: sale.productId } });

      if (!product) {
        console.log(`Product not found for Sale ID: ${sale.id}`);
        res.json({
          success: false,
          message: `Product not found for Sale ID: ${sale.id}`,
        })
        continue;
      }

      totalRevenue += parseFloat(sale.totalPrice);
      const tot = parseFloat(product.bprice)*parseFloat(sale.quantity);
      console.log(product.bprice, sale.quantity, tot);
      const profit = parseFloat(sale.totalPrice) - tot;
      totalProfit += profit;
    }

    res.json({
      success: true,
      totalRevenue,
      totalProfit,
    });
  } catch (error) {
    console.error("Error calculating revenue and profit:", error);
    res.status(500).json({ success: false, message: "Error calculating revenue and profit" });
  }
};


