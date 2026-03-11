const Coupon = require('../models/Coupon');

const getAllCoupons = async () => {
    return await Coupon.find().sort({ createdAt: -1 });
};

const getCouponByCode = async (code) => {
    const coupon = await Coupon.findOne({ code, isActive: true, expiryDate: { $gte: new Date() } });
    if (!coupon) throw new Error('Invalid or expired coupon');
    return coupon;
};

const createCoupon = async (data) => {
    return await Coupon.create(data);
};

const deleteCoupon = async (id) => {
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) throw new Error('Coupon not found');
    return { id };
};

module.exports = { getAllCoupons, getCouponByCode, createCoupon, deleteCoupon };
