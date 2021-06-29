export default function (schemas) {
  return (req, res, next) => {
    const results = Object.keys(schemas)
      .filter((key) => ['body', 'params', 'query'].includes(key))
      .map((key) => {
        const { error } = schemas[key].validate(req[key]);
        return error;
      })
      .filter((error) => !!error)
      .map(({ details }) => details.map((i) => i.message).join(','));

    if (results.length > 0) {
      const message = results.reduce((obj, errors) => {
        console.log(obj, errors);
        return {};
      });
      res.status(422).json(message);
    } else next();
  };
}
