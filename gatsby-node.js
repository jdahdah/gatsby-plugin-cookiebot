// Validate pluginOptions schema
exports.pluginOptionsSchema = ({ Joi }) => {
    return Joi.object({
        cookiebotId: Joi.string().required().description(`Domain ID for Cookiebot`),
        manualMode: Joi.boolean().description(`Enables Cookiebot manual mode`),
        blockGtm: Joi.boolean().description(`Disables GTM blocking in Cookiebot manual mode`),
        includeInDevelopment: Joi.boolean().description(`Enables plugin in development`),
    });
};
