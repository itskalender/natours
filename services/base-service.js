class BaseService {
  constructor(model) {
    this.model = model;
  }

  async find() {
    try {
      const data = await this.model.find();
      
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
}

module.exports = BaseService;