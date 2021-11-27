class APIFeatures {
  constructor(query) {
    this.query = query;
  }

  filter() {
    let filterBy = {};

    for (let key in this.query) {
      const excludedFields  = ['page', 'sort', 'limit', 'fields'];
      if (!excludedFields.includes(key)) {
        filterBy[key] = this.query[key];
      }
    }
    filterBy = JSON.parse( JSON.stringify(filterBy).replace(/\b(gt|gte|lt|lte\b)/g, match => `$${match}`) );

    return filterBy;
  }

  sort() {
    const { sort } = this.query;
    return sort ? sort.replaceAll(',', ' ') : sort;
  }

  createFields() {
    const { fields } = this.query;
    return fields ? fields.replaceAll(',', ' ') : fields;
  }

  paginate() {
    const page  = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip  = (page - 1) * limit;
    return {
      limit,
      skip
    }
  }
}

module.exports = APIFeatures;