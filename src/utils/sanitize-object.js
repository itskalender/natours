function sanitizeObject(obj, validKeys) {
  const object = {};

  Object.keys(obj).forEach(key => {
    const isKeyValid = validKeys.includes(key);
    if (isKeyValid) {
      object[key] = obj[key];
    }
  });

  return object;
}

module.exports = sanitizeObject;