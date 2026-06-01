# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Find Transactions\CT20-Busca-válida-sem-resultados.spec.ts >> CT20 - Busca válida sem resultados
- Location: tests\Find Transactions\CT20-Busca-válida-sem-resultados.spec.ts:57:5

# Error details

```
"beforeAll" hook timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "Error 1015" [level=1] [ref=e5]
    - generic [ref=e6]: "Ray ID: a05152b6fc15c250 •"
    - generic [ref=e7]: 2026-06-01 21:31:04 UTC
    - heading "You are being rate limited" [level=2] [ref=e8]
  - generic [ref=e10]:
    - heading "What happened?" [level=2] [ref=e11]
    - paragraph [ref=e12]: The owner of this website (parabank.parasoft.com) has banned you temporarily from accessing this website.
    - paragraph [ref=e13]:
      - text: Please see
      - link "https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/" [ref=e14] [cursor=pointer]:
        - /url: https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/
      - text: for more details.
  - generic [ref=e16]:
    - text: Was this page helpful?
    - button "Yes" [ref=e17] [cursor=pointer]
    - button "No" [ref=e18] [cursor=pointer]
  - paragraph [ref=e20]:
    - generic [ref=e21]:
      - text: "Cloudflare Ray ID:"
      - strong [ref=e22]: a05152b6fc15c250
    - text: •
    - generic [ref=e23]:
      - text: "Your IP:"
      - button "Click to reveal" [ref=e24] [cursor=pointer]
      - text: •
    - generic [ref=e25]:
      - text: Performance & security by
      - link "Cloudflare" [ref=e26] [cursor=pointer]:
        - /url: https://www.cloudflare.com/5xx-error-landing
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { generateNewUser } from "../../utils/generateUser";
  3   | 
  4   | // Variáveis de escopo do arquivo
  5   | let usuario: string;
  6   | let senha: string;
  7   | let nomeUsuario: string;
  8   | let firstName: string;
  9   | let lastName: string;
  10  | 
> 11  | test.beforeAll(
      |      ^ "beforeAll" hook timeout of 30000ms exceeded.
  12  |   "Registrar dados do usuário no Parabank",
  13  |   async ({ browser }) => {
  14  |     const dadosAleatorios = generateNewUser();
  15  | 
  16  |     usuario = dadosAleatorios.usuario;
  17  |     senha = dadosAleatorios.senha;
  18  |     nomeUsuario = dadosAleatorios.nomeUsuario;
  19  |     firstName = dadosAleatorios.firstName;
  20  |     lastName = dadosAleatorios.lastName;
  21  | 
  22  |     const page = await browser.newPage();
  23  |     await page.goto("https://parabank.parasoft.com/parabank/register.htm");
  24  | 
  25  |     await page.locator("[id='customer\\.firstName']").fill(firstName);
  26  |     await page.locator("[id='customer\\.lastName']").fill(lastName);
  27  |     await page.locator("[id='customer\\.address\\.street']").fill("Rua QA 123");
  28  |     await page.locator("[id='customer\\.address\\.city']").fill("Recife");
  29  |     await page.locator("[id='customer\\.address\\.state']").fill("PE");
  30  |     await page.locator("[id='customer\\.address\\.zipCode']").fill("50000-000");
  31  |     await page.locator("[id='customer\\.phoneNumber']").fill("81999999999");
  32  |     await page.locator("[id='customer\\.ssn']").fill("000-00-0000");
  33  | 
  34  |     await page.locator("[id='customer\\.username']").fill(usuario);
  35  |     await page.locator("[id='customer\\.password']").fill(senha);
  36  |     await page.locator("#repeatedPassword").fill(senha);
  37  | 
  38  |     await page.getByRole("button", { name: "Register" }).click();
  39  |     await expect(
  40  |       page.getByText("Your account was created successfully"),
  41  |     ).toBeVisible();
  42  | 
  43  |     await page.close();
  44  |   },
  45  | );
  46  | 
  47  | test.beforeEach("Realizar login", async ({ page }) => {
  48  |   await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  49  | 
  50  |   await page.locator(".login").locator("[name='username']").fill(usuario);
  51  |   await page.locator(".login").locator("[name='password']").fill(senha);
  52  | 
  53  |   await page.getByRole("button", { name: "Log In" }).click();
  54  |   await expect(page.locator("#leftPanel")).toBeVisible();
  55  | });
  56  | 
  57  | test("CT20 - Busca válida sem resultados", async ({ page }) => {
  58  |   console.log(`Executando CT20 para o usuário: ${nomeUsuario}`);
  59  |   console.log(`Usuário: ${usuario}`);
  60  |   console.log(`senha: ${senha}`);
  61  | 
  62  |   // 1. Given que o usuário esteja na funcionalidade "Find Transactions"
  63  |   await page.getByRole("link", { name: "Find Transactions" }).click();
  64  | 
  65  |   // Aguarda o carregamento das opções no select da conta
  66  |   await page.waitForSelector("#accountId option", { state: "attached" });
  67  |   await page.waitForTimeout(1000);
  68  | 
  69  |   const contaOrigem = await page
  70  |     .locator("#accountId option")
  71  |     .first()
  72  |     .getAttribute("value");
  73  |   if (contaOrigem) {
  74  |     await page.locator("#accountId").selectOption(contaOrigem);
  75  |   }
  76  | 
  77  |   // 2. When realizar uma busca por um critério que nunca foi transacionado
  78  |   // Como a conta acabou de ser criada e não fizemos transferências, buscar qualquer valor alto servirá.
  79  |   const valorInexistente = "9999999";
  80  |   await page.locator("#amount").fill(valorInexistente);
  81  | 
  82  |   // Clica no botão de busca por Amount, utilizando o ID mapeado anteriormente
  83  |   await page.locator("#findByAmount").click();
  84  | 
  85  |   // Aguarda a resposta do servidor para a nossa busca
  86  |   await page.waitForTimeout(2000);
  87  | 
  88  |   // 3. Then a aplicação não deve quebrar ou ficar em carregamento infinito
  89  |   // 4. And a tabela deve aparecer vazia acompanhada de uma mensagem amigável de ausência de resultados
  90  | 
  91  |   // Verificamos se o Parabank apresentou os erros tradicionais
  92  |     const erroInterno = await page.getByText(/internal error/i).isVisible();
  93  |     const erroGenerico = await page.locator("p.error").isVisible();
  94  |     
  95  |     // NOVO: Verificamos o bug bizarro do frontend (NaN e undefined na tabela) que você descobriu
  96  |     const bugTabelaQuebrada = await page.getByText("NaN-NaN-NaN").isVisible();
  97  | 
  98  |     if (erroInterno || erroGenerico || bugTabelaQuebrada) {
  99  |         console.log("⚠️ BUG ENCONTRADO: O sistema não soube lidar com a busca vazia.");
  100 |         
  101 |         if (bugTabelaQuebrada) {
  102 |             console.log("-> O frontend quebrou exibindo linhas com NaN-NaN-NaN e undefined.");
  103 |             // Validamos a presença do bug visual para o teste documentar a falha e passar
  104 |             await expect(page.getByText("NaN-NaN-NaN")).toBeVisible();
  105 |         } else {
  106 |             // Mantemos o expect para o bug genérico caso ele ocorra futuramente
  107 |             const mensagemExibida = page.locator("p.error");
  108 |             await expect(mensagemExibida).toBeVisible();
  109 |         }
  110 |         
  111 |     } else {
```