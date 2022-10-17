import joi from "joi";

const urlSchema = joi.object({
  url: joi.string().uri().required()
});

const shortenUrlValidation = (req, res, next) => {
  const { url } = req.body;

  const validation = urlSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map(error => error.message);
    return res.status(422).send(errors);
  }

  res.locals.url = url;
  next();
};

export default shortenUrlValidation;