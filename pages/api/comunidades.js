import { SiteClient } from 'datocms-client';


export default async function recebedorDeRequests(request, response){
    if (request.method == 'POST')
    {

        const TOKEN = '383418b288390db34d366f9a136dd3';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "968029", // model ID

            ...request.body,

            // title: "Comunidade de Teste",
            // imageUrl: "http://github.com/aduannv.png",
            // creatorSlug: "aduannv"
        })

        response.json({
            dados: 'Algum dado qualquer', 
            registroCriado: registroCriado,
        })

        return;
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem!"
    });

}