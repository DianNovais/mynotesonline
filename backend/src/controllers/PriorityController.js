const AnnotationDataSchema = require("../models/AnnotationData");

module.exports = {
  async read(request, response) {
    const priority = request.query;

    try {
      const priorityNotes = await AnnotationDataSchema.find(priority);

      return response.status(244).json({ priorityNotes });
    } catch (error) {
      console.log(error);
      return response.json({ error: "Algo deu errado!" });
    }
  },

  async update(request, response) {
    const { id } = request.params;

    const note = await AnnotationDataSchema.findOne({_id: id});

    if(note.priority){
        note.priority = false;
    }else{
        note.priority = true;
    }

    await note.save();

    return response.json({note});
  },
};
