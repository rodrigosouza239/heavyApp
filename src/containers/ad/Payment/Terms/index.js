import React from 'react';
import { ScrollView } from 'react-native';
import Typography from '@components/Typography';
import Box from '@components/Box';
import Container from '@components/Container';

const PaymentTerms = () => {
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
        {title('EMPRESA – PORTAL DE ANÚNCIOS TERMO DE ADESÃO - PESSOA FÍSICA')}
        {/* COLOCAR LINK */}
        {term('', 'Prezado Cliente,', [
          'A empresa DEMAX TECH SOLUÇÕES EM TECNOLOGIA LTDA.,disponibiliza um canal virtual (PORTAL DE ANÚNCIOS ou PORTAL) para você anunciar Máquinas Agrícolas, Implementos Agrícolas, Máquinas Linha Amarela (Construção) e Caminhões, novos e usados.',
          'Faz parte da empresa DEMAX TECH SOLUÇÕES EM TECNOLOGIA LTDA, o PORTAL:',
          'HEAVYMOTORS: www.heavymotors.com.br',
        ])}
        {term('', 'LEIA-O COM ATENÇÃO E SÓ CONTRATE O PORTAL SE ESTIVER DE ACORDO.')}
        {term('I - CONDIÇÕES DE CONTRATAÇÃO', '', [
          '1. Escolha dentre as modalidades de anúncio, período de divulgação e forma de pagamento disponíveis no PORTAL, aqueles que melhor atendam a sua necessidade.',
          '2. Para cadastrar-se e administrar seu anúncio, você deverá criar um login e uma senha pessoal. Não divulgue ou empreste sua senha a terceiros.',
          '3. Você deve ser o proprietário ou possuir o direito de vendê-lo.',
          '4. As informações da(s) Máquina(s) Agrícola(s), Implemento(s), Máquina(s) Linha Amarela (Construção) e Caminhões devem ser inseridas no PORTAL completas e corretas. Caso o grupo HEAVYMOTORS identifique divergências, inconsistências, ou questionamentos judiciais (ou não) acerca da(s) Máquina(s) Agrícola(s), Implemento(s) Agrícola(s), Máquina(s) Linha Amarela (Construção) e Caminhões anunciado(s), poderá suspender a veiculação do anúncio ou solicitar sua adequação às regras do PORTAL, não gerando em seu favor quaisquer direitos a reembolso ou desconto no valor do pagamento já efetuado.',
          '4.1. O grupo HEAVYMOTORS poderá, a qualquer momento, solicitar a você documentos pessoais ou relacionados a(s) Máquina(s) Agrícola(s), Implemento(s) Agrícola(s), Máquina(s) Linha Amarela (Construção) e Caminhões anunciados, inclusive se tratar-se de um anúncio antigo.',
          '4.1.1. O anúncio contratado na modalidade “Até Vender” terá validade de 12 (doze) meses, podendo ser desativado sem prévio aviso.',
          '4.1.2. Para que o anúncio seja reativado após 12 (doze) meses, é necessário que o anunciante envie ao grupo HEAVYMOTORS uma cópia do documento da(s) Máquina(s) Agrícola(s), Implemento(s) Agrícola(s), Máquina(s) Linha Amarela (Construção) e Caminhões, regularizadas ou licenciados, a fim de comprovar a sua posse.',
          '4.2. No PORTAL, os anúncios são contratados para serem exibidos publicamente, a fim de que atinjam o seu propósito específico, garantindo sua ampla divulgação. Sendo assim, você concorda que eventuais informações, fotos e vídeos divulgados são de sua exclusiva responsabilidade e tornam-se públicos, podendo ser aproveitados, copiados, exibidos, distribuídos e/ ou utilizados por qualquer outro usuário que a eles tenham acesso, sem que lhe seja devida qualquer remuneração. Assim, você declara que não está impedido de divulgar tal informação/ foto/ vídeo.',
          '5. Não serão permitidos: anunciantes menores de 18 (dezoito) anos; anúncios com valores desproporcionais aos praticados em mercado; a transferência do anúncio e das demais obrigações aqui previstas a terceiros; o aproveitamento do anúncio para divulgação de produtos/serviços; e/ ou divulgação de outras Máquina(s) Agrícola(s), Implemento(s) Agrícola(s), Máquina(s) Linha Amarela (Construção) e Caminhões, diversos daquele para o qual o anúncio foi contratado.',
          '6. O campo "Observações"" do anúncio deve ser utilizado apenas para detalhar informações da(s) Máquina(s) Agrícola(s), Implemento(s) Agrícola(s), Máquina(s) Linha Amarela (Construção) e Caminhões, para o qual o anúncio foi contratado, tais como: condições de pagamento, forma de parcelamento, transferência; não sendo permitido utilizá-lo para divulgar telefones, links, endereço de loja, endereço de email, loja(s), leilões, e quaisquer outros produtos e/ ou serviços. O valor total deverá ser informado no campo "Preço".',
          '7. As fotos da(s) Máquina(s) Agrícola(s), Implemento(s) Agrícola(s), Máquina(s) Linha Amarela (Construção) e Caminhões anunciado(s), deverão seguir a "Política de Restrição de Imagens" disponível na área logada do anunciante e não poderão conter telefones, links, endereço da loja, endereço de email, loja(s), leilões, e quaisquer outros produtos e/ ou serviços, sob pena do anúncio ser suspenso mediante comunicação, até sua regularização em 3 (três) dias.',
          '8. Após a compensação de pagamento, seu anúncio poderá ser visualizado no PORTAL em até 2 dias úteis, após a confirmação de seus dados pelo grupo HEAVYMOTORS, sem prejuízo do disposto no item 4.1 deste Termo de Adesão.',
          '8.1. APÓS O PAGAMENTO NÃO SERÁ POSSÍVEL ALTERAR informações tais como: CEP, quilometragem inferior ao inicialmente cadastrado, marca, modelo, versão, placa, cor e ano da(s) Máquina(s) Agrícola(s), Implemento(s) Agrícola(s), Máquina(s) Linha Amarela (Construção) e Caminhões.',
          '8.2. Os campos "Opcional" e "Observações do Anúncio" são editáveis a qualquer tempo. Para as demais informações, o prazo máximo de alteração é de 15 (quinze) dias contados da data do início da veiculação.',
          '9. Saiba que são estabelecidos alguns critérios para a pesquisa no PORTAL e ordenação dos anúncios, conforme regras estabelecidas nos Termos de Uso do Portal HEAVYMOTORS.',
          '9.1 Essa ordem poderá ser alterada a critério do comprador, de acordo com informações como preço, estado do equipamento, quilometragem, ano, etc.',
          '10. Somente será permitido o upgrade da modalidade de anúncio contratada, isto é, a migração para uma modalidade superior à já contratada.',
          '10.1. Ao optar pelo upgrade, você concorda em pagar o valor da diferença entre a nova modalidade escolhida e à anteriormente contratada.',
          '10.2. Ao passar pelo upgrade, o histórico do anúncio deve ser mantido e o tempo de exposição será renovado, por mais 60 (sessenta) dias, até ele expirar ou até que você faça reativação do mesmo nos termos da cláusula 16 deste Termo.',
          '10.3. O grupo HEAVYMOTORS não limitará a quantidade de anúncios que podem ser contratados por um CPF ou CNPJ.',
        ])}
        {term('II - RESPONSABILIDADES', '', [
          '11. O grupo HEAVYMOTRS NÃO garante que a sua(s) Máquina(s) Agrícola(s), Implemento(s) Agrícola(s), Máquina(s) Linha Amarela (Construção) e Caminhões, serão vendido(s) e NÃO faz intermediação entre você e as pessoas que acessam o PORTAL.',
          '12. Os direitos e obrigações relativos à compra e venda da(s) Máquina(s) Agrícola(s), Implemento(s) Agrícola(s), Máquina(s) Linha Amarela (Construção) e Caminhões, são de sua exclusiva responsabilidade, não assumindo, portanto, o grupo HEAVYMOTORS nenhuma responsabilidade por qualquer consequência que possa advir da relação entre você e os compradores.',
        ])}
        {term(
          'III - DISPONIBILIDADE DO PORTAL',
          '13. O acesso ao PORTAL é de 24 (vinte e quatro) horas por dia, 7 (sete) dias por semana, podendo ocorrer situações em que o acesso se torne mais lento ou inoperante sem que isso caracterize descumprimento pelo grupo HEAVYMOTORS das condições aqui estabelecidas, não lhe sendo devido nenhum desconto ou reembolso por eventual período de instabilidade.',
        )}
        {term('IV - VIGÊNCIA E RESCISÃO', '', [
          '14. Este Termo terá vigência durante o período de duração do anúncio, podendo ser rescindido sem prévia comunicação, por descumprimento de obrigações legais e/ ou das condições aqui previstas, incluindo: atos que possam configurar indícios de ocorrência dos crimes previstos na Lei nº 9.613/98; veiculação de informações falsas; reaproveitamento de anúncio; e/ ou má utilização do campo "Observações", nos termos dos itens 5 e 6.',
          '15. Caso você não utilize todos os recursos ou serviços adicionais contratados, desista ou venda sua(s) Máquina(s) Agrícola(s), Implemento(s) Agrícola(s), Máquina(s) Linha Amarela (Construção) e Caminhões, antes de expirar o prazo de seu anúncio, ou ainda, por qualquer motivo, seu anúncio seja cancelado, antes do prazo contratado, por sua solicitação ou por descumprimento do estabelecido neste Termo, não lhe será devido nenhum desconto ou reembolso.',
          '16. Quando houver contratação na modalidade “até vender”, que contém prazo de vigência de veiculação indefinido, o anúncio será desativado a cada 60 (sessenta) dias, cabendo ao anunciante reativá-lo na área logada',
          '17. Os anúncios desativados por mais de 12 (doze) meses serão excluídos do PORTAL, sem a necessidade de prévio aviso.',
        ])}
        {term('V - DISPOSIÇÕES FINAIS', '', [
          '18. As comunicações entre o grupo HEAVYMOTORS e você serão feitas por intermédio do e-mail indicado no seu cadastro.',
          '19. Os direitos autorais e intelectuais do PORTAIS pertencem exclusivamente ao grupo HEAVYMOTORS, sendo vedada a cópia, comercialização ou qualquer tipo de utilização que não esteja prevista neste Termo ou no PORTAL.',
          '20. Para maiores informações acerca do monitoramento de acesso, guarda, proteção e divulgação de suas informações, consulte a Política de Privacidade e Segurança de Dados do Portal do Grupo HEAVYMOTORS.',
          '21. Você declara que teve acesso, leu e não tem nenhuma dúvida sobre os Termos de Uso do Portal HEAVYMOTORS e Política de Privacidade e Segurança de Dados dos Portais do Grupo HEAVYMOTORS, aderindo por sua livre escolha às condições destes termos para o acesso aos PORTAIS.',
          'Por estarem de acordo com as condições estipuladas neste instrumento, as PARTES firmam o presente Contrato.',
          '* Nome: XXXXXXXX',
          '* C.P.F.: XXX.XXX.XXX-XX',
          '* Anúncio escolhido: XXXXXX (MAQUINÁRIO)',
          '* Valor do anúncio: R$',
          '* (Cidade), (Data) de (Mês) de (Ano).',
          'HEAVYMOTORS (DEMAX TECH SOLUÇÕES EM TECNOLOGIA LTDA.), CNPJ: 36.778.321/0002-40, Rua Doutor Brasilio Vicente de Castro, nº 111, Sala 3030, Condomínio Eurobusiness, Campo Comprido, Curitiba/PR – CEP: 81.200-526.',
        ])}
      </Container>
    </ScrollView>
  );
};

export default PaymentTerms;
