# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Find Transactions\CT19-Realizar-busca-de-transações-por-Data-ou-Período.spec.ts >> CT19 - Realizar busca de transação por Data
- Location: tests\Find Transactions\CT19-Realizar-busca-de-transações-por-Data-ou-Período.spec.ts:52:5

# Error details

```
"beforeAll" hook timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "Error 1015" [level=1] [ref=e5]
    - generic [ref=e6]: "Ray ID: a05152b72ac78781 •"
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
      - strong [ref=e22]: a05152b72ac78781
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
  1   | import { test, expect } from '@playwright/test';
  2   | import { generateNewUser } from '../../utils/generateUser';
  3   | 
  4   | // Variáveis de escopo do arquivo
  5   | let usuario: string;
  6   | let senha: string;
  7   | let nomeUsuario: string;
  8   | let firstName: string;
  9   | let lastName: string;
  10  | 
> 11  | test.beforeAll("Registrar dados do usuário no Parabank", async ({ browser }) => {
      |      ^ "beforeAll" hook timeout of 30000ms exceeded.
  12  |     const dadosAleatorios = generateNewUser();
  13  |     
  14  |     usuario = dadosAleatorios.usuario;
  15  |     senha = dadosAleatorios.senha;
  16  |     nomeUsuario = dadosAleatorios.nomeUsuario;
  17  |     firstName = dadosAleatorios.firstName;
  18  |     lastName = dadosAleatorios.lastName;
  19  | 
  20  |     const page = await browser.newPage();
  21  |     await page.goto("https://parabank.parasoft.com/parabank/register.htm");
  22  | 
  23  |     await page.locator("[id='customer\\.firstName']").fill(firstName);
  24  |     await page.locator("[id='customer\\.lastName']").fill(lastName);
  25  |     await page.locator("[id='customer\\.address\\.street']").fill("Rua QA 123");
  26  |     await page.locator("[id='customer\\.address\\.city']").fill("Recife");
  27  |     await page.locator("[id='customer\\.address\\.state']").fill("PE");
  28  |     await page.locator("[id='customer\\.address\\.zipCode']").fill("50000-000");
  29  |     await page.locator("[id='customer\\.phoneNumber']").fill("81999999999");
  30  |     await page.locator("[id='customer\\.ssn']").fill("000-00-0000");
  31  |     
  32  |     await page.locator("[id='customer\\.username']").fill(usuario);
  33  |     await page.locator("[id='customer\\.password']").fill(senha);
  34  |     await page.locator("#repeatedPassword").fill(senha);
  35  | 
  36  |     await page.getByRole("button", { name: "Register" }).click();
  37  |     await expect(page.getByText("Your account was created successfully")).toBeVisible();
  38  | 
  39  |     await page.close();
  40  | });
  41  | 
  42  | test.beforeEach("Realizar login", async ({ page }) => {
  43  |     await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  44  |     
  45  |     await page.locator(".login").locator("[name='username']").fill(usuario);
  46  |     await page.locator(".login").locator("[name='password']").fill(senha);
  47  |     
  48  |     await page.getByRole("button", { name: "Log In" }).click();
  49  |     await expect(page.locator("#leftPanel")).toBeVisible();
  50  | });
  51  | 
  52  | test("CT19 - Realizar busca de transação por Data", async ({ page }) => {
  53  |     console.log(`Executando CT19 para o usuário: ${nomeUsuario}`);
  54  |     console.log(`Usuário: ${usuario}`);
  55  |     console.log(`senha: ${senha}`);
  56  | 
  57  |     // --- PRÉ-REQUISITO: Gerar uma transação no dia de hoje ---
  58  |     const valorDaTransferencia = "25"; // Valor qualquer apenas para gerar a transação
  59  |     
  60  |     await page.getByRole("link", { name: "Transfer Funds" }).click();
  61  |     await page.waitForSelector("#fromAccountId option", { state: 'attached' });
  62  |     await page.waitForTimeout(1000);
  63  | 
  64  |     await page.locator("#amount").fill(valorDaTransferencia);
  65  |     
  66  |     const contaOrigem = await page.locator("#fromAccountId option").first().getAttribute("value");
  67  |     if (contaOrigem) {
  68  |         await page.locator("#fromAccountId").selectOption(contaOrigem);
  69  |         await page.locator("#toAccountId").selectOption(contaOrigem); // Transfere para si mesmo
  70  |     }
  71  |     await page.getByRole("button", { name: "Transfer" }).click();
  72  |     await expect(page.getByText("Transfer Complete!")).toBeVisible();
  73  |     // ------------------------------------------------------------------
  74  | 
  75  |     // 1. Given que o usuário esteja na funcionalidade "Find Transactions"
  76  |     await page.getByRole("link", { name: "Find Transactions" }).click();
  77  | 
  78  |     // 2. When selecionar uma conta válida
  79  |     await page.waitForSelector("#accountId option", { state: 'attached' });
  80  |     await page.waitForTimeout(1000);
  81  |     if (contaOrigem) {
  82  |         await page.locator("#accountId").selectOption(contaOrigem);
  83  |     }
  84  | 
  85  |     // 3. And preencher o campo "Find by Date" com uma data válida
  86  |     // Pegamos a data atual do sistema e formatamos para MM-DD-YYYY conforme exige o Parabank
  87  |     const hoje = new Date();
  88  |     const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  89  |     const dia = String(hoje.getDate()).padStart(2, '0');
  90  |     const ano = hoje.getFullYear();
  91  |     const dataFormatada = `${mes}-${dia}-${ano}`;
  92  |     
  93  |     console.log(`Buscando transações da data: ${dataFormatada}`);
  94  | 
  95  |     // Tentamos usar o padrão de ID que o Parabank geralmente adota para este campo
  96  |     // Se der timeout aqui depois, precisaremos inspecionar o elemento como fizemos no Amount!
  97  |     await page.locator("#transactionDate").fill(dataFormatada);
  98  | 
  99  |     // 4. And clicar no botão "Find Transactions"
  100 |     // Seguindo a lógica do findByAmount, o botão de data deve ser findByDate
  101 |     await page.locator("#findByDate").click();
  102 | 
  103 |     // 5. Then o sistema deve exibir a listagem de todas as transações ocorridas na data
  104 |     const tabelaResultados = page.locator("#transactionTable");
  105 |     await expect(tabelaResultados).toBeVisible();
  106 |     
  107 |     // Valida se o valor da transação que fizemos hoje ($25.00) apareceu nos resultados filtrados
  108 |     await expect(tabelaResultados).toContainText(`$${valorDaTransferencia}.00`);
  109 |     
  110 |     console.log("✅ SUCESSO NO TESTE: O sistema encontrou a transação filtrando pela data de hoje.");
  111 | });
```