import joi from 'joi';

export const uploadResultsSchema = joi.object({
  sem: joi.number().min(1).max(2).required(),
  availableRegulations: joi.string().pattern(/^(r16)/).required(),
});