const couponService = require('../services/coupon.service');

const getCoupons = async (req, res, next) => {
    try {
        const coupons = await couponService.getAllCoupons();
        res.status(200).json(coupons);
    } catch (error) { next(error); }
};

const checkCoupon = async (req, res, next) => {
    try {
        const coupon = await couponService.getCouponByCode(req.params.code);
        res.status(200).json(coupon);
    } catch (error) { res.status(404); next(error); }
};

const createCoupon = async (req, res, next) => {
    try {
        const coupon = await couponService.createCoupon(req.body);
        res.status(201).json(coupon);
    } catch (error) { res.status(400); next(error); }
};

const deleteCoupon = async (req, res, next) => {
    try {
        const result = await couponService.deleteCoupon(req.params.id);
        res.status(200).json(result);
    } catch (error) { next(error); }
};

module.exports = { getCoupons, checkCoupon, createCoupon, deleteCoupon };
