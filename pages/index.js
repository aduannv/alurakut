
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AduankutMenu, OrkutNostalgicIconSet } from '../src/lib/AduankutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSidebar(propriedades){
  return (
    <Box className="profileArea" style={{ gridArea: 'profileArea'}}>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'aduannv';
  const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho'];

  return (
    <>
      <AduankutMenu />
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
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
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