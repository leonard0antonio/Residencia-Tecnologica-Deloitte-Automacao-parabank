# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Request Loan\CT16-Tentativa-de-empréstimo-sem-saldo-suficiente-para-a-entrada.spec.ts >> CT16 - Tentativa de empréstimo sem saldo suficiente para a entrada
- Location: tests\Request Loan\CT16-Tentativa-de-empréstimo-sem-saldo-suficiente-para-a-entrada.spec.ts:52:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#loanStatus')
Expected: "Denied"
Received: "Approved"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#loanStatus')
    14 × locator resolved to <td id="loanStatus">Approved</td>
       - unexpected value "Approved"

```

```yaml
- cell "Approved"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { generateNewUser } from '../../utils/generateUser';
  3  | 
  4  | // Variáveis de escopo do arquivo
  5  | let usuario: string;
  6  | let senha: string;
  7  | let nomeUsuario: string;
  8  | let firstName: string;
  9  | let lastName: string;
  10 | 
  11 | test.beforeAll("Registrar dados do usuário no Parabank", async ({ browser }) => {
  12 |     const dadosAleatorios = generateNewUser();
  13 |     
  14 |     usuario = dadosAleatorios.usuario;
  15 |     senha = dadosAleatorios.senha;
  16 |     nomeUsuario = dadosAleatorios.nomeUsuario;
  17 |     firstName = dadosAleatorios.firstName;
  18 |     lastName = dadosAleatorios.lastName;
  19 | 
  20 |     const page = await browser.newPage();
  21 |     await page.goto("https://parabank.parasoft.com/parabank/register.htm");
  22 | 
  23 |     await page.locator("[id='customer\\.firstName']").fill(firstName);
  24 |     await page.locator("[id='customer\\.lastName']").fill(lastName);
  25 |     await page.locator("[id='customer\\.address\\.street']").fill("Rua QA 123");
  26 |     await page.locator("[id='customer\\.address\\.city']").fill("Recife");
  27 |     await page.locator("[id='customer\\.address\\.state']").fill("PE");
  28 |     await page.locator("[id='customer\\.address\\.zipCode']").fill("50000-000");
  29 |     await page.locator("[id='customer\\.phoneNumber']").fill("81999999999");
  30 |     await page.locator("[id='customer\\.ssn']").fill("000-00-0000");
  31 |     
  32 |     await page.locator("[id='customer\\.username']").fill(usuario);
  33 |     await page.locator("[id='customer\\.password']").fill(senha);
  34 |     await page.locator("#repeatedPassword").fill(senha);
  35 | 
  36 |     await page.getByRole("button", { name: "Register" }).click();
  37 |     await expect(page.getByText("Your account was created successfully")).toBeVisible();
  38 | 
  39 |     await page.close();
  40 | });
  41 | 
  42 | test.beforeEach("Realizar login", async ({ page }) => {
  43 |     await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  44 |     
  45 |     await page.locator(".login").locator("[name='username']").fill(usuario);
  46 |     await page.locator(".login").locator("[name='password']").fill(senha);
  47 |     
  48 |     await page.getByRole("button", { name: "Log In" }).click();
  49 |     await expect(page.locator("#leftPanel")).toBeVisible();
  50 | });
  51 | 
  52 | test("CT16 - Tentativa de empréstimo sem saldo suficiente para a entrada", async ({ page }) => {
  53 |     console.log(`Executando CT16 para o usuário: ${nomeUsuario}`);
  54 |     console.log(`Usuário: ${usuario}`);
  55 |     console.log(`senha: ${senha}`);
  56 | 
  57 |     // 1. Given que o usuário esteja na funcionalidade "Apply for a Loan"
  58 |     await page.getByRole("link", { name: "Request Loan" }).click();
  59 | 
  60 |     // 2. When informar valores numéricos válidos nos campos "Loan Amount" e "Down Payment"
  61 |     // Solicitamos um empréstimo alto
  62 |     await page.locator("#amount").fill("50000");
  63 |     
  64 |     // 3. And selecionar uma conta de origem que possua saldo inferior ao valor definido para o "Down Payment"
  65 |     // Inserimos uma entrada (Down Payment) muito maior que o saldo inicial da conta (que é de ~$515)
  66 |     await page.locator("#downPayment").fill("5000");
  67 | 
  68 |     // Aguarda a opção da conta ser anexada ao DOM para evitar timeout
  69 |     await page.waitForSelector("#fromAccountId option", { state: 'attached' });
  70 |     await page.waitForTimeout(1000);
  71 | 
  72 |     const contaOrigem = await page.locator("#fromAccountId option").first().getAttribute("value");
  73 |     if (contaOrigem) {
  74 |         await page.locator("#fromAccountId").selectOption(contaOrigem);
  75 |     }
  76 | 
  77 |     // 4. And clicar no botão "Apply Now"
  78 |     await page.getByRole("button", { name: "Apply Now" }).click();
  79 | 
  80 |     // 5. Then o sistema deve avaliar os fundos e recusar a operação
  81 |     await expect(page.getByText("Loan Request Processed")).toBeVisible();
  82 | 
  83 |     // 6. And exibir o status do empréstimo como "Denied"
  84 |     const statusEmprestimo = page.locator("#loanStatus");
  85 |     await expect(statusEmprestimo).toBeVisible();
> 86 |     await expect(statusEmprestimo).toHaveText("Denied");
     |                                    ^ Error: expect(locator).toHaveText(expected) failed
  87 | 
  88 |     // (Opcional/Bônus) Validamos também a mensagem de erro específica que o Parabank exibe em vermelho
  89 |     const mensagemErro = page.getByText("You do not have sufficient funds for the given down payment.");
  90 |     await expect(mensagemErro).toBeVisible();
  91 |     
  92 |     console.log("✅ SUCESSO NO TESTE: O sistema negou o empréstimo corretamente por falta de fundos para a entrada.");
  93 | });
```