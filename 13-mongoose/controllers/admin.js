const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        //Mongoose cogerá automáticamente el user._id aquí usando esto:
        userId: req.user
    });
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;

    Product.findById(prodId).then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice
        product.description = updatedDescription;
        product.imageUrl = updatedImageUrl;
        return product.save();
    })
        .then(result => {
            console.log('UPDATED PRODUCT');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product
        //Tras find podemos usar select para que nos devuelva determinados campos en los que estamos interesados y no todos los que estén en mongodb
        .find()
        // .select('title price -_id')
        //Con populate, la parte del product que tiene el id del user se rellena con todos sus valores, en vez de solo con el id, cada vez que devuelve el valor aquí, y solo aquí, no en la base de datos
        //En populate podemos utilizar el segundo aegumento para que solo nos devuelva lo que le pongamos
        // .populate('userId', 'name')
        .then(products => {
            console.log(products);
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin products',
                path: '/admin/products',
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndDelete(prodId)
        .then(() => {
            console.log('Product deleted');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
}