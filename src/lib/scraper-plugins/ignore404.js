class ignore404 {
  apply(registerAction) {
    registerAction("afterResponse", ({ response }) => {
      if (response.statusCode === 404) {
        return Promise.reject(null);
      } else {
        return Promise.resolve(response.body);
      }
    });
  }
}

module.exports = ignore404;
