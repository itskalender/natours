class BaseService {
  constructor(model) {
    this.model = model;
  }

  async find() {
    try {
      const tours = await this.model.find();
      
      return tours;
    } catch (err) {
      throw err;
    }
  }
  
  async findById(id) {
    try {
      const tour = await this.model.findById(id);
  
      return tour;
    } catch (err) {
      throw err;
    }
  }
  
  async create(data) {
    try {
      const newTour = await this.model.create(data);
  
      return newTour;
    } catch (err) {
      throw err;
    }
  }

}

module.exports = BaseService;