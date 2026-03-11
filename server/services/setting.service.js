const Setting = require('../models/Setting');

const getAllSettings = async () => {
    return await Setting.find();
};

const getSettingByKey = async (key) => {
    const setting = await Setting.findOne({ key });
    return setting ? setting.value : null;
};

const updateSetting = async (key, value, description) => {
    return await Setting.findOneAndUpdate(
        { key },
        { value, description, updatedAt: Date.now() },
        { upsert: true, new: true }
    );
};

module.exports = { getAllSettings, getSettingByKey, updateSetting };
