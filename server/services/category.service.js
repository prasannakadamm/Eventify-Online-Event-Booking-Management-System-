const Category = require('../models/Category');

const getAllCategories = async () => {
    return await Category.find().sort({ name: 1 });
};

const getCategoryById = async (id) => {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error('Category not found');
    }
    return category;
};

const createCategory = async (categoryData) => {
    return await Category.create(categoryData);
};

const updateCategory = async (id, updateData) => {
    const category = await Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!category) {
        throw new Error('Category not found');
    }
    return category;
};

const deleteCategory = async (id) => {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error('Category not found');
    }
    await category.deleteOne();
    return { id };
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
