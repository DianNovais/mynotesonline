const AnnotationDataSchema = require("../models/AnnotationData");

module.exports = {
  async update(request, response) {
    const { id } = request.params;

    const note = await AnnotationDataSchema.findOne({ _id: id });

    const { title, notes } = request.body;

    if (title && title != note.title) {
      if (title.lenght > 3) {

        note.title = title;
        await note.save();

      }else{
        return response.json({error: "O titulo deve conter ao menos 3 caracteres"});
        
      }


    }
    if (notes && notes != note.notes) {
      note.notes = notes;

      await note.save();
    }

    return response.status(244).json({ note });
  },
};
