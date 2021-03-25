const Projects = require('../models/Projects');
const Navers = require('../models/Navers');

class ProjectsController {
  async index(req, res){
    const { name } = req.query;
    
    if(name){
      const projectsFind = await Projects.findAll({ where: { owner_id: req.userId } });

      const projects = projectsFind.filter(projects => projects.name == name);

      return res.status(200).send(projects);
    }else{
      const projects = await Projects.findAll({ where: { owner_id: req.userId }, include: 'navers' });

      return res.status(200).json(projects)
    }
  }
  async show(req, res){
    const { id } = req.params;

    const projects = await Projects.findByPk(id, {
      include: 'navers'
    });

    if(!projects || projects.owner_id != req.userId){
      return res.status(400).json({ message: 'Projeto não existe ou não te pertence'})
    }

    return res.status(200).json(projects);
  }
  async store(req, res){
    const { name, navers } = req.body;

    const naversFind = await Navers.findAll({ where: { id: navers }}) 
    
    const myNavers = naversFind.filter(naver => naver.owner_naver_id == req.userId)
    
    const id = myNavers.map(naver => naver.id);

    const data = {
      name,
      owner_id: req.userId,
    }
    
    const projects = await Projects.create(data);

    await projects.addNavers(id);

    return res.status(201).json(projects)
  }
  async update(req, res){
    const { id } = req.params;
    const { name, navers } = req.body;

    const projects = await Projects.findByPk(id, {
      include: 'navers'
    });

    if(!projects || projects.owner_id != req.userId){
      return res.status(400).json({ message: 'Não é possivel editar esse projeto'})
    }

    if(navers != undefined){
      const naversFind = await Navers.findAll({ where: { id: navers }}) 
    
      const myNavers = naversFind.filter(naver => naver.owner_naver_id == req.userId)
      
      const idNavers = myNavers.map(naver => {
        return naver.id 
      });
      
      const updateProject = await projects.update({
        name
      });

      await updateProject.setNavers(idNavers);

      return res.status(200).json(updateProject);
    }

    const updateProject = await projects.update({
      name
    });

    await updateProject.setNavers(navers);
    
    return res.status(200).json(updateProject);
    
  }
  async delete(req, res){
    const { id } = req.params;

    const projects = await Projects.findByPk(id);

    if(!projects || projects.owner_id != req.userId){
      return res.status(400).json({ message: 'Erro ao deletar projeto'})
    }

    await projects.destroy();

    return res.status(200).send();
  }
}

module.exports = new ProjectsController();