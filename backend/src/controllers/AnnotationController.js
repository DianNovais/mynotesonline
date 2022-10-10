const AnnotationDataSchema = require("../models/AnnotationData")

module.exports = {
    async read(request, response){
        const AnnotationList = await AnnotationDataSchema.find();

        return response.json(AnnotationList);
    },

    async create(request, response){
        const { title, notes, priority} = request.body;

        if (!title || !notes){
            return response.status(400).json({error: "Por favor, não deixe campos em branco."})
        }

        const annotationCreate = await AnnotationDataSchema.create({
            title,
            notes,
            priority
        })

        return response.json([{annotationCreate}]);

    },

    async delete(request, response){
        const { id } = request.params;

        try {
            const noteDeleted = await AnnotationDataSchema.findOneAndDelete({_id: id});

            if(!noteDeleted){
                return response.status(404).json({ error: "Não foi encontrado!"});
            }

            return response.status(244).json({noteDeleted});
        } catch (error) {
            console.log(error)
            return response.status(401).json({error: "Algo deu errado!"});
        }
    }
}