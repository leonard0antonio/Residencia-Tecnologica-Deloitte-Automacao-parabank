# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Find Transactions\CT18-Realizar-busca-de-transação-por-Identificador-ID-ou-Valor.spec.ts >> CT18 - Realizar busca de transação por Valor
- Location: tests\Find Transactions\CT18-Realizar-busca-de-transação-por-Identificador-ID-ou-Valor.spec.ts:52:5

# Error details

```
"beforeAll" hook timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "Error 1015" [level=1] [ref=e5]
    - generic [ref=e6]: "Ray ID: a05153bbad1674c3 •"
    - generic [ref=e7]: 2026-06-01 21:31:45 UTC
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
      - strong [ref=e22]: a05153bbad1674c3
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
  52  | test("CT18 - Realizar busca de transação por Valor", async ({ page }) => {
  53  |     console.log(`Executando CT18 para o usuário: ${nomeUsuario}`);
  54  |     console.log(`Usuário: ${usuario}`);
  55  |     console.log(`senha: ${senha}`);
  56  | 
  57  |     // --- PRÉ-REQUISITO: Gerar uma transação conhecida para buscarmos ---
  58  |     // Fazemos uma transferência rápida de um valor específico para garantir o histórico
  59  |     const valorDaBusca = "15";
  60  |     
  61  |     await page.getByRole("link", { name: "Transfer Funds" }).click();
  62  |     await page.waitForSelector("#fromAccountId option", { state: 'attached' });
  63  |     await page.waitForTimeout(1000); // Pausa para carregamento AJAX
  64  | 
  65  |     await page.locator("#amount").fill(valorDaBusca);
  66  |     
  67  |     const contaOrigem = await page.locator("#fromAccountId option").first().getAttribute("value");
  68  |     if (contaOrigem) {
  69  |         await page.locator("#fromAccountId").selectOption(contaOrigem);
  70  |         await page.locator("#toAccountId").selectOption(contaOrigem); // Transfere para a própria conta
  71  |     }
  72  |     await page.getByRole("button", { name: "Transfer" }).click();
  73  |     await expect(page.getByText("Transfer Complete!")).toBeVisible();
  74  |     // ------------------------------------------------------------------
  75  | 
  76  |     // 1. Given que o usuário esteja na funcionalidade "Find Transactions"
  77  |     await page.getByRole("link", { name: "Find Transactions" }).click();
  78  | 
  79  |     // 2. When selecionar uma conta válida
  80  |     await page.waitForSelector("#accountId option", { state: 'attached' });
  81  |     await page.waitForTimeout(1000);
  82  |     if (contaOrigem) {
  83  |         await page.locator("#accountId").selectOption(contaOrigem);
  84  |     }
  85  | 
  86  |     // 3. And preencher o campo "Find by Amount" com um dado existente
  87  |     // No Parabank, IDs com pontos precisam ter a barra invertida (\\) no Playwright
  88  |     await page.locator("#amount").fill(valorDaBusca);
  89  |     
  90  |     // 4. And clicar no respectivo botão "Find Transactions"
  91  |     // O Parabank tem vários botões com o mesmo nome nesta tela. 
  92  |     // Usamos um seletor que aponta diretamente para a ação (ng-click) do botão de Amount.
  93  |    await page.locator("#findByAmount").click();
  94  | 
  95  |     // 5. Then o sistema deve retornar a tabela exibindo os dados corretos da transação
  96  |     const tabelaResultados = page.locator("#transactionTable");
  97  |     
  98  |     // Validamos se a tabela apareceu na tela
  99  |     await expect(tabelaResultados).toBeVisible();
  100 |     
  101 |     // Validamos se o valor que transferimos ($15.00) está visível nos resultados da tabela
  102 |     await expect(tabelaResultados).toContainText(`$${valorDaBusca}.00`);
  103 |     
  104 |     console.log(`✅ SUCESSO NO TESTE: O sistema encontrou a transação de $${valorDaBusca}.00 com sucesso.`);
  105 | });
```