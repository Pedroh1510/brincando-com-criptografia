[![Codacy Badge](https://app.codacy.com/project/badge/Grade/bd1be1cb90434c06a71efcc9adcc9381)](https://www.codacy.com/gh/Pedroh1510/brincando-com-criptografia/dashboard?utm_source=github.com&utm_medium=referral&utm_content=Pedroh1510/brincando-com-criptografia&utm_campaign=Badge_Grade)

# Criptografia

Aplicação desenvolvida a partir do desafio [backend-br](https://github.com/backend-br/desafios/tree/master/2%20-%20Medium/Criptografia). Com o intuito de praticar a aplicação de criptografia em dados sensíveis, autenticação e autorização para acesso aos dados.

## Tecnologias

- [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) - criptografia dos dados.
- [celebrate](https://github.com/arb/celebrate#readme) - validação dos parâmetros das rotas.
- [uuid](https://github.com/uuidjs/uuid#readme) - criação dos uuids.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) - criação de tokens.
- [express](http://expressjs.com/) - criação da api.
- [jest](https://jestjs.io/) - testes automatizados.
- [Helmet](https://helmetjs.github.io/) - definir alguns cabeçalhos HTTP
- [compression](https://github.com/expressjs/compression#readme) - reduzir o tamanho do corpo de resposta

## Preparativos

Remova o ".example" do arquivo ".env.example", é preencha com suas credenciais.

## Executando

```sh
git clone https://github.com/Pedroh1510/brincando-com-criptografia.git

yarn install

yarn dev
```
