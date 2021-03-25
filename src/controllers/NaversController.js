const Navers = require('../models/Navers');
const Projects = require('../models/Projects');
const moment = require('moment');

class NaversController {
  async index(req, res){
    const { time, name, job_role } = req.query;
    
    if(time){
      const navers = await Navers.findAll({ where: { owner_naver_id: req.userId } });

      const returnNavers = navers.map(naver => {
        const now = moment(new Date());
        const past = moment(naver.admission_date);
        
        const newNavers = moment.duration(now.diff(past));
        const months = newNavers.asMonths();
        const newData = {};
          
        newData.name = naver.name;
        newData.birthdate = naver.birthdate;
        newData.job_role = naver.job_role;
        newData.time = Math.floor(months);

        return newData;
      });    

      const timeSearch = returnNavers.filter(naver => naver.time <= req.query.time)
      
      return res.status(200).send(timeSearch);

    }else if(name || job_role){
      const navers = await Navers.findAll({ where: { owner_naver_id: req.userId } });

      const response = navers.filter(naver => naver.name == name || naver.job_role == job_role)

      return res.status(200).json(response)
  
    }else{
      const navers = await Navers.findAll({ where: { owner_naver_id: req.userId } });

      return res.status(200).json(navers)
    }
  }
  async show(req, res){
    const { id } = req.params;

    const naver = await Navers.findByPk(id, {
      include: 'projects'
    });

    if(!naver){
      return res.status(400).json({ message: 'Naver não existe'})
    }

    if(naver.owner_naver_id != req.userId){
      return res.status(401).json({ message: 'Você não pode ver as informações de um naver pertencente a outro'})
    }

    return res.status(200).json(naver);
  }

  async store(req, res){
    const { name, birthdate, admission_date, job_role, projects } = req.body;

    const newBirthdate = new Date(birthdate);
    const newAdmissionDate = new Date(admission_date);

    const data = {
      name,
      birthdate: newBirthdate,
      admission_date: newAdmissionDate,
      job_role,
      owner_naver_id: req.userId
    }

    const naver = await Navers.create(data);

    await naver.addProjects(projects);

    return res.status(200).json({naver, projects});
  }

  async update(req, res){
    const { id } = req.params;
    const { projects, ...data } = req.body;

    const naver = await Navers.findByPk(id, {
      include: 'projects'
    });

    if(!naver || naver.owner_naver_id != req.userId){
      return  res.status(400).json({ message: 'Naver não existe ou não te pertence'})
    }

    if(projects.length > 0){
      const projectsFind = await Projects.findAll({ where: { id: projects }}) 
    
      const projectsFiltered = projectsFind.filter(project => project.owner_id == req.userId)
      
      const idProjects = projectsFiltered.map(project => {
        return project.id 
      });

      const naverUpdated = await naver.update(data);

      await naver.setProjects(idProjects);

      return res.status(200).json(naverUpdated);
    }

    const naverUpdated = await naver.update(data);

    return res.status(200).json(naverUpdated);
  }

  async delete(req, res){
    const { id } = req.params;

    const navers = await Navers.findByPk(id);

    if(!navers || navers.owner_naver_id != req.userId){
      return res.status(401).json({ message: 'Naver não existe ou você não pode excluir este naver'})
    }

    await navers.destroy();

    return res.status(200).send();
  }
}

module.exports = new NaversController();