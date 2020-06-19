class FilterSuccess {
  apply(registerAction) {
    registerAction("afterResponse", ({ response }) => {
      if (response.statusCode >= 200 && response.statusCode <= 299) {
        return Promise.reject(null);
      } else {
        return Promise.resolve(response.body);
      }
    });
  }
}

module.exports = FilterSuccess;
