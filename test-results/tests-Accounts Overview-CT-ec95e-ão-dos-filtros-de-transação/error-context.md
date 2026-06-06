# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Accounts Overview\CT04-Utilizacao-dos-filtros-de-transacao.spec.ts >> CT04 - Utilização dos filtros de transação
- Location: tests\Accounts Overview\CT04-Utilizacao-dos-filtros-de-transacao.spec.ts:54:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Your account was created successfully')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Your account was created successfully')

```

```yaml
- link:
  - /url: admin.htm
  - img
- link "ParaBank":
  - /url: index.htm
  - img "ParaBank"
- paragraph: Experience the difference
- list:
  - listitem: Solutions
  - listitem:
    - link "About Us":
      - /url: about.htm
  - listitem:
    - link "Services":
      - /url: services.htm
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
  - listitem:
    - link "Admin Page":
      - /url: admin.htm
- list:
  - listitem:
    - link "home":
      - /url: index.htm
  - listitem:
    - link "about":
      - /url: about.htm
  - listitem:
    - link "contact":
      - /url: contact.htm
- heading "Customer Login" [level=2]
- paragraph: Username
- textbox
- paragraph: Password
- textbox
- button "Log In"
- paragraph:
  - link "Forgot login info?":
    - /url: lookup.htm
- paragraph:
  - link "Register":
    - /url: register.htm
- heading "Signing up is easy!" [level=1]
- paragraph: If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.
- table:
  - rowgroup:
    - 'row "First Name: Audie"':
      - cell "First Name:"
      - cell "Audie":
        - textbox: Audie
      - cell
    - 'row "Last Name: Kemmer"':
      - cell "Last Name:"
      - cell "Kemmer":
        - textbox: Kemmer
      - cell
    - 'row "Address: Rua QA 123"':
      - cell "Address:"
      - cell "Rua QA 123":
        - textbox: Rua QA 123
      - cell
    - 'row "City: Recife"':
      - cell "City:"
      - cell "Recife":
        - textbox: Recife
      - cell
    - 'row "State: PE"':
      - cell "State:"
      - cell "PE":
        - textbox: PE
      - cell
    - 'row "Zip Code: 50000-000"':
      - cell "Zip Code:"
      - cell "50000-000":
        - textbox: 50000-000
      - cell
    - 'row "Phone #: 81999999999"':
      - 'cell "Phone #:"'
      - cell "81999999999":
        - textbox: "81999999999"
      - cell
    - 'row "SSN: 000-00-0000"':
      - cell "SSN:"
      - cell "000-00-0000":
        - textbox: 000-00-0000
      - cell
    - row:
      - cell
    - 'row "Username: Audie6549 This username already exists."':
      - cell "Username:"
      - cell "Audie6549":
        - textbox: Audie6549
      - cell "This username already exists."
    - row "Password:":
      - cell "Password:"
      - cell:
        - textbox
      - cell
    - row "Confirm:":
      - cell "Confirm:"
      - cell:
        - textbox
      - cell
    - row "Register":
      - cell
      - cell "Register":
        - button "Register"
- list:
  - listitem:
    - link "Home":
      - /url: index.htm
    - text: "|"
  - listitem:
    - link "About Us":
      - /url: about.htm
    - text: "|"
  - listitem:
    - link "Services":
      - /url: services.htm
    - text: "|"
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
    - text: "|"
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
    - text: "|"
  - listitem:
    - link "Forum":
      - /url: http://forums.parasoft.com/
    - text: "|"
  - listitem:
    - link "Site Map":
      - /url: sitemap.htm
    - text: "|"
  - listitem:
    - link "Contact Us":
      - /url: contact.htm
- paragraph: © Parasoft. All rights reserved.
- list:
  - listitem: "Visit us at:"
  - listitem:
    - link "www.parasoft.com":
      - /url: http://www.parasoft.com/
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
  23 |     // Preenchendo o formulário de cadastro
  24 |     await page.locator("[id='customer\\.firstName']").fill(firstName);
  25 |     await page.locator("[id='customer\\.lastName']").fill(lastName);
  26 |     await page.locator("[id='customer\\.address\\.street']").fill("Rua QA 123");
  27 |     await page.locator("[id='customer\\.address\\.city']").fill("Recife");
  28 |     await page.locator("[id='customer\\.address\\.state']").fill("PE");
  29 |     await page.locator("[id='customer\\.address\\.zipCode']").fill("50000-000");
  30 |     await page.locator("[id='customer\\.phoneNumber']").fill("81999999999");
  31 |     await page.locator("[id='customer\\.ssn']").fill("000-00-0000");
  32 | 
  33 |     // Preenchendo os campos de login com os dados gerados
  34 |     await page.locator("[id='customer\\.username']").fill(usuario);
  35 |     await page.locator("[id='customer\\.password']").fill(senha);
  36 |     await page.locator("#repeatedPassword").fill(senha);
  37 | 
  38 |     await page.getByRole("button", { name: "Register" }).click();
> 39 |     await expect(page.getByText("Your account was created successfully")).toBeVisible();
     |                                                                           ^ Error: expect(locator).toBeVisible() failed
  40 | 
  41 |     await page.close();
  42 | });
  43 | 
  44 | test.beforeEach("Realizar login", async ({ page }) => {
  45 |     await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  46 | 
  47 |     await page.locator(".login").locator("[name='username']").fill(usuario);
  48 |     await page.locator(".login").locator("[name='password']").fill(senha);
  49 | 
  50 |     await page.getByRole("button", { name: "Log In" }).click();
  51 |     await expect(page.locator("#leftPanel")).toBeVisible();
  52 | });
  53 | 
  54 | test("CT04 - Utilização dos filtros de transação", async ({ page }) => {
  55 |     console.log(`Executando CT04 para o usuário: ${nomeUsuario}`);
  56 |     
  57 |     // Given que o usuário esteja na seção Account Activity de uma conta
  58 |     // Navegue para Accounts Overview.
  59 |     await page.getByRole("link", { name: "Accounts Overview" }).click();
  60 | 
  61 |     // Localize o primeiro link de conta na tabela (#accountTable tbody tr:first-child a) e clique nele para acessar a tela de detalhes.
  62 |     const primeiraContaLink = page.locator("#accountTable tbody tr").first().locator("a");
  63 |     await expect(primeiraContaLink).toBeVisible();
  64 |     await primeiraContaLink.click();
  65 | 
  66 |     // When selecionar o período (Activity Period) e o tipo de transação (Type) nos filtros
  67 |     // Na tela de Account Details, selecione a opção 'All' no dropdown de período (id #month).
  68 |     await page.locator("#month").selectOption("All");
  69 | 
  70 |     // Selecione a opção 'Credit' no dropdown de tipo (id #transactionType).
  71 |     await page.locator("#transactionType").selectOption("Credit");
  72 | 
  73 |     // And clicar no botão GO
  74 |     // Clique no botão com o nome 'Go' ou seletor input[value='Go'].
  75 |     await page.locator("input[value='Go']").click();
  76 | 
  77 |     // Then a tabela deve atualizar exibindo apenas as transações que respeitem os filtros escolhidos
  78 |     // Aguarde um delay do Parabank
  79 |     await page.waitForTimeout(1000);
  80 | 
  81 |     // Valide que a tabela de transações (#transactionTable) está visível ou a mensagem de 'No transactions found.'
  82 |     const transactionTable = page.locator("#transactionTable");
  83 |     const noTransactionsMessage = page.getByText("No transactions found.");
  84 |     
  85 |     // O Parabank oculta a tabela se não houver resultados para o filtro
  86 |     if (await noTransactionsMessage.isVisible()) {
  87 |         console.log("Filtro aplicado: Nenhuma transação encontrada (Página não quebrou).");
  88 |     } else {
  89 |         await expect(transactionTable).toBeVisible();
  90 |         const transacoes = transactionTable.locator("tbody tr");
  91 |         const countTransacoes = await transacoes.count();
  92 |         console.log(`Foram encontradas ${countTransacoes} transação/transações com os filtros aplicados.`);
  93 |     }
  94 | });
  95 | 
```