class BaseService {
  constructor(model) {
    this.model = model;
  }

  async find(filterBy = {}, sortBy, fieldBy) {
    try {
      let query = this.model.find(filterBy);

      if (sortBy) {
        query = query.sort(sortBy);
      } else {
        query = query.sort('-createdAt')
      }

      if (fieldBy) {
        query = query.select(fieldBy);
      } else {
        query = query.select('-__v')
      }
      
      const data = await query;
      return data;
    } catch (err) {
      throw err;
    }
  }
  
  async findById(id) {
    try {
      const data = await this.model.findById(id);
  
      return data;
    } catch (err) {
      throw err;
    }
  }
  
  async create(data) {
    try {
      const newData = await this.model.create(data);
  
      return newData;
    } catch (err) {
      throw err;
    }
  }

  async update(id, data) {
    try {
      const updatedData = await this.model.findByIdAndUpdate(id, data, {new: true, runValidators: true});

      return updatedData;
    } catch (err) {
      throw err
    }
  }

  async delete(id) {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BaseService;