const settingService = require('../services/setting.service');

const getSettings = async (req, res, next) => {
    try {
        const settings = await settingService.getAllSettings();
        res.status(200).json(settings);
    } catch (error) { next(error); }
};

const updateSetting = async (req, res, next) => {
    try {
        const setting = await settingService.updateSetting(req.body.key, req.body.value, req.body.description);
        res.status(200).json(setting);
    } catch (error) { next(error); }
};

module.exports = { getSettings, updateSetting };
