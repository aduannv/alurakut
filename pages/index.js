
import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AduankutMenu, AduankutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AduankutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';




function ProfileSidebar(propriedades){
  return (
    <Box as="aside">
      
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      
      <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
        @{propriedades.githubUser}
      </a>
      <hr />

      <AduankutProfileSidebarMenuDefault />

    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
      {propriedades.items.slice(0, 6).map((itemAtual) => {
        return (
          <li key={itemAtual.login}>
            <a href={`/users/${itemAtual.login}`}>
              <img src={`https://github.com/${itemAtual.login}.png`} />
              <span>{itemAtual.login}</span>
            </a>
          </li>
        )
      })}
        
      </ul>
    </ProfileRelationsBoxWrapper>
  ) 
}

export default function Home(props) {
  
  const githubUser = props.githubUser;
  const [seguidores, setSeguidores] = React.useState([]);

  const [comunidades, setComunidades] = React.useState([]);
  // const comunidades = comunidades[0];
  // const alteradorDeComunidades = comunidades[1]

  // console.log('Nosso teste', comunidades[0]);
  // const comunidades = ['Alurakut'];

  const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho'];

  React.useEffect(function(){
    fetch('https://api.github.com/users/peas/followers')
    .then(function (repostaDoServidor){
      
      if (repostaDoServidor.ok){
          return repostaDoServidor.json()
      }
  
      throw new Error('Aconteceu algum problema: ' + repostaDoServidor.status);
      
    }).then(function (respostaConvertida){

      //seguidoresAtualizados = respostaConvertida;

      setSeguidores(respostaConvertida)
    })
    .catch(function (erro) {
        console.error(erro)
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'b670adbdada1bfaaf9261c91cf7f23',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }` })
    }).then((repostaDoServidor) => repostaDoServidor.json())
    .then((respostaConvertida)=> {
      const comunidadesVindasDoDato = respostaConvertida.data.allCommunities;
      //console.log(comunidadesVindasDoDato);
      setComunidades(comunidadesVindasDoDato);
    })
    .catch(function (erro) {
        console.error(erro)
    })


  }, [])

  // 0 Pegar o array de dados do GitHub
  

  // 1 - Criar um box que vai ter um map, baseado nos items do array
  // que pegamos do GitHub


  return (
    <>
      <AduankutMenu githubUser={githubUser} />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"></Box> */}
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>

        <ProfileSidebar githubUser={githubUser} />

        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
            Bem vindo(a)
            </h1>
            
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Campo: ', dadosDoForm.get('image'));

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type' : 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();

                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];

                console.log("antes");
                setComunidades(comunidadesAtualizadas);

                console.log("depois");
              })

              
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?" 
                  type="text"
                />
              </div>
              <div>
              <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa" 
                  type="text"
                />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.title}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
              
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
              
            </ul>
            
          </ProfileRelationsBoxWrapper>
        </div>
        
        
        
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {

  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json())


  if (!isAuthenticated)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }

    
  const { githubUser } = jwt.decode(token)
  
  console.log(githubUser)
  return {
    props: { githubUser }, // will be passed to the page component as props
  }
}