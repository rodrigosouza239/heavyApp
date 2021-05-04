import React from 'react';
import { ScrollView } from 'react-native';
import Typography from '@components/Typography';
import Box from '@components/Box';
import Container from '@components/Container';

const Privacy = () => {
  const title = (text) => {
    return (
      <Typography variant="subtitle" color="textSecondary">
        {text}
      </Typography>
    );
  };

  const normalText = (text) => {
    return <Typography align="justify">{text}</Typography>;
  };

  const list = (lines) => {
    return (
      <>
        {lines &&
          lines?.map((line) => {
            return <Typography align="justify">{line}</Typography>;
          })}
      </>
    );
  };

  const term = (titleText, text, lines) => {
    return (
      <Box mt={2}>
        {titleText !== '' && title(titleText)}
        {text !== '' && normalText(text)}
        {lines && list(lines)}
      </Box>
    );
  };

  return (
    <ScrollView>
      <Container>
        {title('TERMOS E CONDIÇÕES DE USO HEAVYMOTORS (DEMAX TECH SOLUÇÕES EM TECNOLOGIA LTDA.)')}
        {normalText(
          'Os presentes Termos e Condições de Uso visam regular a utilização por você, usuário, de nossos serviços pela plataforma mobile, aplicativo e outros canais de contato da Heavymotors (denominados "Serviços").',
        )}
        {term(
          '1. Termo de Aceitação',
          'Ao utilizar os nossos Serviços, o usuário aceita e concorda com todos os termos e condições expostas que se encontram vigentes na data. Alertamos que estes Termos e Condições de Uso poderão ser modificados a qualquer momento pela Heavymotors, em virtude de alterações na legislação ou nos Serviços, em decorrência da utilização de novas ferramentas tecnológicas ou, ainda, sempre que, a exclusivo critério da Heavymotors, tais alterações se façam necessárias. A utilização dos Serviços online disponibilizados pela Heavymotors por qualquer usuário implicará em expressa aceitação destes Termos e Condições de Uso.',
        )}
        {term(
          '2. Atualização das Informações',
          'A Heavymotors se reserva o direito de aprimorar as funcionalidades dos Serviços e de implementar novas tecnologias. Assim, os Termos de Uso poderão ser alterados, a qualquer tempo, exceto em caso de vedação legal, para incluir as modificações implementadas. Ao continuar a utilizar os nossos Serviços após alterados os Termos de Uso, você concorda com as alterações realizadas e vigentes à época do acesso.',
        )}
        {term('3. Acesso a Conteúdo Restrito e Suspensão de Acesso', '', [
          'Alguns Serviços estão disponíveis em conteúdo aberto e fechado. Quando o acesso a conteúdo for restrito, será necessário prévio cadastro do usuário e o acesso ao ambiente por meio de login e senha. Considerando que você é responsável pela veracidade das informações cadastradas, informamos que o cadastro de informações falsas pode gerar inconsistência na prestação dos Serviços, bem como impactar ou interromper o seu acesso.',
          'A qualquer tempo, sem aviso prévio, a Heavymotors poderá suspender, cancelar ou interromper o acesso aos Serviços, respeitadas as condições da legislação aplicável. A Heavymotors não se responsabiliza por eventuais danos e/ou problemas decorrentes da demora, interrupção ou bloqueio nas transmissões de dados decorrentes da conexão de internet do usuário.',
        ])}
        {term(
          '4. Uso Adequado dos Serviços',
          'Ao utilizar os Serviços, você se compromete a respeitar a legislação brasileira vigente e o disposto nestes Termos e Condições de Uso, não devendo produzir, disponibilizar ou compartilhar qualquer conteúdo que:',
          [
            'a) Implique a prática de ato ilícito e viole a legislação brasileira vigente;',
            'b) Viole direito de terceiros ou direitos da Heavymotors;',
            'c) Seja falso, incorreto, impreciso, extemporâneo e que possa induzir outrem a erro;',
            'd) Disponibilize ou permita o acesso a conteúdo ilegal, violento, pornográfico ou qualquer outro ato contrário à lei e à ordem pública;',
            'e) Induza a discriminação ou incite o ódio contra pessoas e/ou grupos de pessoas em razão de nacionalidade, raça, religião, orientação sexual, gênero, condição física, nacionalidade, dentre outros atos que contrariem a ordem pública e a legislação brasileira vigente;',
            'f) Seja resguardado por direito de propriedade intelectual de terceiro e você não tenha autorização prévia para utilizá-lo;',
            'g) Contenha vírus ou outro elemento que seja capaz, em razão de suas características (como forma, extensão, etc), de causar danos ou impedir o funcionamento regular da rede do sistema e/ou de equipamentos informáticos ("hardware" e "software") da Heavymotors ou de terceiros.',
          ],
        )}
        {term(
          '5. Responsabilidades',
          'Enquanto você usufruir dos Serviços oferecidos, você é responsável:',
          [
            'a) Por todo ato, por ação ou omissão, realizado em nossos sites institucionais, plataformas e aplicativos, responsabilizando-se pela prática de todo e qualquer ato ilícito feita por você;',
            'b) Pelo conteúdo gerado por você;',
            'c) Pela reparação de danos causados a terceiros, à Heavymotors, a partir do uso dos Serviços;',
            'd) Pelo seu próprio acesso à internet e ao pagamento pelos serviços de acesso à rede;',
            'e) Pelo Equipamento necessário para realizar a conexão à internet, como computador e modem, garantindo a segurança adequada do ambiente, mediante a utilização de ferramentas como antivírus e firewall;',
            'f) Por não utilizar os Serviços para outras finalidades além daquelas indicadas nos sites institucionais, plataformas e aplicativos;',
            'g) Sem prejuízo das demais isenções de responsabilidade indicadas no presente documento, você se declara ciente de que a Heavybmotors não será responsável:',
            'a) Por qualquer defraudação de utilidade que você possa atribuir aos Serviços, pela falibilidade destes, nem por qualquer dificuldade de acesso a estes, decorrentes de condutas atribuíveis a terceiros, como, por exemplo, prestadores de serviços de conexão à internet;',
            'b) Pela presença de vírus ou demais elementos nocivos nos Serviços, capazes de causar alterações em seus sistemas informáticos (software e hardware), documentos eletrônicos, eximindo-se a Heavymotors de qualquer responsabilidade por eventuais danos e prejuízos decorrentes de quaisquer elementos nocivos inseridos por terceiros;',
            'c) Pelos danos e prejuízos de toda natureza decorrentes do conhecimento que terceiros não autorizados possam ter de quaisquer dados fornecidos nos Serviços, em decorrência de falha exclusivamente relacionada ao usuário ou a terceiros que fujam a qualquer controle razoável da Heavymotors.',
          ],
        )}
        {term('6. Propriedade Intelectual', '', [
          'A Heavymotors assegura que as informações (textos, imagens, sons e/ou aplicativos) contidas nos seus sites estão de acordo com a legislação e normativos que regulam os direitos de propriedade intelectual (autoral e industrial), bem como pertencem à Heavymotors ou a terceiro que licitamente cedeu o seu direito de uso, não sendo permitidas modificações, cópias, reproduções ou quaisquer outras formas de utilização para fins comerciais sem o consentimento prévio e expresso da Heavymotors.',
          'Você declara que irá respeitar todos os direitos de propriedade intelectual contidos nos nossos Serviços, ciente de que o direito de acesso ao Serviço não concede qualquer autorização para uso de direitos de propriedade intelectual constantes de tal Serviço.',
        ])}
        {term('7. Lei aplicável e resolução de conflitos', '', [
          'Toda e qualquer controvérsia oriunda dos termos expostos nestes Termos e Condições de Uso serão solucionados de acordo com a lei brasileira, sendo competentes os foros das cidades de Rondonópolis, Estado de Mato Grosso, e Curitiba, Estado do Paraná, com exclusão de qualquer outro por mais privilegiado que seja.',
          'Fica claro, ainda, que a utilização de Serviços e as ordens comandadas fora do território brasileiro, ou ainda as decorrentes de operações iniciadas no exterior podem estar sujeitas também à legislação e jurisdição das autoridades dos países onde forem comandadas ou iniciadas.',
        ])}
        {term('POLÍTICA DE PRIVACIDADE HEAVYMOTORS', '', [
          'Alinhados com as melhores práticas e calcados em sua filosofia de transparência e respeito aos clientes Heavymotors, apresentamos os princípios básicos da Política de Privacidade On-Line (chamada “Política de Privacidade”).',
          'Trata-se das diretrizes adotadas pela Heavymotors em relação à coleta, armazenamento, utilização e todas as demais formas de tratamento das informações pessoais dos clientes/usuários e internautas, para acesso e uso dos nossos serviços pela plataforma mobile, aplicativo e outros canais de contato da Heavymotors (denominados "Serviços").',
        ])}
        {term('1. Definições', '', [
          '• Agentes de tratamento: o controlador e o operador;',
          '• Controlador: pessoa natural ou jurídica, de direito público ou privado, a quem competem as decisões referentes ao tratamento de dados pessoais.',
          '• Dado Pessoal: toda e qualquer informação relacionada a pessoa natural identificada ou identificável.',
          '• Dado Pessoal Sensível: dado pessoal sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculado a uma pessoa natural.',
          '• Operador: pessoa natural ou jurídica, de direito público ou privado, que realiza o tratamento de dados pessoais em nome do controlador;',
          '• Titular: pessoa natural a quem se referem os dados pessoais que são objeto de tratamento.',
          '• Tratamento: toda operação realizada com dados pessoais, como as que se referem a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração.',
          '• Criptografia: nome dado ao processo de codificação de informações. As informações são codificadas (embaralhadas) na origem e decodificadas no destino, dificultando, dessa forma, que sejam decifradas durante o tráfego na internet.',
          '• Cookies: arquivos-texto armazenados pelo navegador (exemplo, Internet Explorer, Microsoft Edge, Fire Fox, Chrome ou Safari) em seu computador ou telefone celular. Os cookies têm como finalidade identificar o computador ou telefone celular, personalizar os acessos e obter dados de acesso, como páginas navegadas ou links clicados. Um cookie é atribuído individualmente a cada computador, não podendo ser usado para executar programas, tampouco infectar computadores com vírus, trojans, etc., e podem ser lidos apenas pelo servidor que o enviou. Sem prejuízo de outras definições constantes nesta Política, os seguintes termos terão os significados a eles designados abaixo:',
          '• › "internauta": todo aquele que, de alguma forma, acessa o Portal Heavymotors e outros canais, sendo cliente ou não.',
          '• › "cliente": todo aquele que utiliza os produtos e/ou serviços oferecidos pelo Portal Heavymotors, pagos ou não.',
          '• › "usuário": todo aquele que se cadastrar neste Portal e receber uma identificação individual e exclusiva.',
        ])}
        {term(
          '2. Quem é a responsável pelo tratamento dos dados pessoais (Controlador)?',
          'É a DEMAX TECH SOLUÇÕES EM TECNOLOGIA LTDA. (HEAVYMOTORS), sociedade empresária de responsabilidade limitada, inscrita no CNPJ/MF nº 36.778.321/0002-40, com sede na Rua Doutor Brasilio Vicente de Castro, nº 111, Sala 303, Condomínio Eurobusines, Bairro Campo Comprido, CEP: 81.200-526, Curitiba/PR.',
        )}
        {term('3. Para quais finalidades os dados pessoais são tratados?', '', [
          'Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/18), a Heavymotors realiza o tratamento de seus dados pessoais com finalidades específicas e de acordo com as bases legais previstas na respectiva Lei, tais como: para o devido cumprimento das obrigações legais e regulatórias, para o exercício regular de direitos e para a proteção do crédito, bem como sempre que necessário para a execução dos contratos firmados com seus clientes ou para atender aos interesses legítimos da Heavymotors, de seus clientes ou de terceiros. Para qualquer outra finalidade, para a qual o consentimento do titular deve ser coletado, o tratamento estará condicionado à manifestação livre, informada e inequívoca do titular.',
          'A Heavymotors, na condição de controlador dos dados nos termos da legislação, poderá tratar, coletar, armazenar e compartilhar com as sociedades sob controle direto ou indireto que possua, sempre com a estrita observância à Lei, seus dados pessoais e informações cadastrais, financeiras e de operações ativas e passivas e serviços contratados para: (i) garantir maior segurança e prevenir fraudes; (ii) assegurar sua adequada identificação, qualificação e autenticação; (iii) prevenir atos relacionados à lavagem de dinheiro e outros atos ilícitos; (iv) realizar análises de risco de crédito; (v) aperfeiçoar o atendimento e os produtos e serviços prestados; (vi) fazer ofertas de produtos e serviços adequados e relevantes aos seus interesses e necessidades de acordo com o seu perfil; e (vii) outras hipóteses baseadas em finalidades legítimas, como apoio e promoção de atividades da Heavymotors ou para a prestação de serviços que beneficiem os clientes.',
          'A Heavymotors tem infraestrutura, sistemas e tecnologia com para fornecer uma experiência inovadora, relevante, consistente e segura em todos os produtos e serviços. Ainda, processamos informações sobre você na empresa com este objetivo, conforme permitido pela lei aplicável e de acordo com esta política. Ressaltamos que novos serviços online, disponibilizados pela Heavymotors, estarão automaticamente sujeitos à Política de Privacidade vigente à época de sua utilização. Queremos oferecer a melhor experiência durante a sua navegação em nossos sites e também na internet.',
        ])}
        {title('4. Tratamos quais dados pessoais?')}
        {term('Origens de dados pessoais', 'Os dados foram obtidos:', [
          '(i) diretamente do titular quando da contratação dos produtos e serviços da Heavymotors ou em simulações em fase de proposta; ou',
          '(ii) de fontes externas legítimas, com devido embasamento legal ou contratual; ou',
          '(iii) em razão de eventual compartilhamento de dados previamente autorizado pelo titular a Bancos Credenciados.',
        ])}
        {term('Conjunto de dados pessoais', '', [
          '• Nome',
          '• Nome Social',
          '• Data de nascimento',
          '• Sobrenome',
          '• CPF',
          '• Inscrição Estadual',
          '• Carteira de identidade',
          '• Carteira Nacional de habilitação (CNH)',
          '• Carteira de Trabalho e Previdência Social (CTPS)',
          '• Cédula de identidade de estrangeiro (CIE)',
          '• Registro Nacional de Estrangeiros (RNE)',
          '• Protocolo de solicitação da CIE',
          '• Protocolo do pedido de refúgio de que trata o art. 21 da Lei nº 9.474 de 22 de julho de 1997',
          '• Passaporte',
          '• Guia de acolhimento de que trata o § 3 do artº 101 da Lei nº 8.069, de 13 de julho de 1990 (Estatuto da criança e do Adolescente)',
          '• Idade',
          '• Nacionalidade',
          '• E-mail',
          '• Naturalidade',
          '• Nome da mãe',
          '• Nome do pai',
          '• Endereço',
          '• Residencial',
          '• Endereço Comercial',
          '• Estado Civil',
          '• Sexo',
          '• Telefones residencial',
          '• Telefones comercial',
          '• Telefones celular',
          '• Condição Pessoal (Espólio, interdito, deficiente, etc...)',
          '• Renda',
          '• Patrimônio',
          '• IMEI do celular',
          '• Origem racial',
          '• Geolocalização',
          '• Foto armazenada',
          '• Biometria',
          '• Agência e conta',
          '• Pessoa Politicamente exposta',
          '• Título de eleitor',
          '• Documentos profissionais (CREA, OAB e etc)',
          '• PIS/NIS - Programa de integração social',
        ])}
        {term('Famílias de finalidades', '', [
          '• Cumprir obrigações regulatórias ou legais',
          '• Exercer direito de defesa em processo judicial, administrativo ou arbitral',
          '• Cumprir decisões de autoridades, administrativas ou judiciais',
          '• Verificar a sua identidade e garantir maior segurança durante a sua navegação em nossos canais, bem como adotar procedimentos de prevenção à fraude, com o intuito de oferecer proteção ao titular ou à Heavymotors',
          '• Executar ações em virtude de relações pré-contratuais, ou durante a vigência de contratação (ciclo de vida do produto) ou pós-contratação (retenção, cobrança, etc);• Tratar reclamações, dúvidas e solicitações (Atendimento ao Cliente, SAC, Ouvidoria) e prestação de suporte ao titular',
          '• Realizar pesquisa de satisfação de produtos/serviços',
          '• Proceder com auditorias',
          '• Analisar dados para aperfeiçoar a usabilidade, experiência e interatividade na utilização dos nossos portais, sites e aplicativos',
          '• Fazer ofertas e/ou fornecer recomendações mais assertivas às suas necessidades ou interesses, inclusive mediante campanhas de marketing ou de simulações realizadas',
          '• Realizar pesquisas de comunicação e marketing de relacionamento, para melhorar nossos produtos e serviços',
          '• Promover campanhas, bolsas, patrocínios e eventos',
          '• Utilizar cookies, conforme esta Política',
          '• Realizar manutenção e a atualização cadastral.',
          '• Realizar estatísticas gerais e genéricas.',
          '• Enviar e compartilhar com o mercado informativos sobre produtos ou serviços.',
          '• Permitir aos internautas navegar ou realizar as operações disponibilizadas no Portal, aplicativos e outros canais',
          '• Viabilizar o fornecimento de produtos ou serviços solicitados no Portal, aplicativos e outros canais',
          '• Divulgar alterações, inovações ou promoções sobre os produtos e serviços da Heavymotors.',
        ])}
        {term(
          '',
          'Dependendo da ação realizada, ao se cadastrar, navegar, adquirir ou solicitar produtos e/ou serviços do Portal Heavymotors, serão requisitadas informações sobre:',
          [
            '• Identificação individual do cliente;',
            '• Máquina(s), Implemento(s) e veículo(s) pesado(s), ofertado(s) no Portal;',
            '• Máquina(s), Implemento(s) e veículo(s) pesado(s), pesquisado(s) no Portal;',
            '• Máquina(s), Implemento(s) e veículo(s) pesado(s), de propriedade do internauta;',
            '• Aquisição e forma de pagamento do produto ou serviço solicitado no Portal;',
            '• Preferências do cliente;',
            '• Opiniões do internauta;',
            '• Acesso do internauta (exemplo: data e horário de realização do acesso);',
            '• Perfil de acesso do internauta (exemplo: links clicados, páginas visitadas).',
          ],
        )}
        {/* COLOCAR LINK */}
        {term('5. Uso de cookies', '', [
          'Usamos Cookies para que você tenha a melhor experiência em nosso portal. Mas o que o que são Cookies? Cookies são pequenos arquivos gravados no dispositivo de acesso de usuário, enquanto este navega na internet, são armazenados em seu navegador e ajudam a armazenar suas preferências e a personalizar seu acesso.',
          'Para entender melhor como funcionam, você pode acessar o link abaixo: https://www.heavymotors.com.br/sobre-o-uso-de-cookies',
          'Assim, podemos usar cookies e coletar, tratar, armazenar e/ou compartilhar (com as empresas do Grupo e outros parceiros) informações de sua navegação, para:',
          '• permitir que a navegação seja mais eficiente e rápida;',
          '• aperfeiçoar sua usabilidade, experiência e interatividade na utilização dos nossos portais, sites, aplicativos, e-mails e durante a sua navegação na internet;',
          '• fazer ofertas e/ou te dar informações mais assertivas e relevantes às suas necessidades e interesses;',
          '• buscar maior eficiência em relação à frequência e continuidade da nossa comunicação com você;',
          '• responder suas dúvidas e solicitações;',
          '• realizar pesquisas de comunicação e marketing de relacionamento, para melhorar nossos produtos e serviços, bem como apuração de estatísticas em geral.',
          'Lembramos que você pode, a qualquer momento, ativar em seu navegador mecanismos para informá-lo quando os cookies estiverem acionados ou, ainda, impedir que sejam ativados.',
          'Você pode desativar os cookies não-essenciais para a utilização dos Serviços através das preferências do seu navegador. Sem eles, sua navegação pode se tornar limitada e algumas funcionalidades dos sites podem ficar comprometidas. Veja as definições sobre cookies em cada um dos navegadores: Internet Explorer / Firefox / Google Chrome / Safari / Microsoft Edge.',
        ])}
        {term('6. Tratamento de informações pessoais', '', [
          'Para o fornecimento dos Serviços online aos seus clientes, a Heavymotors adota recursos avançados visando a proteção das informações pessoais dos usuários e de seus Serviços.',
          'As informações de caráter pessoal dos usuários dos Serviços da Heavymotors, entendendo-se por informações pessoais todas aquelas que forem relacionadas a pessoa natural identificada ou identificável, inclusive informações pessoais sensíveis (que tratem sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculado a uma pessoa natural), como: o nome completo do usuário, endereço físico e eletrônico, número de telefone, RG, CPF, biometria, número de cartão de crédito, situação financeira e patrimonial, preferências e padrões de acesso ("informações pessoais"), não são divulgadas pela Heavymotors, exceto nas hipóteses expressamente mencionadas nesta Política.',
          'Tais informações são coletadas por meio dos canais da Heavymotors e armazenadas utilizando-se rígidos padrões de sigilo e integridade, bem como controles de acesso físico e lógico, observando-se sempre os mais elevados princípios éticos e legais.',
          'Caso o usuário decida fornecer suas informações pessoais nos sites institucionais e/ou no Portal e outros canais Heavymotors para usufruir dos Serviços online da Heavymotors, inclusive as informações pessoais sensíveis, tais informações serão tratadas atendendo às finalidades definidas em contrato de prestação de serviços e nos Termos e Condições de Uso.',
          'Uma vez provida das informações pessoais a respeito do usuário, a Heavymotors poderá utilizar, de acordo com o seu interesse legítimo, os dados do cliente/usuário/internauta para o fim de enviar publicidade, direcionada por e-mail ou por quaisquer outros meios de comunicação, contendo informações sobre a Heavymotors, empresas do Grupo, parceiros comerciais e/ou prestadores de serviço para oferta de produtos e serviços de seu interesse. Entretanto, fica reservado ao cliente/usuário/internauta o direito de, a qualquer momento, inclusive no ato da disponibilização das informações pessoais, informar à Heavymotors, por meio dos canais de comunicação disponíveis para o cadastramento de tais informações, do não interesse em receber tais anúncios, inclusive por e-mail (opt-out), hipótese em que a Heavymotors interromperá tais envios no menor tempo possível. Para cancelar sua inscrição, consulte as instruções de opt-out presentes no rodapé dos nossos e-mails.',
        ])}
        {term('7. Transferência internacional', '', [
          'Os dados pessoais tratados em decorrência do uso dos Serviços serão processados pela Heavymotors ou pelo Grupo em conformidade com legislação vigente aplicável.',
          'A Heavymotors está sediada no Brasil, mas pode realizar o tratamento de dados pessoais em outros países através da contratação de empresas parceiras, estas que, por sua vez, estarão submetidas às obrigações desta Política de Privacidade.',
        ])}
        {term(
          '8. Como respondemos aos requerimentos legais?',
          'Quando alguma autoridade requerer o acesso a seus dados pessoais e este pedido estiver respaldado por lei vigente, a Heavymotors compartilhará as suas informações. Nestes casos, a Heavymotors irá fornecer as informações estritamente necessárias para o cumprimento do pedido ou de nosso programa de integridade.',
        )}
        {term(
          '9. Exercício de direitos',
          'Em cumprimento à regulamentação aplicável, quando de sua vigência, no que diz respeito ao tratamento de dados pessoais, em especial a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), a Heavymotors respeita e garante a você, a possibilidade de apresentação de solicitações baseadas nos seguintes direitos:',
          [
            'a)a confirmação da existência de tratamento;',
            'b) o acesso aos dados;',
            'c) a correção de dados incompletos, inexatos ou desatualizados;',
            'd) a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a Lei;',
            'e) a portabilidade dos dados a outro fornecedor;',
            'f) a eliminação dos dados tratados com consentimento do Usuário, exceto nas hipóteses de guarda legal e outras dispostas em Lei;',
            'g) a obtenção de informações sobre as entidades públicas ou privadas com as quais a Heavymotors compartilhou seus dados;',
            'h) a informação sobre a possibilidade de não fornecer o seu consentimento, bem como de ser informado sobre as consequências, em caso de negativa;',
            'i) a revogação do consentimento;',
            'j) a oposição aos tratamentos realizados com fundamento em uma das hipóteses de dispensa de consentimento, em caso de eventual descumprimento ao disposto na Lei Geral de Proteção de Dados;',
            'k) a revisão de decisões tomadas unicamente com base em tratamento automatizado de dados pessoais que afetem os interesses dos titulares de dados, respeitados os segredos comercial e industrial da Heavymotors, tais como, mas não limitando-se, àqueles pautados em critérios de prevenção a fraudes ou de decorrentes de execução de contrato.',
            'A Heavymotors empreenderá todos os esforços para atender tais pedidos no menor espaço de tempo possível. No entanto, mesmo em caso de requisição de exclusão, será respeitado o prazo de armazenamento mínimo de informações de usuários de aplicações de internet, determinado pela legislação brasileira, dentre outras determinações legais aplicáveis.',
          ],
        )}
        {term('10. Como tratamos as suas informações de forma segura?', '', [
          'O acesso às informações pessoais coletadas, armazenadas ou de outra forma tratadas pela Heavymotors é restrito aos profissionais autorizados ao uso direto dessas informações, e necessário à prestação de seus Serviços, sendo limitado o uso para outras tarefas.',
          'É exigido, também, de toda organização ou do indivíduo contratado para a prestação de serviços de apoio, que sejam cumpridas as Políticas de Segurança internas e o Código de Ética adotado pela Heavymotors.',
          'A Heavymotors poderá revelar as informações pessoais que tenha recebido nas seguintes hipóteses:',
          '• sempre que estiver obrigada a revelá-las, seja em virtude de dispositivo legal, ato de autoridade competente, ordem ou mandado judicial;',
          '• aos seus parceiros comerciais e/ou prestadores de serviço, a fim de atender à solicitação de serviços efetuada pelos usuários;',
          '• aos órgãos de proteção e defesa de crédito e prestadores de serviços autorizados pela Heavymotors a defender seus direitos e créditos;',
          '• aos órgãos que administrem cadastros de consumidores;',
          '• aos seus controladores, às empresas por ele controladas, as empresas a ele coligadas ou por qualquer forma associadas, no Brasil ou no exterior;',
          'A Heavymotors trabalha exaustivamente para assegurar que as informações divulgadas para os clientes sejam verdadeiras e íntegras, contando com controles apurados de monitoramento das informações fornecidas. Sua participação no processo é revisar as informações, valores e informativos e enviar para o usuário, um comunicado de qualquer discrepância nas informações fornecidas.',
          'A Heavymotors não responderá por prejuízos que possam advir do vazamento das informações pessoais por violação ou quebra das barreiras de segurança de internet por terceiros como "hackers" ou "crackers".',
          'Além dos casos acima citados, havendo a necessidade ou interesse em repassar a terceiros, exceto aqueles já mencionados acima, dados de identificação individual dos clientes/usuários/internautas, a Heavymotors lhes solicitará autorização prévia. Informações que não sejam de identificação individual (como demográficas, por exemplo), poderão ser repassadas a anunciantes, fornecedores, patrocinadores e parceiros, com o objetivo de melhorar a qualidade dos produtos e serviços oferecidos pela Heavymotors.',
          'Aos terceiros que, porventura receberem da Heavymotors informações de qualquer natureza, sobre os internautas que acessam o seu Portal, cabe igualmente, a responsabilidade de zelar pelo sigilo e segurança de referidas informações.',
          'A Heavymotors se empenha expressivamente para prover segurança e sigilo das informações que capta. Contudo, para que as medidas adotadas tenham eficácia, faz-se necessário que cada cliente/usuário/internauta também tenha atitude responsável, sendo cuidadoso com os dados de sua identificação individual sempre que acessar a internet, informando-os somente em operações em que exista a proteção de dados, nunca divulgando sua identificação de usuário e sempre desconectando a conta do Portal Heavymotors tão logo deixe de acessá-la, principalmente se dividir o computador com outra(s) pessoa(s).',
          'A Heavymotors assegura que as informações (textos, imagens, sons e/ou aplicativos) contidas nos seus sites estão de acordo com a legislação e normativos que regulam os direitos autorais, marcas e patentes, não sendo permitidas modificações, cópias, reproduções ou quaisquer outras formas de utilização para fins comerciais sem o consentimento prévio e expresso da Heavymotors. A Heavymotors não se responsabiliza por eventuais danos e/ou problemas decorrentes da demora, interrupção ou bloqueio nas transmissões de dados ocorridos na Internet.',
        ])}
        {term('11. Extensão dos efeitos', '', [
          'Os termos da Política de Privacidade aqui expostos serão aplicados exclusivamente às informações pessoais e informações pessoais sensíveis, conforme acima definido, que venham a ser disponibilizadas à Heavymotors, pelo cliente/usuário/internauta, para a utilização de seus produtos e serviços.',
          'Por consequência, a Política de Privacidade aqui exposta não será aplicável a qualquer outro serviço online que não os disponibilizados pela Heavymotors, incluídos aqueles sites que estejam de alguma forma vinculados à Heavymotors, por meio de links ou quaisquer outros recursos tecnológicos, e, ainda, a quaisquer outros sites que, de qualquer forma, venham a ser conhecidos ou utilizados pela Heavymotors.',
          'Nesse sentido, alertarmos aos usuários que os referidos sites podem conter política de privacidade diversa da adotada pela Heavymotors ou podem até mesmo não adotar qualquer política nesse sentido, não se responsabilizando, a Heavymotors, por qualquer violação aos direitos de privacidade dos usuários que venha a ser praticada pelos referidos sites.',
        ])}
        {term(
          '12. Interpretação dos termos',
          'As palavras e os termos constantes desta Política de Privacidade aqui não expressamente definidos, grafados em português ou em qualquer outro idioma, bem como, quaisquer outros de linguagem técnica e/ou financeira ou não, que, eventualmente, durante a vigência do presente instrumento, no cumprimento de direitos e obrigações assumidos por ambas as partes, sejam utilizados para identificar a prática de quaisquer atos, deverão ser compreendidos e interpretados em consonância com o conceito internacionalmente consagrado.',
        )}
        {term(
          '13. Anexos',
          'A presente Política de Privacidade, para todos os fins e efeitos de direito, faz parte integrante e indissociável do Termo de Adesão da Heavymotors.',
        )}
        {term('14. Solicitações e Reclamações', '', [
          'Caso você tenha alguma solicitação ou reclamação, pedimos que entre em contato pelo nossa Central de Atendimento. Ao entrar em contato, pediremos alguns dados pessoais para confirmarmos a sua identidade.',
          'Eventualmente, outras informações podem ser solicitadas para confirmar a sua identidade com o objetivo de melhor atender à sua solicitação ou reclamação, havendo dúvida sobre a veracidade ou legitimidade das informações informadas.',
        ])}
        {term('15. Disposições Gerais', '', [
          'Eventuais omissões ou meras tolerâncias das partes no exigir o estrito e pleno cumprimento desta Política de Privacidade e/ou de prerrogativas decorrentes dele ou da lei, não constituirão novação ou renúncia, nem afetarão o exercício de quaisquer direitos aqui previstos, que poderão ser plena e integralmente exercidos, a qualquer tempo.',
          'Caso se perceba que uma disposição é nula, as disposições restantes desta Política de Privacidade permanecerão em pleno vigor e um termo válido substituirá o termo nulo, refletindo nossa intenção, tanto quanto possível.',
        ])}
        {term('Notícias e publicidade', '', [
          'As newsletters e mensagens publicitárias enviadas por e-mail sempre trarão opção de cancelamento do envio daquele tipo de mensagem por parte da Heavymotors. Não obstante, a Heavymotors coloca à disposição de seus clientes/usuários/internautas uma ferramenta de gestão das mensagens para que este possa solicitar, a qualquer tempo, o cancelamento do envio de mensagens.',
          'As mensagens enviadas em formato HTML podem conter códigos que permitem personalizar mensagens de acordo com as preferências individuais do cliente/usuário registrado da Heavymotors e elaborar relatórios sobre a visualização das mensagens, sobre o número de vezes em que o e-mail foi aberto e o número de cliques feitos na mensagem. Estas informações serão utilizadas de forma genérica e agregada para elaborar relatórios sobre o envio de mensagens. Tais relatórios poderão ser repassados aos anunciantes, como indicadores estatísticos da efetividade das campanhas, sem revelar informações pessoais dos clientes/usuários.',
          'Em nenhuma hipótese a Heavymotors divulgará esses dados de forma individualizada, ou seja, não haverá identificação do cliente/usuário ou de seus hábitos de acesso e leitura de e-mails. Ainda que coletivamente, os dados só podem ser utilizados para os fins previstos nesta Política de Privacidade.',
        ])}
        <Box mt={2}>{title('Segurança de dados transacionais')}</Box>
        {term('Proteção dos dados transacionais', '', [
          'As transações efetuadas para escolha da forma e efetivação do pagamento, independente da forma escolhida, são realizadas em ambiente seguro e certificado por empresa especializada em segurança de dados para a internet. Todas as informações necessárias à realização do pagamento são criptografadas. O ícone "Cadeado Fechado", localizado na barra de status (parte inferior do monitor), é o indicativo de que as informações transacionadas serão criptografadas.',
          'Outra medida de segurança é a não coleta do número e da data de validade de cartão de crédito, e de outras informações específicas para pagamento pela Heavymotors. Estes dados são informados diretamente para as instituições financeiras e não são armazenados ou utilizados para qualquer outro fim.',
          'Em alguns pontos do Portal Heavymotors são coletadas informações de identificação individual e/ou cadastral (como nome completo ou razão social, endereço, telefones, dados de veículo etc.) necessárias à navegação ou utilização dos serviços disponíveis. Como medida de proteção, as informações de identificação individual e/ou cadastral coletadas pelo Portal Heavymotors passam por processo de criptografia em todas as páginas de coleta de dados (como o anúncio de um automóvel ou adesão a um plano) e nas áreas seguras do site onde um usuário e senha são solicitados. Tal processo é certificado pelaAmazon certificadora digital de servidores web, garantindo comunicações e transações seguras.',
          'Os negócios realizados no Portal Heavymotors por um usuário, bem como as informações associadas a estas operações, são exclusivas e só podem ser acessadas por este usuário.',
        ])}
        {term('Identificação do Usuário', '', [
          'Ao se cadastrar no Portal Heavymotors para aquisição de produtos ou serviços (pagos ou não) oferecidos no Portal, cada usuário recebe uma identificação única, identificação esta que passa a ser requerida e autenticada nos demais acessos ao Portal. Essa identificação, para os fins de direito, serve como assinatura de concordância com qualquer proposta realizada nesse Portal.',
          'A identificação de usuário é exclusiva, intransferível e criptografada para ser transmitida ao servidor da Heavymotors, sendo a senha armazenada em banco de dados na sua forma criptografada, de maneira irreversível.',
          'A Heavymotors poderá confirmar os dados pessoais informados pelo cliente/usuário/internauta, consultando órgãos públicos, empresas especializadas, cadastros restritivos ou centrais de risco. As informações que a Heavymotors obtiver destas entidades serão tratadas de forma confidencial.',
          'Sem prejuízo do disposto anteriormente, o cliente/usuário garante e responde pela veracidade, exatidão, vigência e autenticidade dos dados pessoais, e se compromete a mantê-los devidamente atualizados. Por consequência, a Heavymotors não possui qualquer responsabilidade no caso de inserção de dados falsos ou inexatidão dos dados pessoais introduzidos por outros clientes/usuários/internautas.',
        ])}
        {term('Alterações na política', '', [
          'A Heavymotors poderá alterar esta Política de Privacidade a qualquer momento, em virtude de alterações na legislação ou nos serviços, em decorrência da utilização de novas ferramentas tecnológicas ou, ainda, sempre que, a exclusivo critério da Heavymotors, tais alterações se façam necessárias, razão pela qual recomendamos a leitura periódica desta Política de Privacidade.',
          'A utilização dos serviços disponibilizados pela Heavymotors por qualquer cliente/usuário implicará em expressa aceitação quanto aos termos e condições da Política de Privacidade vigente na data de sua utilização.',
          'A Heavymotors recomenda aos clientes/usuários que não concordem com a Política de Privacidade vigente a não utilização dos serviços deste Portal.',
        ])}
        {term('Dúvidas e sugestões', '', [
          'Caso haja qualquer dúvida ou sugestão sobre esta Política de Privacidade, entre em contato conosco através do Fale Conosco.',
          'Caso se perceba que esta Política de Privacidade não esteja sendo cumprida, a não conformidade detectada deverá ser apontada ao responsável por meio do Fale Conosco.',
        ])}
        {term('16. Lei aplicável e resolução de conflitos', '', [
          'Toda e qualquer controvérsia oriunda dos termos expostos na presente Política de Privacidade serão solucionados de acordo com a lei brasileira, sendo competentes os foros das cidades de Rondonópolis, Estado de Mato Grosso, e de Curitiba, Estado do Paraná, com exclusão de qualquer outro por mais privilegiado que seja.',
          'Fica claro, ainda, que a utilização de Serviços e as ordens comandadas fora do território brasileiro, ou ainda as decorrentes de operações iniciadas no exterior podem estar sujeitas também à legislação e jurisdição das autoridades dos países onde forem comandadas ou iniciadas.',
        ])}
        {term(
          '17. Dispositivos Móveis',
          'Para garantir uma eficiente utilização dos aplicativos da Heavymotors, sem que o seu uso fique prejudicado, é importante que você nos forneça as autorizações descritas abaixo:',
        )}
        {term(
          'a) Localização',
          'Necessário para validação da cidade em que o usuário se encontra com o objetivo de facilitar a busca da(s) máquina(s) ou veículo(s) pesado(s) na Heavymotors.',
        )}
        {term('b) Telefone (fazer e gerenciar chamadas telefônicas)', '', [
          'É necessário para a realização de ligação telefônica nas funções de “click to call”.',
          'A Heavymotors armazena o ID dos dispositivos móveis, como descrito acima, apenas para conseguir identificar os anunciantes.',
        ])}
        {term('c) Acessar fotos, mídias e arquivos do seu dispositivo.', '', [
          'Necessário para criação ou edição de anúncios e manutenção do perfil.',
          'As duas permissões abaixo só serão solicitadas caso o cliente deseje inserir fotos em seu anúncio.',
          '• Tirar  fotos ou  seleção  da  Galeria.  Necessário  para inserir fotos no anúncio.',
          'Atualização: Outubro de 2020.',
          'Copyright © 2020.',
          'Heavymotors',
          'Todos os direitos reservados.',
          'HEAVYMOTORS  (DEMAX  TECH  SOLUÇÕES  EM  TECNOLOGIA  LTDA.), CNPJ: 36.778.321/0002-40 Rua Doutor Brasilio Vicente de Castro, nº 111, Sala 3030, Condomínio Eurobusiness, Campo Comprido, Curitiba/PR – CEP: 81.200-526.',
        ])}
      </Container>
    </ScrollView>
  );
};

export default Privacy;
